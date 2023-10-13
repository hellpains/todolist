import {addTaskAC, updateTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksForTodolistType} from "../tasks-reducer"
import {addTodolistAC, setTodolistsAC} from "../todolists-reducer"
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {v1} from "uuid";


test('correct task should be deleted from correct array', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId1 = v1()
    const startState: TasksForTodolistType = {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Salt',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Sugar',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
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
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Salt',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Sugar',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
        ],
    }

    let result = tasksReducer(startState, addTaskAC({
        id: 'taskId', todoListId: todolistId1, status: 0,
        description: '', addedDate: '', deadline: '',
        order: 0, title: 'newTask', startDate: '', priority: 0
    }))


    expect(result[todolistId1].length).toBe(5)
    expect(result[todolistId1][0].title).toBe("newTask")
})

test('should be changed title correct task', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId = v1()
    const startState: TasksForTodolistType = {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Salt',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Sugar',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
        ],
    }

    let result = tasksReducer(startState, updateTaskAC(todolistId1, taskId, {title:'updatedTitle'}))


    expect(result[todolistId1].length).toBe(4)
    expect(result[todolistId1][1].title).toBe("updatedTitle")
})

test('should be changed status correct task', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let taskId = v1()
    const startState: TasksForTodolistType = {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId1
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Salt',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Sugar',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: todolistId2
            },
        ],
    }

    const model: TaskType = {
        description: '',
        status: TaskStatuses.New,
        title: '',
        priority: 0,
        startDate: '',
        order: 0,
        deadline: '',
        id: taskId,
        addedDate: '',
        todoListId: todolistId2
    }

    let result = tasksReducer(startState, updateTaskAC(todolistId1, taskId,model))


    expect(result[todolistId1].length).toBe(4)
    expect(result[todolistId1][1].status).toBe(0)
})

test('new array should be added when new todolist is added', () => {

    const startState: any = {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: 'todolistId1'
            },
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: 'todolistId2'
            },
            {
                id: v1(),
                title: 'Salt',
                status: TaskStatuses.Completed,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: 'todolistId2'
            },
            {
                id: v1(),
                title: 'Sugar',
                status: TaskStatuses.New,
                startDate: '',
                addedDate: '',
                deadline: '',
                order: 0,
                description: '',
                priority: 0,
                todoListId: 'todolistId2'
            },
        ],
    }
    const todolistId = v1()
    const result = tasksReducer(startState, addTodolistAC({
        id:todolistId,title:'hello',addedDate:'',order:0
    }))
    const keys = Object.keys(result)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)

    expect(result[newKey]).toEqual([])


})

test('empty array should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {id: '1', title: "title 1", order: 0, addedDate: ''},
    ])

    const result = tasksReducer({}, action)

    const keys = Object.keys(result)


    expect(keys.length).toBe(2)
    expect(result['1']).toBe([])
    expect(result['2']).toBe([])


})


test('tasks should be added for todolist', () => {
    const action = setTasksAC([{
        id: v1(), title: 'Js', status: TaskStatuses.New,
        startDate: '', addedDate: '', deadline: '',
        order: 0, description: '', priority: 0, todoListId: 'todolistId1'
    }], 'todolistId1')

    const result = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)


    expect(result['todolistId1'.length]).toBe(1)
    expect(result['todolistId2'.length]).toBe(0)

})


























