import React from "react";

export default function SobreNos() {
  return (
    <div className="sobre-nos">
      {/* Texto principal */}
      <div className="texto-sobre-nos">
        <h1>Quem Somos</h1>
        <h2>RCHospitalar</h2>
        <p>
          Na <strong>RCHospitalar</strong>, somos uma distribuidora de materiais hospitalares, comprometida em fornecer produtos de alta qualidade para o setor de saúde.
        </p>
        <p>
          Trabalhamos com equipamentos e materiais certificados, garantindo segurança e eficiência para nossos clientes em todo o Brasil.
        </p>

        {/* Lista de Diferenciais */}
        <ul className="diferenciais">
          <li><strong>Materiais de alta qualidade</strong></li>
          <li><strong>Entrega rápida e segura</strong></li>
          <li><strong>Atendimento especializado</strong></li>
          <li><strong>Parcerias confiáveis</strong></li>
        </ul>
        
        {/* Chamada para ação */}
        <p className="chamada-para-acao">
          <strong>Explore nossa linha de materiais hospitalares e faça seu pedido com confiança.</strong>
        </p>
      </div>

      {/* Informações adicionais */}
      <div className="informacoes-adicionais">
        <p>
          📍 <strong>Endereço:</strong> Av rio claro, Montes Claros de Goiás 76255000
        </p>
        <p>
          🏢 <strong>Empresa:</strong> RCHospitalar
        </p>
      </div>

      {/* Botão para WhatsApp */}
      <div className="whatsapp-container">
        <a 
          href="https://api.whatsapp.com/send/?phone=556233701800&text=Olá,+gostaria+de+saber+mais+sobre+os+materiais+hospitalares!&type=phone_number&app_absent=0" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-btn"
        >
          Fale conosco no WhatsApp
        </a>
      </div>
    </div>
  );
}
