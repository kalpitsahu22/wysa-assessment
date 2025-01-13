// components/Dashboard.js
import React, { useState, useEffect } from "react";
import UserDetails from "../components/UserDetails";
import Todos from "../components/Todos";
import {
  fetchUsers,
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  updateUserDetails,
} from "../services/api";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [userTodos, setUserTodos] = useState({}); // Store todos for each user

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Fetch todos when user is selected and their todos haven't been loaded yet
  useEffect(() => {
    if (selectedUser && !userTodos[selectedUser.id]) {
      loadUserTodos(selectedUser.id);
    }
  }, [selectedUser]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response);
      setFilteredUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const loadUserTodos = async (userId) => {
    try {
      const todosData = await fetchTodos(userId);
      setUserTodos((prev) => ({
        ...prev,
        [userId]: todosData,
      }));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddTodo = async (todoText) => {
    if (selectedUser) {
      try {
        const newTodo = await addTodo(selectedUser.id, todoText);
        setUserTodos((prev) => ({
          ...prev,
          [selectedUser.id]: [...(prev[selectedUser.id] || []), newTodo],
        }));
        toast.success("Todo added successfully!");
      } catch (error) {
        console.error("Error adding todo:", error);
        toast.error("Failed to add todo. Please try again.");
      }
    }
  };

  const handleUpdateTodo = async (todoId, updatedText) => {
    if (selectedUser) {
      try {
        const updatedTodo = await updateTodo(todoId, { todo: updatedText });
        setUserTodos((prev) => ({
          ...prev,
          [selectedUser.id]: prev[selectedUser.id].map((todo) =>
            todo.id === todoId ? { ...todo, ...updatedTodo } : todo
          ),
        }));
        toast.success("Todo updated successfully!");
      } catch (error) {
        console.error("Error updating todo:", error);
        toast.error("Failed to update todo. Please try again.");
      }
    }
  };

  const handleDeleteTodo = async (todoId) => {
    if (selectedUser) {
      try {
        await deleteTodo(todoId);
        setUserTodos((prev) => ({
          ...prev,
          [selectedUser.id]: prev[selectedUser.id].filter(
            (todo) => todo.id !== todoId
          ),
        }));
        toast.success("Todo deleted successfully!");
      } catch (error) {
        console.error("Error deleting todo:", error);
        toast.error("Failed to delete todo. Please try again.");
      }
    }
  };

  const handleUpdateUser = async (updatedData) => {
    if (selectedUser) {
      try {
        const updatedUser = await updateUserDetails(
          selectedUser.id,
          updatedData
        );
        setUsers(
          users.map((user) =>
            user.id === selectedUser.id ? { ...user, ...updatedUser } : user
          )
        );
        setFilteredUsers(
          filteredUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, ...updatedUser } : user
          )
        );
        setSelectedUser({ ...selectedUser, ...updatedUser });
        toast.success("User details updated successfully!");
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update user details. Please try again.");
      }
    }
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    // Keep the same tab when switching users
    // If you want to always start with details tab for new users, uncomment next line
    // setActiveTab('details');
  };

  return (
    <div className="dashboard">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="sidebar">
        <div className="users-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <ul className="user-list">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="user-item"
                onClick={() => handleUserSelection(user)}
              >
                {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="main-pane">
        {selectedUser ? (
          <>
            <div className="tabs">
              <button
                className={`tab ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                User Details
              </button>
              <button
                className={`tab ${activeTab === "todos" ? "active" : ""}`}
                onClick={() => setActiveTab("todos")}
              >
                To-Dos
              </button>
            </div>

            {activeTab === "details" ? (
              <UserDetails
                user={selectedUser}
                onUpdateUser={handleUpdateUser}
              />
            ) : (
              <Todos
                todos={userTodos[selectedUser.id] || []}
                onAddTodo={handleAddTodo}
                onUpdateTodo={handleUpdateTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            )}
          </>
        ) : (
          <div className="tab-content">
            Select a user to view details and manage to-dos.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
