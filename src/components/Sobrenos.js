import React from "react";

export default function SobreNos() {
  return (
    <div className="sobre-nos">
      {/* Texto principal */}
      <div className="texto-sobre-nos">
        <h1>Sobre Nós</h1>
        <p>
          <strong>A RC HOSPITALAR</strong>, fundada em <strong>OUTUBRO DE 2019</strong>, atua na distribuição de materiais hospitalares.
        </p>
        <p>
          Com sede própria no município de <strong>Montes Claros</strong>, no estado de Goiás, ocupa uma área de 600 m², em expansão, com colaboradores altamente treinados e qualificados.
        </p>
        <p className="chamada-para-acao">
          <strong>
            Convidamos você a conhecer mais sobre nossa empresa e a fazer parte
            da nossa história. Sua saúde e bem-estar são a nossa prioridade!
          </strong>
        </p>
      </div>

      {/* Informações adicionais */}
      <div className="informacoes-adicionais">
        <p>
          📍 <strong>Endereço:</strong> Av. Rio Claro, Montes Claros de Goiás, 76255-000
        </p>
        <p>
          🏢 <strong>Empresa:</strong> RC Hospitalar Ltda CNPJ: 35.188.925/0001-92
        </p>
        <p>
          📞 <strong>Contato:</strong> (62)3370-1800
        </p>
      </div>
    </div>
  );
}
