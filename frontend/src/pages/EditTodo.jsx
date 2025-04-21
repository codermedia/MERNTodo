import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import axios from "axios";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const EditTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTodo, loading, error, clearError } = useTodoContext();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/todos/${id}`
        );
        setTodo(response.data);
        setFetchLoading(false);
      } catch (err) {
        setFetchError(err.response?.data?.message || "Failed to fetch todo");
        setFetchLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

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
      await updateTodo(id, todo);
      navigate("/");
    } catch (err) {
      // Error is handled in context
    }
  };

  if (fetchLoading) {
    return <Spinner />;
  }

  if (fetchError) {
    return (
      <div className="error-container">
        <Alert message={fetchError} type="error" />
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h1>Edit Todo</h1>

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
            value={todo.description || ""}
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
            {loading ? "Updating..." : "Update Todo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodo;
