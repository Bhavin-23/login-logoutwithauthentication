import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://login-logoutwithauthentication.onrender.com/api/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      setMsg("Login successful!");
      setTimeout(() => navigate("/profile"), 1000);
    } else {
      setMsg(data.message || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
        
      </form>
      {msg && <p className="msg">{msg}</p>}
      <p className="link" onClick={() => navigate("/signup")}>Don't have an account? Signup</p>
    </div>
  );
}
