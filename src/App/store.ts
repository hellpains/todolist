import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TasksActionsType, tasksReducer} from "../features/reducers/tasks-reducer";
import {TodolistsActionsType, todolistsReducer} from "../features/reducers/todolists-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./app-reducer";
import {authReducer, LoginActionsType} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))


export type RootState = ReturnType<typeof store.getState>
export type AppRootActionsType = TodolistsActionsType | TasksActionsType | AppActionsType|LoginActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppRootActionsType>
export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>


// @ts-ignore
window.store = store