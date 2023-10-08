import {TasksForTodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, TODOLISTS_ACTIONS_TYPES} from "./todolists-reducer";


export const TASKS_ACTIONS_TYPES = {
    ADD_TASK: 'ADD_TASK' as const,
    REMOVE_TASK: "REMOVE_TASK" as const,
    CHANGE_TITLE: 'CHANGE_TITLE' as const,
    CHANGE_STATUS: 'CHANGE_STATUS' as const,
}


type ActionsType = AddTaskAT | RemoveTaskAT | ChangeTitleAT | ChangeStatusAT | AddTodolistAT | RemoveTodolistAT
export const tasksReducer = (state: TasksForTodolistType, action: ActionsType): TasksForTodolistType => {
    switch (action.type) {
        case TASKS_ACTIONS_TYPES.ADD_TASK: {     // add task
            return {
                ...state,
                [action.payload.todolistId]: [
                    {id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]
                ]
            }
        }
        case TASKS_ACTIONS_TYPES.REMOVE_TASK: {    // remove task
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.id)
            }
        }
        case TASKS_ACTIONS_TYPES.CHANGE_TITLE: {       // change task title
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id == action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t)
            }
        }
        case TASKS_ACTIONS_TYPES.CHANGE_STATUS: {       // change task status
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                        ? {...task, isDone: action.payload.isDone}
                        : task)
            }
        }
        case TODOLISTS_ACTIONS_TYPES.ADD_TODOLIST: {
            return {...state, [action.todolistId]: []}
        }
        case TODOLISTS_ACTIONS_TYPES.REMOVE_TODOLIST: {
            // let copy = {...state}
            // delete copy[action.todolistId]
            //
            // return copy
            const {[action.todolistId]: [], ...rest} = state
            return rest
        }
        default:
            console.log("ERROR")
    }
    return state
}

export type AddTaskAT = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: TASKS_ACTIONS_TYPES.ADD_TASK,
        payload: {
            title,
            todolistId
        }
    } as const
}

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: TASKS_ACTIONS_TYPES.REMOVE_TASK,
        payload: {
            id,
            todolistId
        }
    } as const
}

export type ChangeTitleAT = ReturnType<typeof changeTitleAC>
export const changeTitleAC = (title: string, taskId: string, todolistId: string) => {
    return {
        type: TASKS_ACTIONS_TYPES.CHANGE_TITLE,
        payload: {
            title,
            taskId,
            todolistId
        }
    } as const
}

export type ChangeStatusAT = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: TASKS_ACTIONS_TYPES.CHANGE_STATUS,
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}