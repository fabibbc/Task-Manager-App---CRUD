// src/components/TaskList.js
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import TaskDelete from "./TaskDelete";  // Importar el componente TaskDelete

const TaskList = () => {
  const [tasks, setTasks] = useState([]);  // Estado para las tareas

  useEffect(() => {
    // Escuchar cambios en la colección 'tasks' en tiempo real
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const taskData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(taskData);  // Actualizar el estado de tareas con los nuevos datos
      },
      (error) => {
        console.log("Error al obtener tareas en tiempo real: ", error);
      }
    );

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <TaskDelete key={task.id} task={task} setTasks={setTasks} />  // Pasar setTasks al TaskDelete
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

