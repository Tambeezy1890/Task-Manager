import { useState } from "react";
import api from "../services/api";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";

function TaskForm({ editingTask, setEditingTask, triggerRefresh }) {
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "to-do",
    priority: "medium",
    dueDate: "",
  });
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate?.split("T")[0] || "",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitTask = async (e) => {
    e.preventDefault();

    if (editingTask) {
      await api.patch(`/tasks/update-task/${editingTask._id}`, formData);
      setEditingTask(null);
    } else {
      await api.post("/tasks/create-task", formData);
    }
    triggerRefresh();

    setFormData({
      title: "",
      description: "",
      status: "to-do",
      priority: "medium",
      dueDate: "",
    });
  };

  if (!user) return <p>Please login to create tasks.</p>;

  return (
    <div className="task-form">
      <form onSubmit={submitTask}>
        <table>
          <tbody>
            <tr>
              <td>Title:</td>
              <td>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Description:</td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Status:</td>
              <td>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="to-do">To-do</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>Priority:</td>
              <td>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>Due date:</td>
              <td>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
