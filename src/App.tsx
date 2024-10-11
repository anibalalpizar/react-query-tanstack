import { useQuery, useMutation } from "@tanstack/react-query";
import { createPost, getUsers } from "./utils/api";
import type { UserResponseHttpData } from "./types/types";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { mutate, isSuccess } = useMutation({
    mutationFn: createPost,
  });

  const { data, error, isLoading } = useQuery<UserResponseHttpData[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  if (error && !isLoading) {
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

      {!isLoading && data ? (
        <div>
          {data.map((user) => (
            <div>
              <b>{user.name}</b>
              <b>{user.username}</b>
              <b>{user.email}</b>
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
