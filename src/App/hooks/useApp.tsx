import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {useCallback, useEffect,} from "react";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType,
} from "../../redux/todolists-reducer";
import {FilterValuesType, TasksForTodolistType,} from "../App";
import {addTaskTC, removeTasksTC, updateTaskTC} from "../../redux/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";


export const useApp = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksForTodolistType>(state => state.tasks)


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, []);


    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleTC(title, todolistId))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [dispatch])
    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTasksTC(todolistId, taskId))
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch])
    const changeTaskTitle = useCallback((title: string, taskId: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [dispatch])


    return {
        todolists, tasks, addTodolist, removeTodolist,
        changeFilter, changeTodolistTitle, addTask,
        removeTask, changeTaskStatus, changeTaskTitle
    }
}

