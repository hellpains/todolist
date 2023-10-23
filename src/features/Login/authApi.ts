import { instance } from "common/api/baseApi";
import { ResponseType } from "common/types/types";

export const authAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<ResponseType<{ userId?: number }>>("auth/login", { email, password, rememberMe });
  },
  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>("auth/login");
  },
  me() {
    return instance.get<ResponseType<{ id: number; email: string; login: string }>>("auth/me");
  },
};
