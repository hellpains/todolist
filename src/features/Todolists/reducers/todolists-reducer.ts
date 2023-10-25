import { appActions, RequestStatusType } from "App/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import {
  ArgChangeTodoTitle,
  ResultCode,
  todolistsAPI,
  TodolistType,
} from "../todolistsApi";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { handleServerAppError } from "common/utils/handleServerAppError";
import { thunkTryCatch } from "common/utils/thunkTryCatch";
import { todolistsThunks } from "features/Todolists/reducers/todolists-actions";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilterAC(
      state,
      action: PayloadAction<{
        value: FilterValuesType;
        todolistId: string;
      }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId
      );
      state[index].filter = action.payload.value;
    },
    changeTodolistEntityStatusAC(
      state,
      action: PayloadAction<{
        todolistId: string;
        status: RequestStatusType;
      }>
    ) {
      const index = state.findIndex(
        (tl) => tl.id === action.payload.todolistId
      );
      state[index].entityStatus = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }));
      })
      .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(
          (tl) => tl.id === action.payload.todolistId
        );
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state.unshift({
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        });
      })
      .addCase(
        todolistsThunks.changeTodolistTitle.fulfilled,
        (state, action) => {
          const index = state.findIndex(
            (tl) => tl.id === action.payload.todolistId
          );
          state[index].title = action.payload.title;
        }
      )
      .addCase(clearTasksAndTodolists, (state, action) => {
        return action.payload.todolists;
      });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
// TYPES
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
