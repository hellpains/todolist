export const initialState: InitialStateType = {
    status: 'loading',
    error: null
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_ERROR': {
            return {...state, error: action.error}
        }
        case 'APP/SET_STATUS': {
            return {...state, status: action.status}
        }
        default:
            return {...state}
    }
}

//actions creator
export const setErrorAC = (error: string | null) =>
    ({type: 'APP/SET_ERROR', error} as const)

export const setStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET_STATUS', status} as const)


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export type AppActionsType =
    | ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusAC>