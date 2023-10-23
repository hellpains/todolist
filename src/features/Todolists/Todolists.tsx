import React from "react";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useApp } from "../../common/hooks/useApp";
import { useAppSelector } from "../../common/hooks/useAppSelector";

type TodolistsPropsType = {};
export const Todolists = (props: TodolistsPropsType) => {
  const {
    todolists,
    addTodolist,
    removeTodolist,
    changeFilter,
    changeTodolistTitle,
    tasks,
    addTask,
    removeTask,
    changeTaskTitle,
    changeTaskStatus,
  } = useApp();

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Grid container sx={{ p: "20px", justifyContent: "center" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={5}>
        {todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id];
          let tasksForTodolist = allTodolistTasks;

          return (
            <Grid item key={tl.id}>
              <Paper elevation={3} sx={{ p: "10px" }}>
                <Todolist
                  todolist={tl}
                  changeTodolistTitle={changeTodolistTitle}
                  changeTaskTitle={changeTaskTitle}
                  removeTodolist={removeTodolist}
                  key={tl.id}
                  changeTaskStatus={changeTaskStatus}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
