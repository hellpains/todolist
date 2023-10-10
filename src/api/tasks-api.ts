import axios from "axios"


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "cc71a6d6-8a6c-4fdd-95f9-450166d09bba"
    }
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType={
    title?:string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return axios.get<GetTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, settings)
    },
    addTask(todolistId: string, title: string) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`, {title}, settings)
    },
    deleteTask(todolistId: string, taskId: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, settings)
    },
    updateTask(todolistId: string, taskId: string,model:UpdateTaskType) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {title:model.title}, settings)
    },
}