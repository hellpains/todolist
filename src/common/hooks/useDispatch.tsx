import { useDispatch } from "react-redux";
import { DispatchType } from "App/store";

export const useAppDispatch = () => useDispatch<DispatchType>();
