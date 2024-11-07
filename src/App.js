// src/App.js
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [setTasks] = useState([]);  // Ignore tasks value, only use setTasks

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      <TaskForm setTasks={setTasks} />  {/* Para agregar tareas */}
      <TaskList setTasks={setTasks} />  {/* Para ver y eliminar tareas */}
    </div>
  );
};

export default App;
