import { useCallback, useEffect } from "react";
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
} from "features/Todolists/reducers/todolists-reducer";
import { TasksForTodolistType } from "features/Todolists/reducers/tasks-reducer";
import { useAppDispatch } from "./useDispatch";
import { useAppSelector } from "./useAppSelector";
import { TaskStatuses } from "common/enum/enum";
import { todolistsThunks } from "features/Todolists/reducers/todolists-actions";
import { tasksThunks } from "features/Todolists/reducers/tasks-actions";
import { useActions } from "./useActions";

export const useApp = () => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector<TodolistDomainType[]>(
    (state) => state.todolists
  );
  const tasks = useAppSelector<TasksForTodolistType>((state) => state.tasks);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const { removeTask, addTask, updateTask, fetchTasks } =
    useActions(tasksThunks);
  const { changeTodolistTitle, removeTodolist, fetchTodolists, addTodolist } =
    useActions(todolistsThunks);
  useEffect(() => {
    if (isLoggedIn) {
      // dispatch(todolistsThunks.fetchTodolists());
      fetchTodolists();
    }
  }, []);

  const removeTodolistHandler = useCallback(
    (todolistId: string) => {
      // dispatch(todolistsThunks.removeTodolist(todolistId));
      removeTodolist(todolistId);
    },
    [dispatch]
  );
  const addTodolistHandler = useCallback(
    (title: string) => {
      // dispatch(todolistsThunks.addTodolist(title));
      addTodolist(title);
    },
    [dispatch]
  );
  const changeTodolistTitleHandler = useCallback(
    (title: string, todolistId: string) => {
      // dispatch(todolistsThunks.changeTodolistTitle({ title, todolistId }));
      changeTodolistTitle({ title, todolistId });
    },
    [dispatch]
  );
  const changeFilterHandler = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      dispatch(todolistsActions.changeTodolistFilterAC({ value, todolistId }));
    },
    [dispatch]
  );
  const removeTaskHandler = useCallback(
    (taskId: string, todolistId: string) => {
      // dispatch(tasksThunks.removeTask({ todolistId, taskId }));
      removeTask({ todolistId, taskId });
    },
    [dispatch]
  );
  const addTaskHandler = useCallback(
    (title: string, todolistId: string) => {
      // dispatch(tasksThunks.addTask({ todolistId, title }));
      addTask({ todolistId, title });
    },
    [dispatch]
  );
  const changeTaskStatusHandler = useCallback(
    (taskId: string, status: TaskStatuses, todolistId: string) => {
      // dispatch(
      //   tasksThunks.updateTask({ todolistId, taskId, model: { status } })
      // );
      updateTask({ todolistId, taskId, model: { status } });
    },
    [dispatch]
  );
  const changeTaskTitleHandler = useCallback(
    (title: string, taskId: string, todolistId: string) => {
      // dispatch(
      //   tasksThunks.updateTask({ todolistId, taskId, model: { title } })
      // );
      updateTask({ todolistId, taskId, model: { title } });
    },
    [dispatch]
  );

  return {
    todolists,
    tasks,
    addTodolistHandler,
    removeTodolistHandler,
    changeFilterHandler,
    changeTodolistTitleHandler,
    addTaskHandler,
    removeTaskHandler,
    changeTaskStatusHandler,
    changeTaskTitleHandler,
  };
};
