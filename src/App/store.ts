import { AnyAction, combineReducers } from "redux";
import { tasksReducer } from "features/Todolists/reducers/tasks-reducer";
import { todolistsReducer } from "features/Todolists/reducers/todolists-reducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "features/Login/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
// export type AppRootActionsType = TodolistsActionsType | TasksActionsType | AppActionsType | LoginActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>;

// @ts-ignore
window.store = store;
