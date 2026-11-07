import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useEmployee } from "../context/EmployeeContext";

export default function Login() {
  const { login } = useAuth();
  const { data } = useEmployee();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = e => {
    e.preventDefault();
    const found = data.employees.find(x =>
      x.username === username.trim().toLowerCase() &&
      x.password === password && x.status === "Active"
    );
    if (!found) return setError("Incorrect username or password, or account is inactive.");
    login(found);
  };

  const demo = (u, p) => { setUsername(u); setPassword(p); setError(""); };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={submit}>
        <h1>Employee Management System</h1>
        <p>Sign in to continue</p>
        <label>Username<input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" /></label>
        <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" /></label>
        {error && <div className="error">{error}</div>}
        <button className="primary login-btn">Login</button>
        <div className="demo-users">
          <button type="button" onClick={() => demo("admin","admin123")}>Admin</button>
          <button type="button" onClick={() => demo("hr","hr123")}>HR</button>
          <button type="button" onClick={() => demo("manager","manager123")}>Manager</button>
          <button type="button" onClick={() => demo("employee","emp123")}>Employee</button>
        </div>
      </form>
    </div>
  );
}
