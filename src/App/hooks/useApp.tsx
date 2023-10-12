import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {useCallback, useEffect,} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,  fetchTodolistsTC,
    removeTodolistAC,  TodolistDomainType,

} from "../../redux/todolists-reducer";
import {v1} from "uuid";
import {FilterValuesType, TasksForTodolistType,} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../redux/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";


export const useApp = () => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksForTodolistType>(state => state.tasks)


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, []);


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title, v1()))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC(title, todolistId))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(value, todolistId))
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, status:TaskStatuses, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, status, todolistId))
    }, [dispatch])
    const changeTaskTitle = useCallback((title: string, taskId: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(title, taskId, todolistId))
    }, [dispatch])


    return {
        todolists, tasks, addTodolist, removeTodolist,
        changeFilter, changeTodolistTitle, addTask,
        removeTask, changeTaskStatus, changeTaskTitle
    }
}

