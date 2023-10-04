import React, {useState} from "react";
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <Input
                setError={setError}
                error={error}
                title={newTaskTitle}
                setTitle={setNewTaskTitle}
                addTask={addTask}
            />
            <Button callback={addTask} name={'+'}/>
            {error && <div className={'error-messaga'}>{error}</div>}
        </div>
    )
}