export const getUsers = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  return data.json();
};
