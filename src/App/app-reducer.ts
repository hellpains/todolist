import { AppThunk } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authActions } from "features/Login/auth-reducer";
import { authAPI } from "features/Login/authApi";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "loading" as RequestStatusType,
    error: null as string | null,
    initialized: false,
  },
  reducers: {
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    },
    setAppInitializedAC(state, action: PayloadAction<{ initialized: boolean }>) {
      state.initialized = action.payload.initialized;
    },
  },
});

export const initializeAppTC = (): AppThunk => dispatch => {
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedInAC({ value: true }));
    } else {
    }
    dispatch(appActions.setAppInitializedAC({ initialized: true }));
    dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
  });
};

//types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = ReturnType<typeof slice.getInitialState>;
export const appReducer = slice.reducer;
export const appActions = slice.actions;
