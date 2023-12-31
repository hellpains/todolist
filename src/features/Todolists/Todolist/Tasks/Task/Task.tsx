import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton, ListItem } from "@mui/material";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { DeleteForever } from "@mui/icons-material";
import { TaskStatuses } from "common/enum/enum";
import { TaskType } from "features/Todolists/todolistsApi";

type TaskPropsType = {
  removeTask: (id: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (title: string, taskId: string, todolistId: string) => void;
  todolistId: string;
  task: TaskType;
  disabled: boolean;
};
export const Task = React.memo((props: TaskPropsType) => {
  const onChangeTaskTitleHandler = useCallback(
    (title: string) => {
      props.changeTaskTitle(title, props.task.id, props.todolistId);
    },
    [props.task.id, props.todolistId],
  );

  const onRemoveHandler = useCallback(() => {
    props.removeTask(props.task.id, props.todolistId);
  }, [props.task.id, props.todolistId]);

  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
      props.changeTaskStatus(props.task.id, status, props.todolistId);
    },
    [props.task.id, props.todolistId, props.task.title],
  );

  return (
    <ListItem
      divider
      disablePadding
      key={props.task.id}
      className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
      <Checkbox
        disabled={props.disabled}
        onChange={onChangeStatusHandler}
        checked={props.task.status === TaskStatuses.Completed}
      />
      <EditableSpan title={props.task.title} changeTitle={onChangeTaskTitleHandler} />
      <IconButton disabled={props.disabled} onClick={onRemoveHandler}>
        <DeleteForever />
      </IconButton>
    </ListItem>
  );
});
