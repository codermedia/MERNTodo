import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import Alert from "../components/Alert";

const AddTodo = () => {
  const navigate = useNavigate();
  const { addTodo, loading, error, clearError } = useTodoContext();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!todo.title.trim()) {
      setValidationError("Title is required");
      return;
    }

    try {
      await addTodo(todo);
      navigate("/");
    } catch (err) {
      // Error is handled in context
    }
  };

  return (
    <div className="form-container">
      <h1>Add New Todo</h1>

      {(error || validationError) && (
        <Alert
          message={validationError || error}
          type="error"
          onClose={validationError ? () => setValidationError("") : clearError}
        />
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo.title}
            onChange={handleChange}
            placeholder="Enter todo title"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={todo.description}
            onChange={handleChange}
            placeholder="Enter description (optional)"
            rows="4"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={todo.status}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
