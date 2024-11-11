import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();

    const body = { nome, email, senha, endereco: { cep, logradouro, bairro, cidade, estado } };

    try {
      const response = await axios.post("/api/registro", body);
      if (response.data.success) {
        navigate("/login"); // Redireciona para login após registro
      } else {
        setErro("Erro ao registrar, tente novamente.");
      }
    } catch (error) {
      setErro("Erro ao registrar");
      console.error(error);
    }
  };

  const buscarEndereco = async (e) => {
    const cepValue = e.target.value;
    setCep(cepValue);

    if (cepValue.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
        if (response.data.erro) {
          setErro("CEP não encontrado.");
        } else {
          setLogradouro(response.data.logradouro);
          setBairro(response.data.bairro);
          setCidade(response.data.localidade);
          setEstado(response.data.uf);
        }
      } catch (error) {
        setErro("Erro ao buscar endereço.");
        console.error(error);
      }
    }
  };

  return (
    <div className="registro">
      <h2>Cadastro</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <form onSubmit={handleRegistro}>
        {/* Campos de Login e Senha */}
        <input
          type="email"
          placeholder="Login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        
        {/* Campo Nome */}
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        
        {/* Campos de Endereço */}
        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={buscarEndereco} // Função de buscar endereço
        />
        <input
          type="text"
          placeholder="Logradouro"
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />

        {/* Botão de registro */}
        <button type="submit">Registrar</button>
      </form>
      <p>
        Já tem uma conta? <a href="/login">Faça Login</a>
      </p>
    </div>
  );
}
