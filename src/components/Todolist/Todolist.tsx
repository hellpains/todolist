import {FilterValuesType, TaskType} from "../../App/App";
import React, {useCallback} from "react";
import {Tasks} from "./Tasks/Tasks";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton, Typography} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";


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
export const Todolist = React.memo((props: TodolistPropsType) => {


    const removeTodolist = () => {
        props.removeTodolist(props.todolistId)
    }

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.todolistId])


    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.todolistId)
    }, [props.todolistId,props.filter])

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.todolistId)
    }, [props.todolistId,props.filter])

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.todolistId)
    }, [props.todolistId,props.filter])


    const changeTodolistTitleHandler = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    }, [props.todolistId,props.changeTodolistTitle])

    let tasksForTodolist = props.tasks
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(task => !task.isDone)
    }


    return (
        <div>
            <Typography
                variant={'h5'}
                align={'center'}
                gutterBottom
                sx={{fontWeight: 'bold'}}
            >
                <EditableSpan title={props.title} changeTitle={changeTodolistTitleHandler}/>
                <IconButton onClick={removeTodolist}><DeleteForever/></IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <Tasks
                changeTaskTitle={props.changeTaskTitle}
                todolistId={props.todolistId}
                tasks={tasksForTodolist}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />
            <div style={{display: "flex", justifyContent: 'center', gap: '5'}}>
                <Button
                    sx={{marginRight: '5px', flexGrow: 1}}
                    size={"small"}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    sx={{flexGrow: 1}}
                    size={"small"}
                    color={props.filter === 'active' ? 'secondary' : 'error'}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    sx={{marginLeft: '5px', flexGrow: 1}}
                    size={"small"}
                    color={props.filter === 'completed' ? 'secondary' : 'success'}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
});