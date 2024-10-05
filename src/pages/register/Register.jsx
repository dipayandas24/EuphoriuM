import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig"; 
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 
import "./register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: username, 
        createdAt: new Date(),
        photoURL: null, 
      });

      await signOut(auth);
      setSuccessMessage("Registered successfully!"); 
      setTimeout(() => {
      navigate("/login"); 
      }, 2000);
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>EuphoriuM</h1>
          <p>
            Experience Euphorium: Unleash your creativity, connect with others, and 
            discover pure euphoria in every moment. Join now and let the magic unfold.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <input 
              type="username" 
              placeholder="Name" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
            <button type="submit">Register</button>
            {error && <span className="error">{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
