import {TasksForTodolistType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTaskAC, RemoveTaskAC, tasksReducer, ChangeTitleAC, ChangeStatusAC} from "./tasks-reducer";


test('should be remove correct task', () => {
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

    let result = tasksReducer(startState, RemoveTaskAC(taskId1, todolistId1))


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

    let result = tasksReducer(startState, AddTaskAC('newTask', todolistId1))


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

    let result = tasksReducer(startState, ChangeTitleAC('updatedTitle', taskId,todolistId1))


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

    let result = tasksReducer(startState, ChangeStatusAC(taskId, false,todolistId1))


    expect(result[todolistId1].length).toBe(4)
    expect(result[todolistId1][1].isDone).toBe(false)
})