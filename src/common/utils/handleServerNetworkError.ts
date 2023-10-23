import { DispatchType } from "App/store";
import { appActions } from "App/app-reducer";
import axios from "axios";

export const handleServerNetworkError = (err: unknown, dispatch: DispatchType): void => {
  let errorMessage = "Some error occurred";

  if (axios.isAxiosError(err)) {
    // @ts-ignore
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(appActions.setAppErrorAC({ error: errorMessage }));
  dispatch(appActions.setAppStatusAC({ status: "failed" }));
};
