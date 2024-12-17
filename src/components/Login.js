import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useCadastro } from "./CadastroContext";
import { useTipoCliente } from "./PrecoContext";

export default function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setTemCadastro } = useCadastro();
  const { setTipoCliente } = useTipoCliente();

  const limparCPF = (cpf) => cpf.replace(/\D/g, "");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setMensagem("");
    setLoading(true);

    const cpfLimpo = limparCPF(cpf);

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://equilibrioapperp.pontalsistemas.com.br/serverecommerce/ConsultarCadastro",
      headers: {
        "X-Embarcadero-App-Secret": "DE1BA56B-43C5-469D-9BD2-4EB146EB8473",
        "Content-Type": "application/json",
      },
      params: {
        Token: "LOF2YBFRRPK5SO44TWQA",
        Grupo: "231",
        Empresa: "371",
        CNPJCPF: cpfLimpo,
      },
    };

    try {
      const response = await axios.request(config);

      if (response.data && response.data.ID) {
        setMensagem("Você já possui cadastro.");
        setTemCadastro(true);
        setTipoCliente(response.data.TipoCliente);
        localStorage.setItem("userID", response.data.ID);
        navigate("/");
      } else {
        setErro("CPF/CNPJ Não Encontrado.");
      }
      console.log("Resposta da API:", response.data);
    } catch (error) {
      setErro("Erro ao verificar cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const irParaCadastro = () => {
    navigate("/registro");
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2 className="login-title">Verificar Cadastro</h2>
        {erro && <p className="login-error">{erro}</p>}
        {mensagem && <p className="login-message">{mensagem}</p>}
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="text"
            placeholder="CPF ou CNPJ"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
        <button className="go-to-cadastro" onClick={irParaCadastro}>
         <p>Não tem uma conta?</p> Cadastre-se
          </button>
      </div>
    </div>
  );
}
