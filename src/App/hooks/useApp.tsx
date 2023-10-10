import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../redux/store";
import {useCallback} from "react";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../../redux/todolists-reducer";
import {v1} from "uuid";
import {FilterValuesType, TasksForTodolistType, TodolistType} from "../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../redux/tasks-reducer";

export const useApp = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootState, TasksForTodolistType>(state => state.tasks)

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
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
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