import { UpdateDomainTaskModelType } from "features/Todolists/reducers/tasks-reducer";
import { TaskStatuses, TodoTaskPriorities } from "common/enum/enum";
import { ResponseType } from "common/types/types";
import { instance } from "common/api/baseApi";

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists/");
  },
  addTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${id}`, { title });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: ArgDeleteTask) {
    return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  addTask(arg: ArgAddTask) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
  },
  updateTask(arg: ArgUpdateTask) {
    return instance.put(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`, arg.model);
  },
};

// types
type GetTaskResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
export type ArgAddTask = { todolistId: string; title: string };
export type ArgDeleteTask = { todolistId: string; taskId: string };
export type ArgUpdateTask = { todolistId: string; taskId: string; model: UpdateDomainTaskModelType };

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TodoTaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
