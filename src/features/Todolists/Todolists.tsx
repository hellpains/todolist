import React from 'react';
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {useApp} from "../../App/hooks/useApp";

type TodolistsPropsType = {}
export const Todolists = (props: TodolistsPropsType) => {

    const {
        todolists, addTodolist, removeTodolist, changeFilter, changeTodolistTitle,
        tasks, addTask, removeTask, changeTaskTitle, changeTaskStatus
    } = useApp()

    return (
        <>
            <Grid container sx={{p: '20px', justifyContent: 'center'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={5}>
                {todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks

                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={3} sx={{p: '10px'}}>
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
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
};
