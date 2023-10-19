import {AppThunk} from "./store";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export const initialState: InitialStateType = {
    status: 'loading',
    error: null,
    initialized: false,
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_ERROR': {
            return {...state, error: action.error}
        }
        case 'APP/SET_STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET_IS_INITIALIZED": {
            return {...state, initialized: action.value}
        }
        default:
            return {...state}
    }
}

//actions creator
export const setAppErrorAC = (error: string | null) =>
    ({type: 'APP/SET_ERROR', error} as const)

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET_STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) =>
    ({type: 'APP/SET_IS_INITIALIZED', value} as const)


export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.me()
        .then(res=>{
            if(res.data.resultCode===0){
                dispatch(setIsLoggedInAC(true))
            }else{

            }
            dispatch(setAppInitializedAC(true))
            dispatch(setAppStatusAC("succeeded"))
        })
}


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}
export type AppActionsType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitializedAC>