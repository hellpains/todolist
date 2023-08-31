import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    title: string
    setTitle: (title: string) => void
    addTask: () => void
    error: string | null
    setError: (error: string | null) => void
}
export const Input = (props: InputPropsType) => {

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        props.setError(null)
        if (e.charCode == 13) {
            props.addTask()
        }
    }


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(event.currentTarget.value)
    }


    return <input className={props.error ? 'error' : ''} onChange={onChangeHandler} value={props.title}
                  onKeyPress={onKeyPressHandler}/>
};