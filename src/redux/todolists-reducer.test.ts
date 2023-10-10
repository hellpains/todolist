import {TodolistType} from "../App/App";
import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test('should be removed correct todolists', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active'},
        {id: todolistId2, title: "What to buy", filter: 'completed'},
    ]
    const result = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(todolistId2)
})

test('should be add correct todolists', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active'},
        {id: todolistId2, title: "What to buy", filter: 'completed'},
    ]
    const todolistId=v1()
    const result = todolistsReducer(startState, addTodolistAC('hello',todolistId))

    expect(result.length).toBe(3)
    expect(result[0].title).toBe('hello')
})

test('should be filtered correct todolists', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active'},
        {id: todolistId2, title: "What to buy", filter: 'completed'},
    ]
    const result = todolistsReducer(startState, changeTodolistFilterAC('all',todolistId1))

    expect(result[0].filter).toBe('all')
})

test('should be changed title correct todolists', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active'},
        {id: todolistId2, title: "What to buy", filter: 'completed'},
    ]
    const result = todolistsReducer(startState, changeTodolistTitleAC('hello',todolistId1))

    expect(result[0].title).toBe('hello')
})