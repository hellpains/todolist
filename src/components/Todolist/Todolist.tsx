import {FilterValuesType, TaskType} from "../../App";
import React, {useState} from "react";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import {Tasks} from "./Tasks/Tasks";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist:(todolistId:string)=>void
}
export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle, props.todolistId)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const onAllClickHandler = () => props.changeFilter('all', props.todolistId)
    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId)

    const allStyle = props.filter == 'all' ? 'active-filter' : ''
    const activeStyle = props.filter == 'active' ? 'active-filter' : ''
    const completedStyle = props.filter == 'completed' ? 'active-filter' : ''

    return (
        <div>
            <h3> {props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
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
                todolistId={props.todolistId}
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
