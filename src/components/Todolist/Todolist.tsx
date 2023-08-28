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
}
export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')


    const addTask = () => {
        if (newTaskTitle.length > 0) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <Input title={newTaskTitle} setTitle={setNewTaskTitle} addTask={addTask}/>
                <Button callback={addTask} name={'+'}/>

            </div>
            <Tasks tasks={props.tasks} removeTask={props.removeTask}/>
            <div>
                <Button name={'All'} callback={() => {
                    props.changeFilter('all')
                }}/>
                <Button name={'Active'} callback={() => {
                    props.changeFilter('active')
                }}/>
                <Button name={'Completed'} callback={() => {
                    props.changeFilter('completed')
                }}/>
                {/*<button onClick={()=>{props.changeFilter('all')}}>All</button>*/}
                {/*<button onClick={()=>{props.changeFilter('active')}}>Active</button>*/}
                {/*<button onClick={()=>{props.changeFilter('completed')}}>Completed</button>*/}

            </div>
        </div>
    );
};
