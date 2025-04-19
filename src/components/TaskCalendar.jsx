
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useTasks } from "../context/TaskContext";


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const TaskCalendar = () => {
  const { tasks, updateTask } = useTasks();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const formattedTasks = tasks.map((task) => ({
      id: task.id,
      title: task.title,
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      allDay: true,
    }));
    setEvents(formattedTasks);
  }, [tasks]);

  const moveEvent = ({ event, start, end }) => {
    const updatedTask = tasks.find((t) => t.id === event.id);
    if (updatedTask) {
      updateTask({ ...updatedTask, dueDate: start.toISOString().split("T")[0] });
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Task Calendar</h4>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onEventDrop={moveEvent}
        draggableAccessor={() => true}
        defaultView="month"
        views={['month']}
        popup
      />
    </div>
  );
};

export default TaskCalendar;


