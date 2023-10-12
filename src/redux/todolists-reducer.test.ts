// import {TodolistType} from "../App/App";
import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";


beforeEach(()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active',order:0,addedDate:''},
        {id: todolistId2, title: "What to buy", filter: 'completed',order:0,addedDate:''},
    ]
})

test('should be removed correct todolists', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active',order:0,addedDate:''},
        {id: todolistId2, title: "What to buy", filter: 'completed',order:0,addedDate:''},
    ]
    const result = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(todolistId2)
})

test('should be add correct todolists', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active',order:0,addedDate:''},
        {id: todolistId2, title: "What to buy", filter: 'completed',order:0,addedDate:''},
    ]
    const todolistId=v1()
    const result = todolistsReducer(startState, addTodolistAC({
        id:todolistId,title:'hello',addedDate:'',order:0
    }))

    expect(result.length).toBe(3)
    expect(result[0].title).toBe('hello')
})

test('should be filtered correct todolists', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active',order:0,addedDate:''},
        {id: todolistId2, title: "What to buy", filter: 'completed',order:0,addedDate:''},
    ]
    const result = todolistsReducer(startState, changeTodolistFilterAC('all',todolistId1))

    expect(result[0].filter).toBe('all')
})

test('should be changed title correct todolists', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active',order:0,addedDate:''},
        {id: todolistId2, title: "What to buy", filter: 'completed',order:0,addedDate:''},
    ]
    const result = todolistsReducer(startState, changeTodolistTitleAC('hello',todolistId1))

    expect(result[0].title).toBe('hello')
})

test('todolsits should be set to the state', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const startState: TodolistDomainType[] = [
        {id: todolistId1, title: "What to learn", filter: 'active',order:0,addedDate:''},
        {id: todolistId2, title: "What to buy", filter: 'completed',order:0,addedDate:''},
    ]

    const result = todolistsReducer([],setTodolistsAC(startState))

    expect(result.length).toBe(2)
})
















