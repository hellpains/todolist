import {FilterValuesType, TaskType} from "../../App";
import React, {useState} from "react";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import {Tasks} from "./Tasks/Tasks";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}
export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    const allStyle = props.filter == 'all' ? 'active-filter' : ''
    const activeStyle = props.filter == 'active' ? 'active-filter' : ''
    const completedStyle = props.filter == 'completed' ? 'active-filter' : ''

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input
                    setError={setError}
                    error={error}
                    title={newTaskTitle}
                    setTitle={setNewTaskTitle}
                    addTask={addTask}
                />
                <Button callback={addTask} name={'+'}/>
                {error && <div className={'error-messaga'}>{error}</div>}
            </div>
            <Tasks
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />
            <div>
                <button className={allStyle} onClick={onAllClickHandler}>All</button>
                <button className={activeStyle} onClick={onActiveClickHandler}>Active</button>
                <button className={completedStyle} onClick={onCompletedClickHandler}>Completed</button>
                {/*<Button name={'All'} callback={onAllClickHandler}/>*/}
                {/*<Button name={'Active'} callback={onActiveClickHandler}/>*/}
                {/*<Button name={'Completed'} callback={onCompletedClickHandler}/>*/}
            </div>
        </div>
    );
};
