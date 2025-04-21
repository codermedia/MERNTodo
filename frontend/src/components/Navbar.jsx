import React from "react";
import { Link } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";

const Navbar = () => {
  const { setFilterStatus, filterStatus } = useTodoContext();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MERN Todo App
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/add" className="nav-link">
            Add Todo
          </Link>
        </div>
        <div className="filter-container">
          <label htmlFor="filter">Filter by status:</label>
          <select
            id="filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
