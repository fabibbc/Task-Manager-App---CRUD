import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./services/firebase";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./styles.css"; // Import the global styles

const App = () => {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(true); // Toggle between Signup and Login

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      {user ? (
        <>
          <TaskForm userId={user.uid} />
          <TaskList userId={user.uid} />
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <div className="container-button">
          <div>
            {showSignup ? <Signup /> : <Login />}
          </div>
          <button className="toggle-auth"
            onClick={() => setShowSignup(!showSignup)}
          >
            {showSignup ? "Already have an account? Log In" : "Need an account? Sign Up"}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
