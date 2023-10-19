import axios from "axios";
import {UpdateDomainTaskModelType} from "../features/reducers/tasks-reducer";

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists/')
    },
    addTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },

    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    addTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateDomainTaskModelType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}
export const authAPI={
    login(email:string,password:string,rememberMe:boolean){
        return instance.post<ResponseType<{userId?:number}>>('auth/login',{email,password,rememberMe})
    },
    logout(){
        return instance.delete<ResponseType<{userId?:number}>>('auth/login')
    },
    me(){
        return instance.get<ResponseType<{id:number,email:string,login:string}>>('auth/me')
    }
}

// TYPES
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

// SETTINGS
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "d14e063f-4d3a-4f0c-9999-8e5b07f8e195"
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})


















