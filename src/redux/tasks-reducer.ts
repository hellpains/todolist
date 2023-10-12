import {TasksForTodolistType} from "../App/App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT,} from "./todolists-reducer";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";
import {Dispatch} from "redux";


const initialState: TasksForTodolistType = {}
export const tasksReducer = (state: TasksForTodolistType = initialState, action: ActionsType): TasksForTodolistType => {
    switch (action.type) {
        case 'ADD_TASK': {     // add task
            return {
                ...state,
                [action.payload.todolistId]: [
                    {
                        id: v1(), title: action.payload.title, status: TaskStatuses.New,
                        todoListId: action.payload.todolistId, priority: 0, order: 0, description: '',
                        deadline: '', addedDate: '', startDate: ''
                    }, ...state[action.payload.todolistId]
                ]
            }
        }
        case 'REMOVE_TASK': {    // remove task
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.id)
            }
        }
        case 'CHANGE_TASK_TITLE': {       // change task title
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id == action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t)
            }
        }
        case 'CHANGE_TASK_STATUS': {       // change task status
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                        ? {...task, status: action.payload.status}
                        : task)
            }
        }
        case 'ADD_TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
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
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        }
        default:
            return state
    }
}

export type AddTaskAT = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            id,
            todolistId
        }
    } as const
}

export type ChangeTitleAT = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            title,
            taskId,
            todolistId
        }
    } as const
}

export type ChangeStatusAT = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            taskId,
            status,
            todolistId
        }
    } as const
}

export const setTasksAC = (tasks:TaskType[],todolistId: string) => {
    return {
        type: "SET_TASKS", tasks,todolistId
    }as const
}


// THUNK
export const fetchTasksTC = (todolistId:string) => (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items,todolistId))
        })
}











export type SetTasksActionType = {
    type: "SET_TASKS",
    tasks: TaskType[]
    todolistId: string
}

type ActionsType =
    AddTaskAT
    | RemoveTaskAT
    | ChangeTitleAT
    | ChangeStatusAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksActionType
