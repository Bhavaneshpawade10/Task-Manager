import React, { useState } from "react";

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    category: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => {
    if (typeof onFilter === "function") {
      onFilter(filters);
    } else {
      console.error("onFilter prop is not a function", onFilter);
    }
  };

  return (
    <div className="mb-3 d-flex gap-3 align-items-end flex-wrap">
      <div>
        <label>Status:</label>
        <select
          className="form-select"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label>Priority:</label>
        <select
          className="form-select"
          name="priority"
          value={filters.priority}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div>
        <label>Category:</label>
        <input
          type="text"
          className="form-control"
          name="category"
          value={filters.category}
          onChange={handleChange}
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={handleFilter}>
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;



