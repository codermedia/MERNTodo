import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import TodoItem from "../components/TodoItem";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const TodoList = () => {
  const { todos, loading, error, fetchTodos, clearError } = useTodoContext();

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>

      {error && <Alert message={error} type="error" onClose={clearError} />}

      {todos.length === 0 ? (
        <div className="empty-state">
          <p>No todos found. Let's add some!</p>
          <Link to="/add" className="btn btn-primary">
            Add New Todo
          </Link>
        </div>
      ) : (
        <div className="todo-grid">
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
