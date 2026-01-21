import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await api.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
