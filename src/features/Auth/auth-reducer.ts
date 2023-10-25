import { createSlice } from "@reduxjs/toolkit";
import { appActions } from "App/app-reducer";
import { ArgLoginType, authAPI } from "./authApi";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { ResultCode } from "features/Todolists/todolistsApi";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunkTryCatch";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      })
      .addCase(authThunks.logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.value;
      });
  },
});

// thunks
const login = createAppAsyncThunk<{ value: boolean }, ArgLoginType>(`${slice.name}/login`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  try {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      return { value: true };
    } else {
      const isShowError = !res.data.fieldsError;
      handleServerAppError(res.data, dispatch, isShowError);
      return rejectWithValue(res.data);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});
const logout = createAppAsyncThunk<{ value: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  try {
    const res = authAPI.logout();
    dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
    dispatch(clearTasksAndTodolists({ todolists: [], tasks: {} }));
    return { value: false };
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});
const initializeApp = createAppAsyncThunk<any, undefined>(`${slice.name}/initializeApp`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.success) {
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      return { value: true };
    } else {
      handleServerAppError(res.data, dispatch, false);
      return rejectWithValue(null);
    }
  }).finally(() => {
    dispatch(appActions.setAppInitializedAC({ initialized: true }));
  });
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout, initializeApp };
