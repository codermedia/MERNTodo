import React from "react";
import { Link } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";

const TodoItem = ({ todo }) => {
  const { deleteTodo } = useTodoContext();

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "in-progress":
        return "status-in-progress";
      case "completed":
        return "status-completed";
      default:
        return "";
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(todo._id);
    }
  };

  return (
    <div className="todo-item">
      <h3 className="todo-title">{todo.title}</h3>
      {todo.description && (
        <p className="todo-description">{todo.description}</p>
      )}
      <div className="todo-meta">
        <span className={`todo-status ${getStatusClass(todo.status)}`}>
          {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
        </span>
        <span className="todo-date">
          Created: {new Date(todo.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="todo-actions">
        <Link to={`/edit/${todo._id}`} className="btn btn-edit">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
