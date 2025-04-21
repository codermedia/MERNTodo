import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import Navbar from "./components/Navbar";
import TodoList from "./pages/TodoList";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";

import "./App.css";

function App() {
  return (
    <TodoProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/add" element={<AddTodo />} />
              <Route path="/edit/:id" element={<EditTodo />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TodoProvider>
  );
}

export default App;
