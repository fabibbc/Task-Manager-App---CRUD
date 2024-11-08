// src/components/TaskList.js
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import TaskDelete from "./TaskDelete";  // Importar el componente TaskDelete

const TaskList = (user) => {
  const [tasks, setTasks] = useState([]);  // Estado para las tareas

  useEffect(() => {
    if (!user) return; // Ensure userId is available before querying

    console.log(user.userId);

    // Use a query to filter tasks by userId within the "tasks" collection
    const tasksRef = collection(db, user.userId);
    console.log(tasksRef);
    // const q = query(tasksRef, where("userId", "==", user.userId));
    // console.log(q);

    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      console.log(snapshot);
      const userTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(userTasks);
      setTasks(userTasks); // Update tasks state with user's tasks
    });

    return () => unsubscribe(); // Clean up listener
  }, [user, setTasks]);



  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <TaskDelete key={task.id} task={task} setTasks={setTasks} userId={user} />  // Pasar setTasks al TaskDelete
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

