import React, { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { Toast, ToastContainer } from "react-bootstrap";

const NotificationPanel = () => {
  const { tasks } = useTasks();
  const [show, setShow] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const dueToday = tasks.filter(
      (task) => task.dueDate === today && task.status !== "Completed"
    );
    const overdue = tasks.filter(
      (task) => task.dueDate < today && task.status !== "Completed"
    );
    setNotifications([
      ...dueToday.map((task) => ({ type: "Due Today", task })),
      ...overdue.map((task) => ({ type: "Overdue", task })),
    ]);
  }, [tasks]);

  return (
    <ToastContainer position="top-end" className="p-3">
      {notifications.map((note, idx) => (
        <Toast
          key={idx}
          onClose={() => setShow(false)}
          show={show}
          bg={note.type === "Overdue" ? "danger" : "warning"}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">{note.type}</strong>
          </Toast.Header>
          <Toast.Body>{note.task.title} is {note.type.toLowerCase()}.</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default NotificationPanel;
