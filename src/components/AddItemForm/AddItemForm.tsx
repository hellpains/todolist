import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import {AddCircleOutlineOutlined} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:boolean
}
export const AddItemForm = React.memo(({addItem,disabled=false}: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addItem(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (setError) {
            setError(null)
        }
        if (e.charCode == 13) {
            addItemHandler()
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    return (
        <div>
            <TextField
                disabled={disabled}
                error={!!error}
                label="Type value"
                onChange={onChangeHandler} value={newTaskTitle}
                onKeyPress={onKeyPressHandler}
                helperText={error}
                size="small"
            />
            <Button
                disabled={disabled}
                disableElevation
                sx={{ml:'5px'}}
                variant={'contained'}
                endIcon={<AddCircleOutlineOutlined/>}
                size={'medium'}
                color={"primary"}
                onClick={addItemHandler}>
                ADD
            </Button>
        </div>
    )
})