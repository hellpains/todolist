import {FilterValuesType, TaskType} from "../../App";
import React from "react";
import {Tasks} from "./Tasks/Tasks";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Simulate} from "react-dom/test-utils";


type TodolistPropsType = {
    changeTodolistTitle: (title: string, todolistId: string) => void
    changeTaskTitle: (title: string, taskId: string, todolistId: string) => void
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todolistId)
    }


    const onAllClickHandler = () => props.changeFilter('all', props.todolistId)
    const onActiveClickHandler = () => props.changeFilter('active', props.todolistId)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.todolistId)

    const allStyle = props.filter == 'all' ? 'active-filter' : ''
    const activeStyle = props.filter == 'active' ? 'active-filter' : ''
    const completedStyle = props.filter == 'completed' ? 'active-filter' : ''

    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistTitleHandler}/>

                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <Tasks
                changeTaskTitle={props.changeTaskTitle}
                todolistId={props.todolistId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />
            <div>
                <button className={allStyle} onClick={onAllClickHandler}>All</button>
                <button className={activeStyle} onClick={onActiveClickHandler}>Active</button>
                <button className={completedStyle} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

























