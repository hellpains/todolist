import React from 'react';

type ButtonPropsType = {
    name:string
    callback:()=>void
}
export const Button = (props: ButtonPropsType) => {
    return <button onClick={props.callback} >{props.name}</button>
};
