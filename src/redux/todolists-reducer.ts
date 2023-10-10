import {FilterValuesType, TodolistType} from "../App/App";

export enum TODOLISTS_ACTIONS_TYPE  {
    REMOVE_TODOLIST= "REMOVE_TODOLIST",
    ADD_TODOLIST ='ADD_TODOLIST',
    CHANGE_TODOLIST_FILTER= "CHANGE_TODOLIST_FILTER",
    CHANGE_TODOLIST_TITLE ='CHANGE_TODOLIST_TITLE' ,
}


const initialState: TodolistType[] = []

type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeFilterAT | ChangeTitleAT
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST: {
            return [{id: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
        }
        case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER: {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.value} : tl)
        }
        case TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE: {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        default:
            return state
    }
}


export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST,
        payload:{todolistId,}
    } as const
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST,
        payload:{
            title,
            todolistId
        }
    } as const
}

export type ChangeFilterAT = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_FILTER,
        payload:{
            value,
            todolistId
        }

    } as const
}

export type ChangeTitleAT = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (title: string, todolistId: string) => {
    return {
        type: TODOLISTS_ACTIONS_TYPE.CHANGE_TODOLIST_TITLE,
        payload:{
            title,
            todolistId
        }
    } as const
}


