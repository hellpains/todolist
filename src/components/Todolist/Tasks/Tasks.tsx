import React from 'react';
import {TaskType} from "../../../App";
import {List} from "@mui/material";
import {Task} from "./Task/Task";

type TasksPropsType = {
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    todolistId: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}
export const Tasks = React.memo((props: TasksPropsType) => {
    return (
        <List>
            {props.tasks.map(task => {
                return (
                    <Task
                        key={task.id}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                        todolistId={props.todolistId}
                        removeTask={props.removeTask}
                        task={task}
                    />
                )
            })}
        </List>
    );
});


