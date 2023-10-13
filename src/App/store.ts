import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TasksActionsType, tasksReducer} from "../features/reducers/tasks-reducer";
import {TodolistsActionsType, todolistsReducer} from "../features/reducers/todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))


export type RootState = ReturnType<typeof store.getState>
export type AppRootActionsType = TodolistsActionsType | TasksActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppRootActionsType>
export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>


// @ts-ignore
window.store = store