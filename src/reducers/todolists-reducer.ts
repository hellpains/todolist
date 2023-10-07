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
    const todoId=v1()

    switch (action.type) {
        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST: {
            return [{id: todoId, title: action.title, filter: 'all'}, ...state]
        }
        case TODOLISTS_ACTIONS_TYPES.CHANGE_FILTER: {
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
        }
        case TODOLISTS_ACTIONS_TYPES.CHANGE_TITLE: {
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)
        }
        default:
            console.log('ERROR')
    }
    return state
}


export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>
export const RemoveTodolistAC = (todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST,
        todolistId,
    } as const
}

export type AddTodolistAT = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (title: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST,
        title,
    } as const
}

export type ChangeFilterAT = ReturnType<typeof ChangeFilterAC>
export const ChangeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPES.CHANGE_FILTER,
        value,
        todolistId
    } as const
}

export type ChangeTitleAT = ReturnType<typeof ChangeTitleAC>
export const ChangeTitleAC = (title: string, todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPES.CHANGE_TITLE,
        title,
        todolistId
    } as const
}


