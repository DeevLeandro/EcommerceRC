import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = { email, senha };

    try {
      const response = await axios.post("/api/login", body);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/"); // Redireciona para a página inicial
      } else {
        setErro("Credenciais inválidas");
      }
    } catch (error) {
      setErro("Erro ao fazer login");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2 className="login-title">Login</h2>
        {erro && <p className="login-error">{erro}</p>}
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="senha-container">
            <input
              className="login-input senha-input"
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <FontAwesomeIcon
              icon={mostrarSenha ? faEyeSlash : faEye}
              className="mostrar-senha-icone"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            />
          </div>
          <button className="login-button" type="submit">Entrar</button>
        </form>
        <p className="login-register">
          Não tem uma conta? <Link to="/registro">Registre-se</Link>
        </p>
      </div>
    </div>
  );
}
