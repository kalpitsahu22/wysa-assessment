// components/Todos.js
import React, { useState } from "react";

const Todos = ({ todos, onAddTodo, onUpdateTodo, onDeleteTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleUpdateTodo = (id) => {
    if (editText.trim()) {
      onUpdateTodo(id, editText);
      setEditTodo(null);
      setEditText("");
    }
  };

  return (
    <div className="tab-content">
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new to-do..."
          maxLength={150}
        />
        <button className="edit-btn" onClick={handleAddTodo}>
          Add To-do
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editTodo === todo.id ? (
              <div className="add-todo">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="edit-btn"
                  onClick={() => handleUpdateTodo(todo.id)}
                >
                  Save
                </button>
                <button onClick={() => setEditTodo(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <span>{todo.todo}</span>
                <div className="todo-actions">
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditTodo(todo.id);
                      setEditText(todo.todo);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="edit-btn"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
