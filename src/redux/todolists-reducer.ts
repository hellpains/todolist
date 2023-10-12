import {FilterValuesType} from "../App/App";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";


const initialState: TodolistDomainType[] = []


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
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
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.addTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(title, todolistId))
        })
}


// TYPES
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
type ActionsType =
    RemoveTodolistAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsAT