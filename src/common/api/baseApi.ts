import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "d14e063f-4d3a-4f0c-9999-8e5b07f8e195",
  },
});
