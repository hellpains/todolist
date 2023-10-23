import { TaskStatuses } from "common/enum/enum";
import { tasksActions, TasksForTodolistType, tasksReducer, tasksThunks } from "features/Todolists/reducers/tasks-reducer";
import { todolistsActions } from "features/Todolists/reducers/todolists-reducer";

let startState: TasksForTodolistType = {};
beforeEach(() => {
  startState = {
    ["todolistId1"]: [
      {
        id: "taskId1",
        title: "HTML&CSS",
        status: 2,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId1",
      },
      {
        id: "taskId2",
        title: "CSS",
        status: 2,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId1",
      },
      {
        id: "taskId3",
        title: "Js",
        status: 0,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId1",
      },
      {
        id: "taskId4",
        title: "Js",
        status: 0,
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
        id: "taskId1",
        title: "Milk",
        status: 2,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId2",
      },
      {
        id: "taskId2",
        title: "Salt",
        status: 2,
        startDate: "",
        addedDate: "",
        deadline: "",
        order: 0,
        description: "",
        priority: 0,
        todoListId: "todolistId2",
      },
      {
        id: "taskId3",
        title: "Sugar",
        status: 0,
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
});

test("correct task should be deleted from correct array", () => {
  const action = tasksThunks.removeTask.fulfilled({ taskId: "taskId1", todolistId: "todolistId1" }, "requestId", {
    taskId: "taskId1",
    todolistId: "todolistId1",
  });
  let result = tasksReducer(startState, action);

  expect(result["todolistId1"].length).toBe(3);
  expect(result["todolistId1"][1].title).toBe("Js");
});

test("should be add correct task", () => {
  const task = {
    description: "",
    status: TaskStatuses.New,
    title: "newTask",
    priority: 0,
    startDate: "",
    order: 0,
    deadline: "",
    id: "taskId2",
    addedDate: "",
    todoListId: "todolistId1",
  };
  const action = tasksThunks.addTask.fulfilled({ task }, "requestId", { todolistId: task.todoListId, title: task.title });
  let result = tasksReducer(startState, action);

  expect(result["todolistId1"].length).toBe(5);
  expect(result["todolistId1"][0].title).toBe("newTask");
});

test("should be changed title correct task", () => {
  const action = tasksThunks.updateTask.fulfilled(
    { todolistId: "todolistId1", taskId: "taskId2", model: { title: "updatedTitle" } },
    "requestId",
    { todolistId: "todolistId1", taskId: "taskId1", model: { title: "updatedTitle" } },
  );
  let result = tasksReducer(startState, action);

  expect(result["todolistId1"].length).toBe(4);
  expect(result["todolistId1"][1].title).toBe("updatedTitle");
});

test("should be changed status correct task", () => {
  const action = tasksThunks.updateTask.fulfilled(
    { todolistId: "todolistId1", taskId: "taskId2", model: { status: TaskStatuses.New } },
    "requestId",
    { todolistId: "todolistId1", taskId: "taskId1", model: { status: TaskStatuses.New } },
  );

  let result = tasksReducer(startState, action);

  expect(result["todolistId1"].length).toBe(4);
  expect(result["todolistId1"][1].status).toBe(TaskStatuses.New);
});

test("new array should be added when new todolist is added", () => {
  const result = tasksReducer(
    startState,
    todolistsActions.addTodolistAC({
      todolist: {
        id: "todolistId1",
        title: "hello",
        addedDate: "",
        order: 0,
      },
    }),
  );
  const keys = Object.keys(result);
  let newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);

  expect(result[newKey]).toEqual([]);
});

test("empty array should be added when we set todolists", () => {
  const action = todolistsActions.setTodolistsAC({
    todolists: [
      { id: "1", title: "title 1", order: 0, addedDate: "" },
      { id: "2", title: "title 2", order: 0, addedDate: "" },
    ],
  });

  const result = tasksReducer({}, action);

  const keys = Object.keys(result);

  expect(keys.length).toBe(2);
  expect(result["1"]).toBeDefined();
  expect(result["2"]).toBeDefined();
});

test("tasks should be added for todolist", () => {
  const action = tasksThunks.fetchTasks.fulfilled(
    { tasks: startState["todolistId1"], todolistId: "todolistId1" },
    "requestId",
    "todolistId1",
  );

  const result = tasksReducer({ todolistId2: [], todolistId1: [] }, action);

  expect(result["todolistId1"].length).toBe(4);
  expect(result["todolistId2"].length).toBe(0);
});
