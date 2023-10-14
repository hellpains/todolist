import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {AppThunk} from "../../App/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../App/app-reducer";
import {addTaskAC} from "./tasks-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";


const initialState: TodolistDomainType[] = []


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' : {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD_TODOLIST': {
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE_TODOLIST_ENTITY_STATUS': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.status} : tl)
        }
        case 'SET_TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        default:
            return state
    }
}


// ACTION CREATORS
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE_TODOLIST', payload: {todolistId,}} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD_TODOLIST', todolist} as const)
export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string) =>
    ({type: 'CHANGE_TODOLIST_FILTER', value, todolistId} as const)
export const changeTodolistTitleAC = (title: string, todolistId: string) =>
    ({type: 'CHANGE_TODOLIST_TITLE', title, todolistId} as const)
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) =>
    ({type: 'CHANGE_TODOLIST_ENTITY_STATUS', todolistId, status} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET_TODOLISTS', todolists} as const)


// THUNK
export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
// export const fetchTodolistsTC = (): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const res = await todolistsAPI.getTodolists()
//         dispatch(setTodolistsAC(res.data))
//         dispatch(setAppStatusAC('succeeded'))
//     } catch (error) {
//             dispatch(setAppErrorAC(error.message))
//     }
// }

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.addTodolist(title)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
            } else {
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
export const changeTodolistTitleTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(title, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// TYPES
export type FilterValuesType = 'all' | 'active' | 'completed'
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType
