import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.changeTitle(newTitle)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField
            variant="standard"
            autoFocus
            onBlur={activateViewMode}
            onChange={changeTitle}
            value={newTitle}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}