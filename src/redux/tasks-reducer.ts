import {TasksForTodolistType} from "../App/App";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT,} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsAPI, TodoTaskPriorities} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


const initialState: TasksForTodolistType = {}
export const tasksReducer = (state: TasksForTodolistType = initialState, action: ActionsType): TasksForTodolistType => {
    switch (action.type) {
        case 'ADD_TASK': {     // add task
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case 'REMOVE_TASK': {    // remove task
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
        case 'UPDATE_TASK': {
            return {
                ...state, [action.todolistId]:
                    state[action.todolistId].map(t => t.id == action.taskId
                        ? {...t, ...action.model}
                        : t)
            }
        }
        case 'ADD_TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE_TODOLIST': {
            const {[action.payload.todolistId]: [], ...rest} = state
            return rest
        }
        case "SET_TODOLISTS": {
            const copyState = {...state}
            action.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        }
        case "SET_TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state
    }
}

// ACTION CREATORS
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD_TASK', task} as const)
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE_TASK', taskId, todolistId} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE_TASK', todolistId, taskId, model} as const)

export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
    ({type: "SET_TASKS", tasks, todolistId} as const)


// THUNK
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
}
export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.addTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(task => task.id === taskId)
        if (!task) return
        const apiModel: UpdateDomainTaskModelType = {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
            ...model
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                dispatch(updateTaskAC(todolistId, taskId, apiModel))
            })
    }


//  TYPES
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}
export type SetTasksActionType = {
    type: "SET_TASKS",
    tasks: TaskType[]
    todolistId: string
}
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeStatusAT = ReturnType<typeof updateTaskAC>
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type ActionsType =
    AddTaskAT
    | RemoveTaskAT
    | ChangeStatusAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksActionType
