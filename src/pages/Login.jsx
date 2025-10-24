import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("tipoUsuario", "admin");
      alert("Bienvenido administrador 🍰");
      navigate("/acceso-admin");
    } else {
      localStorage.setItem("tipoUsuario", "usuario");
      alert("Bienvenido usuario 😊");
      navigate("/");
    }
  };

  return (
    <section className="container">
      <div className="auth-card fade-in">
        <h1 className="auth-title">Iniciar sesión</h1>

        <form onSubmit={handleSubmit} className="stack-16">
          <div>
            <label className="label" htmlFor="email">Correo</label>
            <input
              id="email"
              className="input"
              type="email"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              className="input"
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
}
