export interface UserResponseHttpData {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface CreatePostRequestBody {
  title: string;
  body: string;
  userId: number;
}

export interface PostResponseHttpData {
  id: number;
  title: string;
  body: string;
  userId: number;
}