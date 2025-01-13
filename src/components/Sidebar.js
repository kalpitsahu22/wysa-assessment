import React, { useState, useEffect } from "react";
import { searchUsers } from "../services/api";

const Sidebar = ({
  users,
  onSelectUser,
  fetchAllUsers,
  onSetFilteredUsers,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const filteredUsers = await searchUsers(query);
      onSetFilteredUsers(filteredUsers);
    } else {
      // If search query is empty, fetch and reset all users
      const allUsers = await fetchAllUsers();
      onSetFilteredUsers(allUsers);
    }
  };

  return (
    <div className="sidebar">
      <div className="users-container">
        <h3 className="users-list">Users List</h3>
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <ul className="user-list">
        {users.map((user) => (
          <li
            key={user.id}
            className="user-item"
            onClick={() => onSelectUser(user)}
          >
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
