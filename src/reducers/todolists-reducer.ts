import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const TODOLISTS_ACTIONS_TYPES = {
    REMOVE_TODOLIST: "REMOVE_TODOLIST" as const,
    ADD_TODOLIST: 'ADD_TODOLIST' as const,
    CHANGE_FILTER: "CHANGE_FILTER" as const,
    CHANGE_TITLE: 'CHANGE_TITLE' as const,
}


type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeFilterAT | ChangeTitleAT
export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST: {
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
        }
        case TODOLISTS_ACTIONS_TYPES.CHANGE_FILTER: {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
        }
        case TODOLISTS_ACTIONS_TYPES.CHANGE_TITLE: {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        default:
            throw new Error('i dont understand this type')
    }
}


export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST,
        todolistId,
    } as const
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST,
        title,
        todolistId:v1()
    } as const
}

export type ChangeFilterAT = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPES.CHANGE_FILTER,
        value,
        todolistId
    } as const
}

export type ChangeTitleAT = ReturnType<typeof changeTitleAC>
export const changeTitleAC = (title: string, todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPES.CHANGE_TITLE,
        title,
        todolistId
    } as const
}


