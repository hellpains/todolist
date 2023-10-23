import { useCallback, useEffect } from "react";
import {
  addTodolistTC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
  todolistsActions,
} from "features/Todolists/reducers/todolists-reducer";
import { TasksForTodolistType, tasksThunks } from "features/Todolists/reducers/tasks-reducer";
import { useAppDispatch } from "./useDispatch";
import { useAppSelector } from "./useAppSelector";
import { TaskStatuses } from "common/enum/enum";

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
      dispatch(tasksThunks.removeTask({ todolistId, taskId }));
    },
    [dispatch],
  );
  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(tasksThunks.addTask({ todolistId, title }));
    },
    [dispatch],
  );
  const changeTaskStatus = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      dispatch(tasksThunks.updateTask({ todolistId, taskId, model: { status } }));
    },
    [dispatch],
  );
  const changeTaskTitle = useCallback(
    (title: string, taskId: string, todolistId: string) => {
      dispatch(tasksThunks.updateTask({ todolistId, taskId, model: { title } }));
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
