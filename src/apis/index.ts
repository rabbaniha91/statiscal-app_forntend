import axios, { privateAxios } from "@/axios";
import { Login, Signup } from "@/types";

// -----------------------authenticate apis----------------------------
export const signup = async (data: Signup, signal: AbortSignal) => {
  return (await axios.post("/user/signup", data, { signal })).data;
};

export const login = async (data: Login, signal: AbortSignal) => {
  return (await axios.post("/user/login", data, { signal })).data;
};

// ------------------------calcs apis-----------------------------------

export const callBasicCalsApi = async (data: any, signal: AbortSignal) => {
  return (await axios.post("/statistic/descriptive-analysis", data, { signal })).data;
};
