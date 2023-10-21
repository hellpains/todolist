import React, { useCallback, useEffect } from "react";
import { Tasks } from "./Tasks/Tasks";
import { AddItemForm } from "components/AddItemForm/AddItemForm";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import { Button, IconButton, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { TaskStatuses, TaskType } from "api/todolists-api";
import { fetchTasksTC } from "../../reducers/tasks-reducer";
import { useAppDispatch } from "App/hooks/useApp";
import { FilterValuesType, TodolistDomainType } from "../../reducers/todolists-reducer";

type TodolistPropsType = {
  todolist: TodolistDomainType;
  changeTodolistTitle: (title: string, todolistId: string) => void;
  changeTaskTitle: (title: string, taskId: string, todolistId: string) => void;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
};
export const Todolist = React.memo((props: TodolistPropsType) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksTC(props.todolist.id));
  }, []);

  const removeTodolist = () => {
    props.removeTodolist(props.todolist.id);
  };
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props.addTask, props.todolist.id],
  );
  const onAllClickHandler = useCallback(() => {
    props.changeFilter("all", props.todolist.id);
  }, [props.todolist.id, props.todolist.filter]);
  const onActiveClickHandler = useCallback(() => {
    props.changeFilter("active", props.todolist.id);
  }, [props.todolist.id, props.todolist.filter]);
  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter("completed", props.todolist.id);
  }, [props.todolist.id, props.todolist.filter]);
  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      props.changeTodolistTitle(title, props.todolist.id);
    },
    [props.todolist.id, props.changeTodolistTitle],
  );

  let tasksForTodolist = props.tasks;
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed);
  }
  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New);
  }

  const disabled = props.todolist.entityStatus === "loading";
  return (
    <div>
      <Typography aria-disabled={disabled} variant={"h5"} align={"center"} gutterBottom sx={{ fontWeight: "bold" }}>
        <EditableSpan disabled={disabled} title={props.todolist.title} changeTitle={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
          <DeleteForever />
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"} />
      <Tasks
        disabled={disabled}
        changeTaskTitle={props.changeTaskTitle}
        todolistId={props.todolist.id}
        tasks={tasksForTodolist}
        removeTask={props.removeTask}
        changeTaskStatus={props.changeTaskStatus}
      />
      <div style={{ display: "flex", justifyContent: "center", gap: "5" }}>
        <Button
          disabled={disabled}
          sx={{ marginRight: "5px", flexGrow: 1 }}
          size={"small"}
          color={props.todolist.filter === "all" ? "secondary" : "primary"}
          variant={props.todolist.filter === "all" ? "contained" : "outlined"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          disabled={disabled}
          sx={{ flexGrow: 1 }}
          size={"small"}
          color={props.todolist.filter === "active" ? "secondary" : "error"}
          variant={props.todolist.filter === "active" ? "contained" : "outlined"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          disabled={disabled}
          sx={{ marginLeft: "5px", flexGrow: 1 }}
          size={"small"}
          color={props.todolist.filter === "completed" ? "secondary" : "success"}
          variant={props.todolist.filter === "completed" ? "contained" : "outlined"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
