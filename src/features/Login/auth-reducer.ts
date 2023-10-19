import {AppThunk, DispatchType} from "../../App/store";
import {setAppStatusAC} from "../../App/app-reducer";
import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: initialStateType = {
    isLoggedIn: false
}
export const authReducer = (state: initialStateType = initialState, action: LoginActionsType): initialStateType => {
    switch (action.type) {
        case "login/SET_IS_LOGGED_IN": {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

// ACTION CREATORS
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET_IS_LOGGED_IN', value} as const)


// THUNK
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//  TYPES

export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>
type initialStateType = {
    isLoggedIn: boolean
}


