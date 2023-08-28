import React from 'react';
import {TaskType} from "../../../App";

type TasksPropsType = {
    tasks: TaskType[]
    removeTask: (id: string) => void
}
export const Tasks = (props: TasksPropsType) => {
    return (
        <ul>
            {props.tasks.map(task => {

                const onRemoveHandler = () => {
                    props.removeTask(task.id)
                }


                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                )
            })}
        </ul>
    );
};


