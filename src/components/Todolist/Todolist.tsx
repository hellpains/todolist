import {FilterValuesType, TodolistType} from "../../App";
import React from "react";
import {Tasks} from "./Tasks/Tasks";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton, Typography} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {addTaskAC} from "../../redux/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../../redux/todolists-reducer";

type TodolistPropsType = {
    todolist:TodolistType
    todolistId: string
    title: string
    filter: FilterValuesType
}
export const Todolist = (props: TodolistPropsType) => {
    const dispatch = useDispatch()

    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.todolistId))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(title, props.todolistId))
    }


    const onAllClickHandler = () => dispatch(changeTodolistFilterAC('all', props.todolistId))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC('active', props.todolistId))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC('completed', props.todolistId))

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
            <AddItemForm addItem={(title: string) => dispatch(addTaskAC(title, props.todolistId))}/>
            <Tasks todolistId={props.todolistId} filter={props.filter}/>
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
};

























