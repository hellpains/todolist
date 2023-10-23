import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../App/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
