import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://login-logoutwithauthentication.onrender.com/api/user/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
        else setMsg(data.message || "Failed to fetch profile");
      });
  }, [navigate]);

  if (msg) return <div className="form-container"><p>{msg}</p></div>;

  const istoken = () => {
    localStorage.removeItem("token");
    setToken("")
    navigate("/login");
  }

  return (
    <div className="form-container">
      <h2>My Profile</h2>
      {user && (
        <div>
          {user.profile && <img src={`https://login-logoutwithauthentication.onrender.com/uploads/${user.profile}`} alt="Profile" className="profile-pic" />}
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <button onClick={istoken}>Logout</button>
        </div>
      )}
    </div>
  );
}
