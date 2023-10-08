import {TasksForTodolistType, TodolistType} from "../App";
import {v1} from "uuid";
import {addTaskAC, removeTaskAC, tasksReducer, changeTitleAC, changeStatusAC} from "./tasks-reducer";
import {addTodolistAC} from "./todolists-reducer";


test('correct task should be deleted from correct array', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId1 = v1()
    const startState: TasksForTodolistType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: taskId1, title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Salt', isDone: true},
            {id: v1(), title: 'Sugar', isDone: false},
        ],
    }

    let result = tasksReducer(startState, removeTaskAC(taskId1, todolistId1))


    expect(result[todolistId1].length).toBe(3)
    expect(result[todolistId1][1].title).toBe("JS")
})

test('should be add correct task', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TasksForTodolistType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Salt', isDone: true},
            {id: v1(), title: 'Sugar', isDone: false},
        ],
    }

    let result = tasksReducer(startState, addTaskAC('newTask', todolistId1))


    expect(result[todolistId1].length).toBe(5)
    expect(result[todolistId1][0].title).toBe("newTask")
})

test('should be changed title correct task', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId = v1()
    const startState: TasksForTodolistType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: taskId, title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Salt', isDone: true},
            {id: v1(), title: 'Sugar', isDone: false},
        ],
    }

    let result = tasksReducer(startState, changeTitleAC('updatedTitle', taskId, todolistId1))


    expect(result[todolistId1].length).toBe(4)
    expect(result[todolistId1][1].title).toBe("updatedTitle")
})

test('should be changed status correct task', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId = v1()
    const startState: TasksForTodolistType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: taskId, title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Salt', isDone: true},
            {id: v1(), title: 'Sugar', isDone: false},
        ],
    }

    let result = tasksReducer(startState, changeStatusAC(taskId, false, todolistId1))


    expect(result[todolistId1].length).toBe(4)
    expect(result[todolistId1][1].isDone).toBe(false)
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksForTodolistType = {
        ['todolistId1']: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'CSS', isDone: true},
            {id: '3', title: 'JS', isDone: false},
            {id: '4', title: 'React', isDone: false},
        ],
        ['todolistId2']: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Salt', isDone: true},
            {id: '3', title: 'Sugar', isDone: false},
        ],
    }

    const result = tasksReducer(startState, addTodolistAC('newTodolist'))
    const keys = Object.keys(result)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)

    expect(result[newKey]).toEqual([])


})