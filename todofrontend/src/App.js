import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const fetchTasks = async (token) => {
    const response = await fetch(
      "https://todobackend-bi77.onrender.com/tasks",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setTasks(Array.isArray(data) ? data : data.tasks || []);
  };

  useEffect(() => {
    if (token) fetchTasks(token);
  }, [token]);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setTasks([]);
  };

  const addTask = async (text) => {
    const response = await fetch(
      "https://todobackend-bi77.onrender.com/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, status: "pending", priority: "medium" }),
      }
    );
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const deleteTask = async (id) => {
    await fetch(`https://todobackend-bi77.onrender.com/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const updateTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    const response = await fetch(
      `https://todobackend-bi77.onrender.com/tasks/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    const updatedTask = await response.json();
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  const updateTaskPriority = async (id, newPriority) => {
    const response = await fetch(
      `https://todobackend-bi77.onrender.com/tasks/${id}/priority`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ priority: newPriority }),
      }
    );
    const updatedTask = await response.json();
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  const filteredTasks = tasks.filter(
    (task) =>
      (filterStatus === "all" || task.status === filterStatus) &&
      (filterPriority === "all" || task.priority === filterPriority)
  );

  const MainApp = () => (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-lime-200 flex flex-col">
      <nav className="bg-white shadow p-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-green-700">ToDo List</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition-colors duration-200"
        >
          Logout
        </button>
      </nav>

      <main className="flex-1 p-8 max-w-3xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask(e.target[0].value);
            e.target[0].value = "";
          }}
          className="mb-8 flex gap-4"
        >
          <input
            type="text"
            className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Add a new task"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded transition-colors duration-200"
          >
            Add
          </button>
        </form>

        <div className="mb-6 flex gap-4">
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterStatus}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            onChange={(e) => setFilterPriority(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filterPriority}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <ul className="space-y-4">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-white rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex-1">
                <span className="text-lg text-gray-800 font-medium">
                  {task.text}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({task.status}, {task.priority})
                </span>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={() => updateTaskStatus(task._id, task.status)}
                  className={`px-3 py-1 rounded font-medium transition-colors duration-200 ${
                    task.status === "pending"
                      ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {task.status === "pending" ? "Mark Complete" : "Mark Pending"}
                </button>

                <select
                  value={task.priority}
                  onChange={(e) => updateTaskPriority(task._id, e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded font-medium transition-colors duration-200"
                  title="Delete Task"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-white border-t border-gray-200 text-center p-4 text-gray-600">
        © 2025 ToDo List
      </footer>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={token ? <MainApp /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
