import React, { ChangeEvent, useCallback, useState } from "react";
import { TextField } from "@mui/material";

type EditableSpanPropsType = {
  title: string;
  changeTitle: (title: string) => void;
  disabled?: boolean;
};
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(props.title);

  const activateEditMode = () => {
    setEditMode(true);
    setNewTitle(props.title);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.changeTitle(newTitle);
  };
  const changeTitle = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value);
    },
    [props.title, props.changeTitle],
  );

  return editMode ? (
    <TextField
      disabled={props.disabled}
      variant="standard"
      autoFocus
      onBlur={activateViewMode}
      onChange={changeTitle}
      value={newTitle}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
});
