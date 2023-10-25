import { BaseResponseType } from "common/types/types";
import { DispatchType } from "App/store";
import { appActions } from "App/app-reducer";

export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: DispatchType, showError: boolean = true) => {
  if (showError) {
    dispatch(appActions.setAppErrorAC({ error: data.messages.length ? data.messages[0] : "Some error occurred" }));
  }

  dispatch(appActions.setAppStatusAC({ status: "failed" }));
};
