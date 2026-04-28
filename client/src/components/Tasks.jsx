import { useEffect, useState } from "react";
import api from "../services/api";

function Tasks({ onEdit, refresh }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const res = await api.get("/tasks/get-tasks");
      setTasks(res.data.tasks);
    };

    getTasks();
  }, [refresh]);

  return (
    <div className="tasks">
      <h2>Your Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div className="task-card" key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>
              Due:{" "}
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </p>
            <button onClick={() => onEdit(task)}>Edit</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;
