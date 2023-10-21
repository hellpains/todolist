import { appActions, appReducer, RequestStatusType } from "./app-reducer";

type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  initialized: boolean;
};
let startState: InitialStateType;
beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    initialized: false,
  };
});

test("correct error message should be set", () => {
  const result = appReducer(startState, appActions.setAppErrorAC({ error: "some error" }));

  expect(result.error).toBe("some error");
});

test("correct status  should be set", () => {
  const result = appReducer(startState, appActions.setAppStatusAC({ status: "loading" }));

  expect(result.status).toBe("loading");
});
