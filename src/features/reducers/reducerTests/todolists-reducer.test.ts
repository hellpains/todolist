import { v1 } from "uuid";
import { TodolistDomainType, todolistsActions, todolistsReducer } from "../todolists-reducer";

beforeEach(() => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  const startState: TodolistDomainType[] = [
    { id: todolistId1, title: "What to learn", filter: "active", entityStatus: "idle", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "completed", entityStatus: "idle", order: 0, addedDate: "" },
  ];
});

test("should be removed correct todolists", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  const startState: TodolistDomainType[] = [
    { id: todolistId1, title: "What to learn", filter: "active", entityStatus: "idle", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "completed", entityStatus: "idle", order: 0, addedDate: "" },
  ];
  const result = todolistsReducer(startState, todolistsActions.removeTodolistAC({ todolistId: todolistId1 }));

  expect(result.length).toBe(1);
  expect(result[0].id).toBe(todolistId2);
});

test("should be add correct todolists", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  const startState: TodolistDomainType[] = [
    { id: todolistId1, title: "What to learn", filter: "active", entityStatus: "idle", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "completed", entityStatus: "idle", order: 0, addedDate: "" },
  ];
  const todolistId = v1();
  const result = todolistsReducer(
    startState,
    todolistsActions.addTodolistAC({
      todolist: {
        id: todolistId,
        title: "hello",
        addedDate: "",
        order: 0,
      },
    }),
  );

  expect(result.length).toBe(3);
  expect(result[0].title).toBe("hello");
});

test("should be filtered correct todolists", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  const startState: TodolistDomainType[] = [
    { id: todolistId1, title: "What to learn", filter: "active", entityStatus: "idle", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "completed", entityStatus: "idle", order: 0, addedDate: "" },
  ];
  const result = todolistsReducer(startState, todolistsActions.changeTodolistFilterAC({ value: "all", todolistId: todolistId1 }));

  expect(result[0].filter).toBe("all");
});

test("should be changed title correct todolists", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  const startState: TodolistDomainType[] = [
    { id: todolistId1, title: "What to learn", filter: "active", entityStatus: "idle", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "completed", entityStatus: "idle", order: 0, addedDate: "" },
  ];
  const result = todolistsReducer(
    startState,
    todolistsActions.changeTodolistTitleAC({ title: "hello", todolistId: todolistId1 }),
  );

  expect(result[0].title).toBe("hello");
});

test("todolsits should be set to the state", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  const startState: TodolistDomainType[] = [
    { id: todolistId1, title: "What to learn", filter: "active", entityStatus: "idle", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "completed", entityStatus: "idle", order: 0, addedDate: "" },
  ];

  const result = todolistsReducer([], todolistsActions.setTodolistsAC({ todolists: startState }));

  expect(result.length).toBe(2);
});

test("correct entity status of todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();
  const startState: TodolistDomainType[] = [
    { id: todolistId1, title: "What to learn", filter: "active", entityStatus: "idle", order: 0, addedDate: "" },
    { id: todolistId2, title: "What to buy", filter: "completed", entityStatus: "idle", order: 0, addedDate: "" },
  ];
  const result = todolistsReducer(
    startState,
    todolistsActions.changeTodolistEntityStatusAC({ todolistId: todolistId1, status: "loading" }),
  );

  expect(result[0].entityStatus).toBe("loading");
});
