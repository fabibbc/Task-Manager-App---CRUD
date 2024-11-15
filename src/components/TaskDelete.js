import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useState } from "react";
import PropTypes from "prop-types";  // Import PropTypes

const TaskDelete = ({ task, setTasks, userId }) => {
  const [isEditing, setIsEditing] = useState(false);  // State to control editing mode
  const [newTitle, setNewTitle] = useState(task.title);  // State for the new task title

  const [isCompleted, setIsCompleted] = useState(false);

  // Function to handle the deletion of the task
  const handleDelete = async () => {
    try {
      const taskRef = doc(db, userId.userId, task.id);
      await deleteDoc(taskRef); // Delete from Firestore
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id)); // Update local state
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  // Function to handle the task title update
  const handleEdit = async () => {
    try {
      const taskRef = doc(db, userId.userId, task.id);
      await updateDoc(taskRef, { title: newTitle });  // Update task title in Firestore
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === task.id ? { ...t, title: newTitle } : t))
      );  // Update local state with new title
      setIsEditing(false);  // Close edit mode
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  // Validate props using PropTypes
  TaskDelete.propTypes = {
    task: PropTypes.shape({
      id: PropTypes.string.isRequired,   // Validate that 'id' is a string
      title: PropTypes.string.isRequired // Validate that 'title' is a string
    }).isRequired,
    setTasks: PropTypes.func.isRequired  // Validate that 'setTasks' is a function
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}  // Update title while editing
          />
          <button className="btn-style" onClick={handleEdit}>Save</button>
          <button className="btn-style" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="tasks">
          <div className="text-tasks">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
            />
            <span style={{textDecoration: isCompleted ? "line-through" : "none", color: isCompleted ? "#D6D6D6" : "#EBEBEB", }}>
              {task.title}
            </span>
          </div>
          <div>
            <button className="btn-style" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn-style" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDelete;

