import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Cookies from "js-cookie";
import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);  
      navigate("/");  
    } catch (err) {
      setError("Invalid email or password");  
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>EuphoriuM</h1>
          <p>
            Experience the essence of euphoria at Euphorium - an enchanting social media
            platform that brings your moments to life. Join our thriving community,
            where creativity flourishes and connections thrive.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
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
            <button type="submit">Login</button>
            {error && <span className="error">{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
