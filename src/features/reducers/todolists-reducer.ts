import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {AppThunk} from "../../App/store";
import {RequestStatusType, setStatusAC} from "../../App/app-reducer";


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
export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET_TODOLISTS', todolists} as const)


// THUNK
// export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
//     todolistsAPI.getTodolists()
//         .then(res => {
//             dispatch(setTodolistsAC(res.data))
//             dispatch(setStatusAC('loading'))
//         })
//         .finally(()=>{
//             dispatch(setStatusAC('idle'))
//         })
// }
export const fetchTodolistsTC = (): AppThunk => async dispatch => {
    dispatch(setStatusAC('loading'))
    try {
        const res = await todolistsAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
        dispatch(setStatusAC('succeeded'))
    } catch (e) {
        console.warn(e)
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.addTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        })
}
export const changeTodolistTitleTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(title, todolistId))
            dispatch(setStatusAC('succeeded'))
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
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsActionType
