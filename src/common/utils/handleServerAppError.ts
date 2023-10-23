import { ResponseType } from "common/types/types";
import { DispatchType } from "../../App/store";
import { appActions } from "../../App/app-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: DispatchType) => {
  if (data.messages.length) {
    dispatch(appActions.setAppErrorAC({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppErrorAC({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatusAC({ status: "failed" }));
};
