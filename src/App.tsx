import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const [filter, setFilter] = useState<FilterValuesType>('all')
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
    ])


    const removeTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id))
    }
    const addTask = (title:string) => {
        setTasks([{id:v1(),title,isDone:false},...tasks])
    }




    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;




