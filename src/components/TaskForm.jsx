import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Button, Form, Card } from "react-bootstrap";


const TaskForm = () => {
  const { addTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    priority: "Low",
    category: "General",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (!task.title || !task.dueDate) 
    { 
        alert("Title and due date are required.");
         return; 
    }

const newTask = { ...task, id: Date.now(),  };// unique ID using timestamp
    addTask(newTask);
    setTask(
        { 
            title: "", 
            description: "",
            dueDate: "", 
            status: "Pending",
            priority: "Medium", 
            category: "",
        }
            ); };

  return (
    <Card className="container mt-4 p-4">
      <h4 className="mb-3">Add New Task</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Priority</Form.Label>
          <Form.Select name="priority" value={task.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={task.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Task
        </Button>
      </Form>
    </Card>
  );
};

export default TaskForm;
