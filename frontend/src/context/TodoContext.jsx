import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

// API base URL
const API_URL = "http://localhost:3000/api/todos";

// Initial state
const initialState = {
  todos: [],
  loading: false,
  error: null,
  filterStatus: "all",
};

// Actions
const actions = {
  FETCH_TODOS_REQUEST: "FETCH_TODOS_REQUEST",
  FETCH_TODOS_SUCCESS: "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_FAILURE: "FETCH_TODOS_FAILURE",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  DELETE_TODO_SUCCESS: "DELETE_TODO_SUCCESS",
  SET_FILTER_STATUS: "SET_FILTER_STATUS",
  CLEAR_ERROR: "CLEAR_ERROR",
};

// Reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_TODOS_REQUEST:
      return { ...state, loading: true, error: null };
    case actions.FETCH_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.payload, error: null };
    case actions.FETCH_TODOS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actions.ADD_TODO_SUCCESS:
      return { ...state, todos: [action.payload, ...state.todos] };
    case actions.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        ),
      };
    case actions.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    case actions.SET_FILTER_STATUS:
      return { ...state, filterStatus: action.payload };
    case actions.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

// Create context
const TodoContext = createContext();

// Context Provider
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Fetch todos
  const fetchTodos = async () => {
    dispatch({ type: actions.FETCH_TODOS_REQUEST });
    try {
      let url = API_URL;
      if (state.filterStatus !== "all") {
        url += `?status=${state.filterStatus}`;
      }
      const response = await axios.get(url);
      dispatch({ type: actions.FETCH_TODOS_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: actions.FETCH_TODOS_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch todos",
      });
    }
  };

  // Add todo
  const addTodo = async (todo) => {
    dispatch({ type: actions.FETCH_TODOS_REQUEST });
    try {
      const response = await axios.post(API_URL, todo);
      dispatch({ type: actions.ADD_TODO_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({
        type: actions.FETCH_TODOS_FAILURE,
        payload: error.response?.data?.message || "Failed to add todo",
      });
      throw error;
    }
  };

  // Update todo
  const updateTodo = async (id, todo) => {
    dispatch({ type: actions.FETCH_TODOS_REQUEST });
    try {
      const response = await axios.put(`${API_URL}/${id}`, todo);
      dispatch({ type: actions.UPDATE_TODO_SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({
        type: actions.FETCH_TODOS_FAILURE,
        payload: error.response?.data?.message || "Failed to update todo",
      });
      throw error;
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    dispatch({ type: actions.FETCH_TODOS_REQUEST });
    try {
      await axios.delete(`${API_URL}/${id}`);
      dispatch({ type: actions.DELETE_TODO_SUCCESS, payload: id });
    } catch (error) {
      dispatch({
        type: actions.FETCH_TODOS_FAILURE,
        payload: error.response?.data?.message || "Failed to delete todo",
      });
      throw error;
    }
  };

  // Set filter status
  const setFilterStatus = (status) => {
    dispatch({ type: actions.SET_FILTER_STATUS, payload: status });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: actions.CLEAR_ERROR });
  };

  // Effect to fetch todos when filter changes
  useEffect(() => {
    fetchTodos();
  }, [state.filterStatus]);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        filterStatus: state.filterStatus,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        setFilterStatus,
        clearError,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use the TodoContext
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
