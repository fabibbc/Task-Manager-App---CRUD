// src/components/TaskDelete.js
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useState } from "react";
import PropTypes from "prop-types";  // Importa PropTypes

const TaskDelete = ({ task, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);  // Estado para controlar si estamos editando la tarea
  const [newTitle, setNewTitle] = useState(task.title);  // Estado para el nuevo título

  const handleDelete = async () => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await deleteDoc(taskRef); // Eliminar de Firestore
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id)); // Actualizar el estado local
    } catch (error) {
      console.error("Error al eliminar la tarea: ", error);
    }
  };

  const handleEdit = async () => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, { title: newTitle });  // Actualizar el título de la tarea
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, title: newTitle } : t))
      );  // Actualizar el estado local
      setIsEditing(false);  // Cerrar el formulario de edición
    } catch (error) {
      console.error("Error al actualizar la tarea: ", error);
    }
  };


  // Validación de las props
  TaskDelete.propTypes = {
    task: PropTypes.shape({
      id: PropTypes.string.isRequired,   // Validar que 'id' sea una cadena
      title: PropTypes.string.isRequired // Validar que 'title' sea una cadena
    }).isRequired,
    setTasks: PropTypes.func.isRequired  // Validar que 'setTasks' sea una función
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}  // Actualizar el título mientras se edita
          />
          <button onClick={handleEdit}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </>
      )}
    </li>
  );
};

export default TaskDelete;
