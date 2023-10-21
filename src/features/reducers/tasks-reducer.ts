import { TaskStatuses, TaskType, todolistsAPI, TodoTaskPriorities } from "api/todolists-api";
import { AppThunk, RootState } from "App/store";

import { handleServerAppError, handleServerNetworkError } from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "App/app-reducer";
import { todolistsActions } from "features/reducers/todolists-reducer";
import { clearTasksAndTodolists, ClearTasksAndTodolistsType } from "common/actions/common.actions";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksForTodolistType,
  reducers: {
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task);
    },
    removeTaskAC(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index > -1) {
        tasks.splice(index, 1);
      }
    },
    updateTaskAC(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        model: UpdateDomainTaskModelType;
      }>,
    ) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    },
    setTasksAC(state, action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>) {
      state[action.payload.todolistId] = action.payload.tasks;
    },
  },
  extraReducers: builder => {
    builder.addCase(todolistsActions.addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(todolistsActions.removeTodolistAC, (state, action) => {
      delete state[action.payload.todolistId];
    });
    builder.addCase(todolistsActions.setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach(tl => (state[tl.id] = []));
    });
    builder.addCase(clearTasksAndTodolists, (state, action) => {
      return action.payload.tasks;
    });
  },
});
export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

// THUNK
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  dispatch => {
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    todolistsAPI
      .getTasks(todolistId)
      .then(res => {
        dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
        dispatch(tasksActions.setTasksAC({ tasks: res.data.items, todolistId }));
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const removeTasksTC =
  (todolistId: string, taskId: string): AppThunk =>
  dispatch => {
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then(res => {
        dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
        dispatch(tasksActions.removeTaskAC({ todolistId, taskId }));
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  dispatch => {
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    todolistsAPI
      .addTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(tasksActions.addTaskAC({ task: res.data.data.item }));
          dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const updateTaskTC =
  (todolistId: string, taskId: string, model: UpdateDomainTaskModelType): AppThunk =>
  (dispatch, getState: () => RootState) => {
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    const task = getState().tasks[todolistId].find((task: any) => task.id === taskId);
    if (!task) return;
    const apiModel: UpdateDomainTaskModelType = {
      description: task.description,
      title: task.title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...model,
    };
    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(tasksActions.updateTaskAC({ todolistId, taskId, model: apiModel }));
          dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

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
