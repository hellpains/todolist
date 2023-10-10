import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "cc71a6d6-8a6c-4fdd-95f9-450166d09bba"
    }
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D>={
    resultCode: number
    messages: string[],
    data: D
}

export const todolistsAPI = {
    getTodolists() {
        return axios.get<TodolistType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists/', settings)
    },
    addTodolist(title: string) {
        return axios.post<ResponseType<{item:TodolistType}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
    },
    deleteTodolist(id: string) {
        return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTodolist(id: string, title: string) {
        return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, settings)
    },
}






















