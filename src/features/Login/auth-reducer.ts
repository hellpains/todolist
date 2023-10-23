import { AppThunk } from "App/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { appActions } from "App/app-reducer";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { authAPI } from "./authApi";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    },
  },
});

// thunks
export const loginTC =
  (email: string, password: string, rememberMe: boolean): AppThunk =>
  dispatch => {
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    authAPI
      .login(email, password, rememberMe)
      .then(res => {
        dispatch(authActions.setIsLoggedInAC({ value: true }));
        dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const logoutTC = (): AppThunk => dispatch => {
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  authAPI
    .logout()
    .then(res => {
      dispatch(authActions.setIsLoggedInAC({ value: false }));
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      dispatch(clearTasksAndTodolists({ todolists: [], tasks: {} }));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

export const authReducer = slice.reducer;
export const authActions = slice.actions;
