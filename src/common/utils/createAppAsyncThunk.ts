import { createAsyncThunk } from "@reduxjs/toolkit";
import { DispatchType, AppRootStateType } from "../../App/store";
import { BaseResponseType } from "common/types/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: DispatchType;
  rejectValue: BaseResponseType | null;
}>();
