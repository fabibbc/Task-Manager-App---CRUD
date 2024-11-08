// src/components/GoogleLogin.js
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleLogo from '../img/icons8-google-48.png'


const GoogleLogin = (showSignup) => {
  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Google Sign-In successful!");
    } catch (error) {
      console.error("Error with Google Sign-In:", error.message);
    }
  };

  return (
    <button className="google-login-button" onClick={handleGoogleSignIn}>
      <img src={GoogleLogo} alt="Google" className="google-icon" />
    </button>
  );
};

export default GoogleLogin;
