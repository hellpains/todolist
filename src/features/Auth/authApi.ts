import { instance } from "common/api/baseApi";
import { BaseResponseType } from "common/types/types";

export const authAPI = {
  login(arg: ArgLoginType) {
    return instance.post<BaseResponseType<{ userId?: number }>>("auth/login", { ...arg });
  },
  logout() {
    return instance.delete<BaseResponseType<{ userId?: number }>>("auth/login");
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("auth/me");
  },
};

export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
