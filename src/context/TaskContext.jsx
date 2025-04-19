import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Finish assignment",
    description: "Complete the React task tracker assignment",
    dueDate: "2025-04-18",
    status: "Pending",
    priority: "High",
    category: "Work",
  },
  {
    id: 2,
    title: "Buy groceries",
    description: "Milk, eggs, bread",
    dueDate: "2025-04-16",
    status: "In Progress",
    priority: "Medium",
    category: "Personal",
  },
];

 const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

const addTask = (task) => { setTasks((prev) => [...prev, task]); };

  const updateTask = (updatedTask) =>
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);


export default TaskProvider;