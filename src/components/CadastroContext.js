import React, { createContext, useState, useContext, useEffect } from "react";

// Criando o contexto
const CadastroContext = createContext();

export const CadastroProvider = ({ children }) => {
  const [temCadastro, setTemCadastro] = useState(() => {
    // Inicializa como `false` sempre que a página for recarregada
    return false;
  });

  useEffect(() => {
    // Removendo informações do localStorage no carregamento inicial
    localStorage.removeItem("temCadastro");
  }, []);

  return (
    <CadastroContext.Provider value={{ temCadastro, setTemCadastro }}>
      {children}
    </CadastroContext.Provider>
  );
};

// Hook para usar o contexto
export const useCadastro = () => useContext(CadastroContext);
