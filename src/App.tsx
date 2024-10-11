import { useQuery, useMutation } from "@tanstack/react-query";
import { createPost, getPosts, getUsers } from "./utils/api";
import type { UserResponseHttpData, PostResponseHttpData } from "./types/types";
import { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { mutate, isSuccess } = useMutation({
    mutationFn: createPost,
  });

  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useQuery<UserResponseHttpData[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  const {
    data: postsData,
    error: postsError,
    isLoading: postsIsLoading,
    refetch: refetchGetPosts,
    isSuccess: postsIsSuccess,
    isPending: postsIsPending,
  } = useQuery<PostResponseHttpData[]>({
    queryKey: ["getPosts"],
    queryFn: getPosts,
  });

  useEffect(() => {
    if (isSuccess && !postsIsPending) {
      console.log("Post created successfully - refetching posts...");
      refetchGetPosts();
    }
  }, [isSuccess, postsIsPending, refetchGetPosts]);

  if (usersError && !usersIsLoading) {
    return <div>An error ocurred while fetching the data...</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ title, body, userId: 1 });
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="body">Body</label>
        <input
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        {!postsIsLoading &&
          postsData &&
          postsData.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          ))}
      </div>

      {!usersIsLoading && usersData ? (
        <div>
          {usersData.map((usersData) => (
            <div key={usersData.id}>
              <b>{usersData.name}</b>
              <b>{usersData.username}</b>
              <b>{usersData.email}</b>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default App;
