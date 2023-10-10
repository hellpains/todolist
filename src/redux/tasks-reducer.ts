import {TasksForTodolistType} from "../App/App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, TODOLISTS_ACTIONS_TYPE} from "./todolists-reducer";


export const TASKS_ACTIONS_TYPE= {
    ADD_TASK : 'ADD_TASK' as const,
    REMOVE_TASK : "REMOVE_TASK" as const,
    CHANGE_TASK_TITLE : 'CHANGE_TASK_TITLE' as const,
    CHANGE_TASK_STATUS : 'CHANGE_TASK_STATUS' as const,
}


const initialState: TasksForTodolistType = {}

type ActionsType = AddTaskAT | RemoveTaskAT | ChangeTitleAT | ChangeStatusAT | AddTodolistAT | RemoveTodolistAT
export const tasksReducer = (state: TasksForTodolistType = initialState, action: ActionsType): TasksForTodolistType => {
    switch (action.type) {
        case TASKS_ACTIONS_TYPE.ADD_TASK: {     // add task
            return {
                ...state,
                [action.payload.todolistId]: [
                    {id: v1(), title: action.payload.title, isDone: false}, ...state[action.payload.todolistId]
                ]
            }
        }
        case TASKS_ACTIONS_TYPE.REMOVE_TASK: {    // remove task
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.id)
            }
        }
        case TASKS_ACTIONS_TYPE.CHANGE_TASK_TITLE: {       // change task title
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].map(t => t.id == action.payload.taskId
                        ? {...t, title: action.payload.title}
                        : t)
            }
        }
        case TASKS_ACTIONS_TYPE.CHANGE_TASK_STATUS: {       // change task status
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                        ? {...task, isDone: action.payload.isDone}
                        : task)
            }
        }
        case TODOLISTS_ACTIONS_TYPE.ADD_TODOLIST: {
            return {...state, [action.payload.todolistId]: []}
        }
        case TODOLISTS_ACTIONS_TYPE.REMOVE_TODOLIST: {
            const {[action.payload.todolistId]: [], ...rest} = state
            return rest
        }
        default:
            return state
    }
}

export type AddTaskAT = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: TASKS_ACTIONS_TYPE.ADD_TASK,
        payload: {
            title,
            todolistId
        }
    } as const
}

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: TASKS_ACTIONS_TYPE.REMOVE_TASK,
        payload: {
            id,
            todolistId
        }
    } as const
}

export type ChangeTitleAT = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string) => {
    return {
        type: TASKS_ACTIONS_TYPE.CHANGE_TASK_TITLE,
        payload: {
            title,
            taskId,
            todolistId
        }
    } as const
}

export type ChangeStatusAT = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: TASKS_ACTIONS_TYPE.CHANGE_TASK_STATUS,
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}