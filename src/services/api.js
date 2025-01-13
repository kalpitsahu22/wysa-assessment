export const fetchUsers = async () => {
  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();
  return data.users;
};

export const searchUsers = async (query) => {
  const response = await fetch(`https://dummyjson.com/users/search?q=${query}`);
  const data = await response.json();
  return data.users;
};

export const fetchTodos = async (userId) => {
  const response = await fetch("https://dummyjson.com/todos");
  const data = await response.json();
  return data.todos.filter((todo) => todo.userId === userId);
};

export const addTodo = async (userId, todoText) => {
  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      todo: todoText,
      completed: false,
    }),
  });
  return response.json();
};

export const updateTodo = async (id, updates) => {
  const response = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const updateUserDetails = async (userId, updatedData) => {
  try {
    const response = await fetch(`https://dummyjson.com/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Failed to update user");
    return response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
