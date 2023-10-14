import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";
import {v1} from "uuid";


let startState: InitialStateType
beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})


test('correct error message should be set', () => {
    const result = appReducer(startState, setErrorAC('some error'))


    expect(result.error).toBe('some error')

})

test('correct status  should be set', () => {
    const result = appReducer(startState, setStatusAC('loading'))


    expect(result.status).toBe('loading')

})