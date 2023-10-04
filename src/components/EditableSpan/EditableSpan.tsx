import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.title)

    const onEditHandler = () => setEditMode(!editMode)

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
        ? <input autoFocus onBlur={activateViewMode} onChange={changeTitle} value={newTitle}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}