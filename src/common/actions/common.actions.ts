import { createAction } from "@reduxjs/toolkit";
import { TodolistDomainType } from "features/Todolists/reducers/todolists-reducer";
import { TasksForTodolistType } from "features/Todolists/reducers/tasks-reducer";

export type ClearTasksAndTodolistsType = {
  tasks: TasksForTodolistType;
  todolists: TodolistDomainType[];
};

export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>("common/clear-tasks-todolists");
