import {
  TodolistDomainType,
  todolistsActions,
  todolistsReducer,
} from "../todolists-reducer";
import { todolistsThunks } from "features/Todolists/reducers/todolists-actions";

let startState: TodolistDomainType[] = [];
beforeEach(() => {
  startState = [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "active",
      entityStatus: "idle",
      order: 0,
      addedDate: "",
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "completed",
      entityStatus: "idle",
      order: 0,
      addedDate: "",
    },
  ];
});

test("should be removed correct todolists", () => {
  const action = todolistsThunks.removeTodolist.fulfilled(
    { todolistId: "todolistId1" },
    "reqId",
    "todolistId1"
  );
  const result = todolistsReducer(startState, action);

  expect(result.length).toBe(1);
  expect(result[0].id).toBe("todolistId2");
});

test("should be add correct todolists", () => {
  const result = todolistsReducer(
    startState,
    todolistsThunks.addTodolist.fulfilled(
      {
        todolist: {
          id: "todolistId1",
          title: "hello",
          addedDate: "",
          order: 0,
        },
      },
      "reqId",
      "hello"
    )
  );

  expect(result.length).toBe(3);
  expect(result[0].title).toBe("hello");
});

test("should be filtered correct todolists", () => {
  const result = todolistsReducer(
    startState,
    todolistsActions.changeTodolistFilterAC({
      value: "all",
      todolistId: "todolistId1",
    })
  );

  expect(result[0].filter).toBe("all");
});

test("should be changed title correct todolists", () => {
  const action = todolistsThunks.changeTodolistTitle.fulfilled(
    { title: "hello", todolistId: "todolistId1" },
    "reqId",
    {
      title: "hello",
      todolistId: "todolistId1",
    }
  );
  const result = todolistsReducer(startState, action);

  expect(result[0].title).toBe("hello");
});

test("todolists should be set to the state", () => {
  const action = todolistsThunks.fetchTodolists.fulfilled(
    { todolists: startState },
    "reqId",
    undefined
  );
  const result = todolistsReducer([], action);

  expect(result.length).toBe(2);
});

test("correct entity status of todolist should be changed", () => {
  const result = todolistsReducer(
    startState,
    todolistsActions.changeTodolistEntityStatusAC({
      todolistId: "todolistId1",
      status: "loading",
    })
  );

  expect(result[0].entityStatus).toBe("loading");
});
