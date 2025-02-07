"use client";

import { useState } from "react";
import { FaTrash, FaCheck } from "react-icons/fa";

export default function App() {
  const [tasks, setTasks] = useState<
    { id: number; text: string; completed: boolean; timestamp: string }[]
  >([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    const timestamp = new Date().toLocaleString();
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false, timestamp },
    ]);
    setNewTask("");
  };

  const toggleTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          My To-do-List
        </h1>
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all font-semibold"
            onClick={addTask}
          >
            Add
          </button>
        </div>
        <ul className="space-y-3 text-left">
          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">
              No tasks yet. Add one above!
            </p>
          )}
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 border rounded-lg shadow-md transition-all ${
                task.completed
                  ? "bg-green-200 line-through text-gray-500"
                  : "bg-gray-50"
              }`}
            >
              <span className="text-lg font-semibold">
                {index + 1}. {task.text}
              </span>
              <div className="text-sm text-gray-600">{task.timestamp}</div>
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
                  onClick={() => toggleTask(task.id)}
                >
                  <FaCheck size={16} />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                  onClick={() => removeTask(task.id)}
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-center text-white text-sm">
        <p>
          &copy; {new Date().getFullYear()} Irene Muthoki. All rights reserved.
        </p>
        <a
          href="/privacy-policy"
          className="underline hover:text-gray-200 transition"
        >
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}
