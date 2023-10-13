import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import { AppThunk } from "../../App/store";


const initialState: TodolistDomainType[] = []


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' : {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD_TODOLIST': {
            return [{...action.todolist, filter: 'all'}, ...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        case 'SET_TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
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
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET_TODOLISTS', todolists} as const)


// THUNK
// export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
//     todolistsAPI.getTodolists()
//         .then(res => {
//             dispatch(setTodolistsAC(res.data))
//         })
// }
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
    }catch (e){
        console.warn(e)
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistsAPI.addTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(title, todolistId))
        })
}


// TYPES
export type FilterValuesType = 'all' | 'active' | 'completed'
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType
