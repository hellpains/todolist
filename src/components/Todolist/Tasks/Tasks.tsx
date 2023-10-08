import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../../redux/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../redux/tasks-reducer";
import {FilterValuesType, TaskType} from "../../../App";

type TasksPropsType = {
    todolistId: string
    filter: FilterValuesType
}
export const Tasks = (props: TasksPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.todolistId])

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks
    if (props.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone)
    }


    return (
        <List>
            {tasksForTodolist.map(task => {
                const changeTaskTitleHandler = (title: string) => {
                    dispatch(changeTaskTitleAC(title, task.id, props.todolistId))
                }
                const removeTaskHandler = () => {
                    dispatch(removeTaskAC(task.id, props.todolistId))

                }
                const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.todolistId))
                }

                return (
                    <ListItem divider disablePadding key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <Checkbox
                            onChange={changeStatusHandler}
                            checked={task.isDone}
                        />
                        <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                        <IconButton onClick={removeTaskHandler}>
                            <DeleteForever/>
                        </IconButton>

                    </ListItem>
                )
            })}
        </List>
    );
};































