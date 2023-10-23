import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "App/app-reducer";
import { todolistsActions } from "features/Todolists/reducers/todolists-reducer";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThunk } from "../../../common/utils/createAppAsyncThunk";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { ArgAddTask, ArgDeleteTask, ArgUpdateTask, TaskType, todolistsAPI } from "features/Todolists/todolistsApi";
import { TaskStatuses, TodoTaskPriorities } from "common/enum/enum";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksForTodolistType,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(todolistsActions.addTodolistAC, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolistAC, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistsActions.setTodolistsAC, (state, action) => {
        action.payload.todolists.forEach(tl => (state[tl.id] = []));
      })
      .addCase(clearTasksAndTodolists, (state, action) => {
        return action.payload.tasks;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(t => t.id === action.payload.taskId);
        if (index > -1) {
          tasks.splice(index, 1);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(t => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model };
        }
      });
  },
});

// THUNKS

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsAPI.getTasks(todolistId);
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      return { tasks: res.data.items, todolistId };
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  },
);

enum ResultCode {
  success = 0,
  error = 1,
  captcha = 10,
}

const addTask = createAppAsyncThunk<{ task: TaskType }, ArgAddTask>("tasks/addTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  try {
    const res = await todolistsAPI.addTask(arg);
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      return { task: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch);
    return rejectWithValue(null);
  }
});
const removeTask = createAppAsyncThunk<{ todolistId: string; taskId: string }, ArgDeleteTask>(
  "tasks/removeTask",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsAPI.deleteTask(arg);
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      return { todolistId: arg.todolistId, taskId: arg.taskId };
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  },
);
const updateTask = createAppAsyncThunk<ArgUpdateTask, ArgUpdateTask>("tasks/updateTask", async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  try {
    const task = getState().tasks[arg.todolistId].find((task: TaskType) => task.id === arg.taskId);
    if (!task) {
      return rejectWithValue(null);
    }
    const apiModel: UpdateDomainTaskModelType = {
      description: task.description,
      title: task.title,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...arg.model,
    };
    const res = await todolistsAPI.updateTask({ taskId: arg.taskId, todolistId: arg.todolistId, model: apiModel });
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      return arg;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks, addTask, removeTask, updateTask };
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
