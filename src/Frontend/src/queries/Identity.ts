import axios, { AxiosResponse } from "axios";

export type User = {
  id: string;
  username: string;
};

export type LoginModel = {
  username: string;
  password: string;
};

export type RegisterModel = {
  username: string;
  password: string;
};

export const loginUser = (model: LoginModel): Promise<AxiosResponse> => {
  return axios.post("/api/identity/login", model);
};

export const registerUser = (model: RegisterModel): Promise<AxiosResponse> => {
  return axios.post("/api/identity/register", model);
};

export const getUser = async (): Promise<User> => {
  const response = await axios.get<User>("/api/identity");
  return response.data;
};

export const logoutUser = (): Promise<AxiosResponse> => {
  return axios.post("/api/identity/logout");
};
