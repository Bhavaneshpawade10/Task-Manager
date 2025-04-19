import React from "react";
import  { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import NotificationPanel from "../components/NotificationPanel";


const Home = () => {
  const [filters] = useState({ status: "", priority: "", category: "" });

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Task Manager</h2>
      <NotificationPanel />
      <TaskForm />
      <TaskList filters={filters} />
    </div>
  );
};

export default Home;
