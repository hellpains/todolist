import { todolistsAPI, TodolistType } from "api/todolists-api";
import { AppThunk } from "App/store";
import { appActions, RequestStatusType } from "App/app-reducer";
import { handleServerNetworkError } from "utils/error-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
// export const fetchTodolistsTC = (): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC('loading'))
//     try {
//         const res = await todolistsAPI.getTodolists()
//         dispatch(setTodolistsAC(res.data))
//         dispatch(setAppStatusAC('succeeded'))
//     } catch (error) {
//             dispatch(setAppErrorAC(error.message))
//     }
// }

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
        dispatch(todolistsActions.changeTodolistTitleAC({ title, todolistId }));
        dispatch(appActions.setAppStatusAC({ status: "succeeded" }));
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
