import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'api'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {
        todolistsAPI.getTodolists()
            .then(res => setState(res.data))
    }, [])


    return <div>
        {JSON.stringify(state)}
    </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')


    const createTodolistHandler = () => {
        todolistsAPI.createTodolist(title)
            .then(res => setState(res.data))
    }


    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'title'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={createTodolistHandler}>add</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')


    const deleteTodolistHandler = () => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
            .catch(error => console.log(error))
    }


    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input placeholder={'todolistId'} value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <button onClick={deleteTodolistHandler}>delete</button>
            </div>
        </div>

    )
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')


    const updateTodolistTitleHandler = () => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'new title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>

            <button onClick={updateTodolistTitleHandler}>update todolist title</button>
        </div>
    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')


    const getTasks = () => {
        todolistsAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')


    const deleteTaskHandler = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTaskHandler}>delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')


    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'task title'} value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)}/>

            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    const [title, setTitle] = useState<string>('title 1')
    const [description, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')


    const updateTodolistTitleHandler = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: '',
            description: description,
            priority: priority,
            startDate: '',
            status: status,
            title: title,
        })
            .then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <input placeholder={'task title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
            <input placeholder={'Description'} value={description} onChange={e => setDescription(e.currentTarget.value)}/>
            <input placeholder={'status'} value={status} onChange={e => setStatus(+e.currentTarget.value)}/>
            <input placeholder={'priority'} value={priority} onChange={e => setPriority(+e.currentTarget.value)}/>
            {/*<input placeholder={'startDate'} value={startDate} onChange={e => setStartDate(e.currentTarget.value)}/>*/}
            {/*<input placeholder={'deadline'} value={deadline} onChange={e => setDeadline(e.currentTarget.value)}/>*/}

            <button onClick={updateTodolistTitleHandler}>update_____________task</button>
        </div>
    </div>
}