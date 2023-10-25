import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

//types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export const appReducer = slice.reducer;
export const appActions = slice.actions;
