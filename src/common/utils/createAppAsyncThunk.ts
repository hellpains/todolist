import { createAsyncThunk } from "@reduxjs/toolkit";
import { DispatchType, RootState } from "../../App/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: DispatchType;
  rejectValue: null;
}>();
