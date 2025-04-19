

import React, { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import Filter from "./Filter";

const TaskList = () => {
  const { tasks, updateTask, deleteTask } = useTasks();
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleFilter = (filters) => {
    const filtered = tasks.filter((task) => {
      const statusMatch = filters.status ? task.status === filters.status : true;
      const priorityMatch = filters.priority ? task.priority === filters.priority : true;
      const categoryMatch = filters.category
        ? task.category.toLowerCase().includes(filters.category.toLowerCase())
        : true;
      return statusMatch && priorityMatch && categoryMatch;
    });

    setFilteredTasks(filtered);
  };

  const toggleStatus = (task) => {
    const newStatus =
      task.status === "Pending"
        ? "In Progress"
        : task.status === "In Progress"
        ? "Completed"
        : "Pending";
    updateTask({ ...task, status: newStatus });
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Task List</h4>
      <Filter onFilter={handleFilter} />

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Category</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No tasks found.
              </td>
            </tr>
          ) : (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.category}</td>
                <td>{task.dueDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => toggleStatus(task)}
                  >
                    Toggle Status
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

