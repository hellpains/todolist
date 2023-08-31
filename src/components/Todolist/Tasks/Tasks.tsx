import React, {ChangeEvent, useState} from 'react';
import {TaskType} from "../../../App";

type TasksPropsType = {
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const Tasks = (props: TasksPropsType) => {

    return (
        <ul>
            {props.tasks.map(task => {

                const onRemoveHandler = () => {
                    props.removeTask(task.id)
                }
                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(task.id, e.currentTarget.checked)
                }


                return (
                    <li key={task.id}  className={task.isDone ? 'is-done' : ''}>
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


