import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (profile) formData.append("profile", profile);

    const res = await fetch("http://localhost:4000/api/user/signup", { method: "POST", body: formData });
    const data = await res.json();
    if (res.ok) {
      setMsg("Signup successful!");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMsg(data.message || "Signup failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        <button type="submit">Signup</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
      <p className="link" onClick={() => navigate("/login")}>Already have an account? Login</p>
    </div>
  );
}
