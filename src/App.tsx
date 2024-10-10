import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./utils/api";
import type { UserResponseHttpData } from "./types/types";

function App() {
  const { data, error, isLoading } = useQuery<UserResponseHttpData[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  if (error && !isLoading) {
    return <div>An error ocurred while fetching the data...</div>;
  }

  return (
    <div>
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
