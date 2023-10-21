import { TodolistDomainType, todolistsActions, todolistsReducer } from "../todolists-reducer";
import { TasksForTodolistType, tasksReducer } from "../tasks-reducer";
import { v1 } from "uuid";
import { TaskStatuses } from "api/todolists-api";

test("ids should be equals", () => {
  const startTasksState: TasksForTodolistType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];
  const todolistId = v1();
  const action = todolistsActions.addTodolistAC({
    todolist: {
      id: todolistId,
      title: "hello",
      addedDate: "",
      order: 0,
    },
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});

test("property with todolistId should be deleted", () => {
  const startState: TasksForTodolistType = {
    ["todolistId1"]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId1",
      },
      {
        id: v1(),
        title: "CSS",
        status: TaskStatuses.Completed,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId1",
      },
      {
        id: v1(),
        title: "Js",
        status: TaskStatuses.New,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId1",
      },
      {
        id: v1(),
        title: "Js",
        status: TaskStatuses.New,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId1",
      },
    ],
    ["todolistId2"]: [
      {
        id: v1(),
        title: "Milk",
        status: TaskStatuses.Completed,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId2",
      },
      {
        id: v1(),
        title: "Salt",
        status: TaskStatuses.Completed,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId2",
      },
      {
        id: v1(),
        title: "Sugar",
        status: TaskStatuses.New,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId2",
      },
    ],
  };

  const action = todolistsActions.removeTodolistAC({ todolistId: "todolistId2" });

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
