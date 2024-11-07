// src/components/TaskForm.js
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

const TaskForm = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return; // Evitar enviar tareas vacías
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title: taskTitle,
      });
      console.log("Tarea agregada con ID: ", docRef.id);
      setTaskTitle(""); // Limpiar el input después de agregar
    } catch (error) {
      console.error("Error al agregar la tarea: ", error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button type="submit">Agregar tarea</button>
    </form>
  );
};

export default TaskForm;

