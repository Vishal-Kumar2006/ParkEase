import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setFormData({ email: "", password: "" });
        throw new Error(data.message || "Something went wrong");
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/profile", { state: data.user });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit} className="logIn-Form">
        <h2 className="heading">Log In to ParkEase</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className="inputs"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="password"
          value={formData.password}
          onChange={handleChange}
          className="inputs"
          required
        />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <h2 id="signUp-Heading">New to ParkEase</h2>
      <li className="signIn">
        <Link to="/sign-up">Create new Account</Link>
      </li>
    </div>
  );
};

export default Login;