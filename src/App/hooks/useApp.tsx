import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../store";
import { useCallback, useEffect } from "react";
import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
  todolistsActions,
} from "features/reducers/todolists-reducer";
import { addTaskTC, removeTasksTC, TasksForTodolistType, updateTaskTC } from "features/reducers/tasks-reducer";
import { TaskStatuses } from "api/todolists-api";
import { initializeAppTC } from "../app-reducer";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
  const tasks = useAppSelector<TasksForTodolistType>(state => state.tasks);
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchTodolistsTC());
    }
  }, []);

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId));
    },
    [dispatch],
  );
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );
  const changeTodolistTitle = useCallback(
    (title: string, todolistId: string) => {
      dispatch(changeTodolistTitleTC(title, todolistId));
    },
    [dispatch],
  );
  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      dispatch(todolistsActions.changeTodolistFilterAC({ value, todolistId }));
    },
    [dispatch],
  );
  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(removeTasksTC(todolistId, taskId));
    },
    [dispatch],
  );
  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskTC(todolistId, title));
    },
    [dispatch],
  );
  const changeTaskStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { status }));
    },
    [dispatch],
  );
  const changeTaskTitle = useCallback(
    (title: string, taskId: string, todolistId: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { title }));
    },
    [dispatch],
  );

  return {
    todolists,
    tasks,
    addTodolist,
    removeTodolist,
    changeFilter,
    changeTodolistTitle,
    addTask,
    removeTask,
    changeTaskStatus,
    changeTaskTitle,
  };
};

export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
