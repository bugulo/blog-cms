import axios, { AxiosResponse } from "axios";

import { useMutation, useQuery } from "react-query";

import { queryClient } from "@/lib/react-query";

import { User } from "./Identity";

export type PostEntity = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: User;
};

export type PostCreateModel = {
  title: string;
  content: string;
};

const getPosts = async (): Promise<PostEntity[]> => {
  const response = await axios.get<PostEntity[]>("/api/posts");
  return response.data;
};

const getPost = async (id: string): Promise<PostEntity> => {
  const response = await axios.get<PostEntity>(`/api/posts/${id}`);
  return response.data;
};

const createPost = async (model: PostCreateModel): Promise<AxiosResponse> => {
  return axios.post("/api/posts", model);
};

const deletePost = async (id: string): Promise<AxiosResponse> => {
  return axios.delete(`/api/posts/${id}`);
};

const updatePost = async (
  id: string,
  model: PostCreateModel
): Promise<AxiosResponse> => {
  return axios.patch(`/api/posts/${id}`, model);
};

export const usePosts = () => {
  return useQuery<PostEntity[], Error>("posts", getPosts);
};

export const usePost = (id: string) => {
  return useQuery<PostEntity, Error>(["post", id], () => getPost(id));
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
};

export const useDeletePost = (id: string) => {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries(["post", id]);
    },
  });
};

export const useUpdatePost = (id: string) => {
  return useMutation({
    mutationFn: (model: PostCreateModel) => updatePost(id, model),
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries(["post", id]);
    },
  });
};
