import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {AppRootStateType} from "../app/store";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/Login/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: authReducer,
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId2', title: 'What to by', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'},
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                entityStatus: 'idle',
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistId1',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                entityStatus: 'idle',
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                entityStatus: 'idle',
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: 'todolistId2',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '',
                entityStatus: 'idle',
            }
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }

};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}