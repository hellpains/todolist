import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {v1} from "uuid";


let startState: InitialStateType
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        initialized:false,
    }
})


test('correct error message should be set', () => {
    const result = appReducer(startState, setAppErrorAC('some error'))


    expect(result.error).toBe('some error')

})

test('correct status  should be set', () => {
    const result = appReducer(startState, setAppStatusAC('loading'))


    expect(result.status).toBe('loading')

})