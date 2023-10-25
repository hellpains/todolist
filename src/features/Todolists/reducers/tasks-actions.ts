import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import {
  ArgAddTask,
  ArgDeleteTask,
  ArgUpdateTask,
  ResultCode,
  TaskType,
  todolistsAPI,
} from "features/Todolists/todolistsApi";
import { appActions } from "App/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { thunkTryCatch } from "common/utils/thunkTryCatch";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { UpdateDomainTaskModelType } from "features/Todolists/reducers/tasks-reducer";

const fetchTasks = createAppAsyncThunk<
  { tasks: TaskType[]; todolistId: string },
  string
>(`tasks/fetchTasks`, async (todolistId, thunkAPI) => {
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
});

const addTask = createAppAsyncThunk<{ task: TaskType }, ArgAddTask>(
  `tasks/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsAPI.addTask(arg);
      if (res.data.resultCode === ResultCode.success) {
        return { task: res.data.data.item };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  }
);
const removeTask = createAppAsyncThunk<
  { todolistId: string; taskId: string },
  ArgDeleteTask
>(`tasks/removeTask`, async (arg, thunkAPI) => {
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
});
const updateTask = createAppAsyncThunk<ArgUpdateTask, ArgUpdateTask>(
  `tasks/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    try {
      const task = getState().tasks[arg.todolistId].find(
        (task: TaskType) => task.id === arg.taskId
      );
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
      const res = await todolistsAPI.updateTask({
        taskId: arg.taskId,
        todolistId: arg.todolistId,
        model: apiModel,
      });
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
  }
);

export const tasksThunks = { fetchTasks, addTask, removeTask, updateTask };
