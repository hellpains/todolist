import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";



function App() {

    let tasks1: TaskType[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]
    let tasks2: TaskType[] = [
        {id: 1, title: 'Milk', isDone: false},
        {id: 2, title: 'Sugar', isDone: true},
        {id: 3, title: 'Salt', isDone: true},
        {id: 3, title: '123', isDone: true},
    ]

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"What to buy"} tasks={tasks2}/>
        </div>
    );
}

export default App;




