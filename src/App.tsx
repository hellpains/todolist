import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksForTodolistType = {
    [key: string]: TaskType[]
}


function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: 'active'},
        {id: todolistId2, title: "What to buy", filter: 'completed'},
    ])

    const [tasks, setTasks] = useState<TasksForTodolistType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Salt', isDone: true},
            {id: v1(), title: 'Sugar', isDone: false},
        ],

    })

    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
    }
    const addTask = (title: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title, isDone: false}, ...tasks[todolistId]]})
    }
    const addTodolist = (title: string) => {
        const id = v1()
        setTodolists([{id, title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [id]: []})

    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        })
    }
    const changeTaskTitle = (title: string, taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, title} : t)})
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }


    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))

        delete tasks[todolistId]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                }

                return (
                    <Todolist
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                        removeTodolist={removeTodolist}
                        key={tl.id}
                        todolistId={tl.id}
                        filter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                    />
                )
            })}
        </div>
    );
}

export default App;




