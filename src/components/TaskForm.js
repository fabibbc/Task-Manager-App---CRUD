// src/components/TaskForm.js
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

const TaskForm = (userId) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return; // Evitar enviar tareas vacías
    try {
      console.log(userId);
      const docRef = await addDoc(collection(db, userId.userId), {
        title: taskTitle,
      });
      console.log("Tarea agregada con ID: ", docRef.id);
      setTaskTitle(""); // Limpiar el input después de agregar
    } catch (error) {
      console.error("Error al agregar la tarea: ", error);
    }
  };


  return (
    <form className="form-add-task" onSubmit={handleSubmit}>
      <input className="input-task" type="text" placeholder="Escribe algo..." value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
      <button className="form-btn" type="submit">Agregar</button>
    </form>
  );
};

export default TaskForm;
