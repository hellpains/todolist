import React from "react";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components/AddItemForm/AddItemForm";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useApp } from "common/hooks/useApp";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "features/Auth/selectors";

type TodolistsPropsType = {};
export const Todolists = (props: TodolistsPropsType) => {
  const {
    todolists,
    addTodolistHandler,
    removeTodolistHandler,
    changeFilterHandler,
    changeTodolistTitleHandler,
    tasks,
    addTaskHandler,
    removeTaskHandler,
    changeTaskTitleHandler,
    changeTaskStatusHandler,
  } = useApp();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Grid container sx={{ p: "20px", justifyContent: "center" }}>
        <AddItemForm addItem={addTodolistHandler} />
      </Grid>
      <Grid container spacing={5}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];
          let tasksForTodolist = allTodolistTasks;

          return (
            <Grid item key={tl.id}>
              <Paper elevation={3} sx={{ p: "10px" }}>
                <Todolist
                  todolist={tl}
                  changeTodolistTitle={changeTodolistTitleHandler}
                  changeTaskTitle={changeTaskTitleHandler}
                  removeTodolist={removeTodolistHandler}
                  key={tl.id}
                  changeTaskStatus={changeTaskStatusHandler}
                  tasks={tasksForTodolist}
                  removeTask={removeTaskHandler}
                  changeFilter={changeFilterHandler}
                  addTask={addTaskHandler}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
