import { useState } from "react";
import TaskForm from "../components/TaskForm";
import Tasks from "../components/Tasks";
import { useAuthContext } from "../contexts/AuthContext";

function Home() {
  const { isAuthenticated } = useAuthContext();
  const [editingTask, setEditingTask] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };
  return (
    <div className="home">
      {isAuthenticated ? (
        <>
          <TaskForm
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            triggerRefresh={triggerRefresh}
          />
          <Tasks onEdit={setEditingTask} refresh={refresh} />
        </>
      ) : (
        <h1>Login to view your tasks</h1>
      )}
    </div>
  );
}

export default Home;
