import React, {ChangeEvent, useState} from 'react';
import {TaskType} from "../../../App";

type TasksPropsType = {
    todolistId: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todolistId:string) => void
}
export const Tasks = (props: TasksPropsType) => {

    return (
        <ul>
            {props.tasks.map(task => {

                const onRemoveHandler = () => {
                    props.removeTask(task.id, props.todolistId)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(task.id, e.currentTarget.checked,props.todolistId)
                }


                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input
                            type="checkbox"
                            onChange={onChangeHandler}
                            checked={task.isDone}
                        />
                        <span>{task.title}</span>
                        <button onClick={onRemoveHandler}>x</button>

                    </li>
                )
            })}
        </ul>
    );
};


