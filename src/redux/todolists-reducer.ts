import {FilterValuesType} from "../App/App";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {useEffect} from "react";


const initialState: TodolistDomainType[] = []


export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST' : {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD_TODOLIST': {
            return [{
                id: action.payload.todolistId, title: action.payload.title,
                addedDate: '', order: 0, filter: 'all'
            }, ...state]
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.value} : tl)
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case 'SET_TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {todolistId,}
    } as const
}
export const addTodolistAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            value,
            todolistId
        }
    } as const
}
export const changeTodolistTitleAC = (title: string, todolistId: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET_TODOLISTS', todolists} as const)


// THUNK
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}


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