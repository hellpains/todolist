import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App/App";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import axios from "axios";
import {todolistsAPI} from "./api/todolists-api";
import {tasksAPI} from "./api/tasks-api";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
                console.log(res)
            })
    }, []);


    return <div>Todolist: {JSON.stringify(state)}</div>
}

export const AddTodolist = () => {
    const [state, setState] = useState<any>(null)

    const title = 'newTodolist'

    const addTodolist = () => {
        todolistsAPI.addTodolist(title)
            .then((res) => {
                setState(res.data)
                console.log(res)
            })
    }
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
                console.log(res)
            })
    }, []);


    return <div>
        <div>Todolist: {JSON.stringify(state)}</div>
        <button onClick={addTodolist}>add</button>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
                console.log(res)
            })
    }, []);

    const id = `238b138f-9f5f-4097-afd2-f656e5690a91`
    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(id)
            .then((res) => {
                setState(res.data)
                console.log(res)
            })
    }


    return <div>
        <div>Todolist: {JSON.stringify(state)}</div>
        <button onClick={deleteTodolist}>delete</button>
    </div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
                console.log(res.data)
            })
    }, []);

    const id = `d57185e7-3396-444c-b5a5-239276a43921`
    const updateTodolist = () => {
        todolistsAPI.updateTodolist(id, 'updateTitle')
            .then((data) => {
                setState(data.data)
                console.log(data)
            })
    }


    return <div>
        <div>Todolist: {JSON.stringify(state)}</div>
        <button onClick={updateTodolist}>update</button>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    // useEffect(() => {
    //     tasksAPI.getTasks()
    //         .then((res) => {
    //             setState(res.data)
    //             console.log(res)
    //         })
    // }, []);


    return <div>Todolist: {JSON.stringify(state)}</div>
}

export const AddTask = () => {
    const [state, setState] = useState<any>(null)

    const title = 'newTodolist'

    const addTodolist = () => {
        todolistsAPI.addTodolist(title)
            .then((res) => {
                setState(res.data)
                console.log(res)
            })
    }
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
                console.log(res)
            })
    }, []);


    return <div>
        <div>Todolist: {JSON.stringify(state)}</div>
        <button onClick={addTodolist}>add</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
                console.log(res)
            })
    }, []);

    const id = `238b138f-9f5f-4097-afd2-f656e5690a91`
    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(id)
            .then((res) => {
                setState(res.data)
                console.log(res)
            })
    }


    return <div>
        <div>Todolist: {JSON.stringify(state)}</div>
        <button onClick={deleteTodolist}>delete</button>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
                console.log(res.data)
            })
    }, []);

    const id = `d57185e7-3396-444c-b5a5-239276a43921`
    const updateTodolist = () => {
        todolistsAPI.updateTodolist(id, 'updateTitle')
            .then((data) => {
                setState(data.data)
                console.log(data)
            })
    }


    return <div>
        <div>Todolist: {JSON.stringify(state)}</div>
        <button onClick={updateTodolist}>update</button>
    </div>
}


export const Api = () => {
    const [todolists, setTodolists] = useState<any>(null)
    const [tasks, setTasks] = useState<any>(null)

    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [newTitle, setNewTitle] = useState('')
    const [updateTitle, setUpdateTitle] = useState('')

    const getTodolists = () => {
        todolistsAPI.getTodolists()
            .then(res => {
                setTodolists(res.data)
            })
    }
    const addTodolist = () => {
        todolistsAPI.addTodolist(newTitle)
            .then(res => {
                setTodolists(res.data)
            })
    }
    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                setTodolists(res.data)
            })
    }
    const updateTodolist = () => {
        todolistsAPI.updateTodolist(todolistId, updateTitle)
            .then(res => {
                setTodolists(res.data)
            })
    }

    const getTasks = () => {
        tasksAPI.getTasks(todolistId)
            .then(res => {
                setTasks(res.data)
            })
    }
    const addTask = () => {
        tasksAPI.addTask(todolistId, newTitle)
            .then(res => {
                setTasks(res.data)

            })
    }
    const deleteTask = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setTasks(res.data)
            })
    }
    const updateTask = () => {
        tasksAPI.updateTask(todolistId, taskId, {title:updateTitle})
            .then(res => {
                setTasks(res.data)
            })
    }


    return (
        <div>
            <div>Todolists: {JSON.stringify(todolists)}</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div>-</div>
            <div>Tasks: {JSON.stringify(tasks)}</div>

            <div>TodolistId<input onChange={e => setTodolistId(e.currentTarget.value)} value={todolistId}/></div>
            <div>TaskId<input onChange={e => setTaskId(e.currentTarget.value)} value={taskId}/></div>
            <div>New Title<input onChange={e => setNewTitle(e.currentTarget.value)} value={newTitle}/></div>
            <div>UpdateTitle<input onChange={e => setUpdateTitle(e.currentTarget.value)} value={updateTitle}/></div>


            <div>
                <button onClick={getTodolists}>getTodolists</button>
                <button onClick={addTodolist}>addTodolist</button>
                <button onClick={deleteTodolist}>deleteTodolist</button>
                <button onClick={updateTodolist}>updateTodolist</button>
            </div>

            <div>
                <button onClick={getTasks}>getTasks</button>
                <button onClick={addTask}>addTask</button>
                <button onClick={deleteTask}>deleteTask</button>
                <button onClick={updateTask}>updateTask</button>
            </div>


        </div>
    )
}

root.render(
    <Provider store={store}>
        <Api/>
    </Provider>
);
