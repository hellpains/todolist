import { createSlice } from "@reduxjs/toolkit";
import { todolistsThunks } from "features/Todolists/reducers/todolists-actions";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { TaskType } from "features/Todolists/todolistsApi";
import { TaskStatuses, TodoTaskPriorities } from "common/enum/enum";
import { tasksThunks } from "features/Todolists/reducers/tasks-actions";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksForTodolistType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tasksThunks.fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(tasksThunks.addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(tasksThunks.removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index > -1) {
          tasks.splice(index, 1);
        }
      })
      .addCase(tasksThunks.updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model };
        }
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => (state[tl.id] = []));
      })
      .addCase(clearTasksAndTodolists, (state, action) => {
        return action.payload.tasks;
      });
  },
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

//  TYPES
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TodoTaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type TasksForTodolistType = {
  [key: string]: TaskType[];
};
