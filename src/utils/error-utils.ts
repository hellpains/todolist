import {setAppErrorAC, setAppStatusAC} from "../App/app-reducer";
import {DispatchType} from "../App/store";
import {ResponseType} from '../api/todolists-api'


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: DispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: DispatchType) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}