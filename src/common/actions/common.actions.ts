import { createAction } from "@reduxjs/toolkit";
import { TodolistDomainType } from "features/reducers/todolists-reducer";
import { TasksForTodolistType } from "features/reducers/tasks-reducer";

export type ClearTasksAndTodolistsType = {
  tasks: TasksForTodolistType;
  todolists: TodolistDomainType[];
};

export const clearTasksAndTodolists = createAction<ClearTasksAndTodolistsType>("common/clear-tasks-todolists");
