import {TaskStatuses, TaskType, todolistsAPI, TodoTaskPriorities} from "../../api/todolists-api";
import {AppThunk, RootState} from "../../App/store";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {setAppErrorAC, setAppStatusAC} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TasksForTodolistType = {}
export const tasksReducer = (state: TasksForTodolistType = initialState, action: TasksActionsType): TasksForTodolistType => {
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
export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTasksAC(res.data.items, todolistId))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTasksTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(removeTaskAC(todolistId, taskId))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.addTask(todolistId, title)
        .then(res => {

            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState: () => RootState) => {
        dispatch(setAppStatusAC('loading'))
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

                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, apiModel))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
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
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | SetTodolistsActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export type TasksForTodolistType = {
    [key: string]: TaskType[]
}