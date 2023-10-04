import React, {ChangeEvent} from 'react';
import {TaskType} from "../../../App";
import {EditableSpan} from "../../EditableSpan/EditableSpan";

type TasksPropsType = {
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    todolistId: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
}
export const Tasks = (props: TasksPropsType) => {


    return (
        <ul>
            {props.tasks.map(task => {
                const onChangeTaskTitleHandler = (title: string) => {
                    props.changeTaskTitle(title, task.id, props.todolistId)
                }
                const onRemoveHandler = () => {
                    props.removeTask(task.id, props.todolistId)
                }
                const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)
                }


                return (
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input
                            type="checkbox"
                            onChange={onChangeStatusHandler}
                            checked={task.isDone}
                        />
                        <EditableSpan title={task.title} changeTitle={onChangeTaskTitleHandler}/>
                        <button onClick={onRemoveHandler}>x</button>

                    </li>
                )
            })}
        </ul>
    );
};































