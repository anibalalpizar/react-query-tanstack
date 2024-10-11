import type { CreatePostRequestBody } from "../types/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const data = await fetch(`${BASE_URL}/users`);
  return data.json();
};

export const createPost = async (body: CreatePostRequestBody) => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return res.json();
};

export const getPosts = async () => {
  const data = await fetch(`${BASE_URL}/posts`);
  return data.json();
};
