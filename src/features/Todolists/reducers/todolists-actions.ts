// THUNK
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import {
  ArgChangeTodoTitle,
  ResultCode,
  todolistsAPI,
  TodolistType,
} from "features/Todolists/todolistsApi";
import { appActions } from "App/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { thunkTryCatch } from "common/utils/thunkTryCatch";

const fetchTodolists = createAppAsyncThunk<
  { todolists: TodolistType[] },
  undefined
>(`todolists/fetchTodolists`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  try {
    const res = await todolistsAPI.getTodolists();

    dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
    return { todolists: res.data };
  } catch (err) {
    handleServerNetworkError(err, dispatch);
    return rejectWithValue(null);
  }
});

const removeTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  `todolists/removeTodolist`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    try {
      const res = await todolistsAPI.deleteTodolist(todolistId);
      if (res.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
        return { todolistId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (err) {
      handleServerNetworkError(err, dispatch);
      return rejectWithValue(null);
    }
  }
);

const addTodolist = createAppAsyncThunk<
  {
    todolist: TodolistType;
  },
  string
>(`todolists/addTodolist`, async (title, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await todolistsAPI.addTodolist(title);
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      return { todolist: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});
const changeTodolistTitle = createAppAsyncThunk<
  ArgChangeTodoTitle,
  ArgChangeTodoTitle
>(`todolists/changeTodolistTitle`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  try {
    const res = await todolistsAPI.updateTodolist(arg);
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      return { title: arg.title, todolistId: arg.todolistId };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (err) {
    handleServerNetworkError(err, dispatch);
    return rejectWithValue(null);
  }
});
export const todolistsThunks = {
  fetchTodolists,
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
};
