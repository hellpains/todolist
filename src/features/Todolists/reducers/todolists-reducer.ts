import { AppThunk } from "App/store";
import { appActions, RequestStatusType } from "App/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { todolistsAPI, TodolistType } from "../todolistsApi";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      if (index !== -1) state.splice(index, 1);
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      });
    },
    changeTodolistFilterAC(state, action: PayloadAction<{ value: FilterValuesType; todolistId: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      state[index].filter = action.payload.value;
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ title: string; todolistId: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      state[index].title = action.payload.title;
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string; status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.todolistId);
      state[index].entityStatus = action.payload.status;
    },
    setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map(tl => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    },
  },
  extraReducers: builder => {
    builder.addCase(clearTasksAndTodolists, (state, action) => {
      return action.payload.todolists;
    });
  },
});
export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

// THUNK
export const fetchTodolistsTC = (): AppThunk => dispatch => {
  dispatch(appActions.setAppStatusAC({ status: "loading" }));
  todolistsAPI
    .getTodolists()
    .then(res => {
      dispatch(todolistsActions.setTodolistsAC({ todolists: res.data }));
      dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistTC =
  (todolistId: string): AppThunk =>
  dispatch => {
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    dispatch(todolistsActions.changeTodolistEntityStatusAC({ todolistId, status: "loading" }));
    todolistsAPI
      .deleteTodolist(todolistId)
      .then(res => {
        dispatch(todolistsActions.removeTodolistAC({ todolistId }));
        dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const addTodolistTC =
  (title: string): AppThunk =>
  dispatch => {
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    todolistsAPI
      .addTodolist(title)
      .then(res => {
        dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
        if (res.data.resultCode === 0) {
          dispatch(todolistsActions.addTodolistAC({ todolist: res.data.data.item }));
        } else {
          handleServerNetworkError(res.data, dispatch);
          dispatch(appActions.setAppStatusAC({ status: "failed" }));
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };
export const changeTodolistTitleTC =
  (title: string, todolistId: string): AppThunk =>
  dispatch => {
    dispatch(appActions.setAppStatusAC({ status: "loading" }));
    todolistsAPI
      .updateTodolist(todolistId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(todolistsActions.changeTodolistTitleAC({ title, todolistId }));
          dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
        } else {
          dispatch(appActions.setAppStatusAC({ status: "failed" }));
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

// TYPES
export type FilterValuesType = "all" | "active" | "completed";
export type SetTodolistsActionType = ReturnType<typeof todolistsActions.setTodolistsAC>;
export type RemoveTodolistActionType = ReturnType<typeof todolistsActions.removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof todolistsActions.addTodolistAC>;
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
