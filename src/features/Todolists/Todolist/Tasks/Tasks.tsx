import React from "react";
import { List } from "@mui/material";
import { Task } from "./Task/Task";
import { TaskStatuses, TaskType } from "../../../../api/todolists-api";

type TasksPropsType = {
  disabled: boolean;
  changeTaskTitle: (title: string, taskId: string, todolistId: string) => void;
  todolistId: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
};
export const Tasks = React.memo((props: TasksPropsType) => {
  return (
    <List>
      {props.tasks.map((task) => {
        return (
          <Task
            disabled={props.disabled}
            key={task.id}
            changeTaskTitle={props.changeTaskTitle}
            changeTaskStatus={props.changeTaskStatus}
            todolistId={props.todolistId}
            removeTask={props.removeTask}
            task={task}
          />
        );
      })}
    </List>
  );
});
