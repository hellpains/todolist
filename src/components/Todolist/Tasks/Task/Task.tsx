import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import {DeleteForever} from "@mui/icons-material";
import {TaskType} from "../../../../App";

type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    const onChangeTaskTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(title, props.task.id, props.todolistId)
    }, [props.task.id, props.todolistId])

    const onRemoveHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.task.id, props.todolistId])

    const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }, [props.task.id, props.todolistId,props.task.title])

    return (
        <ListItem divider disablePadding key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                onChange={onChangeStatusHandler}
                checked={props.task.isDone}
            />
            <EditableSpan title={props.task.title} changeTitle={onChangeTaskTitleHandler}/>
            <IconButton onClick={onRemoveHandler}>
                <DeleteForever/>
            </IconButton>

        </ListItem>
    )

})