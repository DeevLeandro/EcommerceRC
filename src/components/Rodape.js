import React from "react";

export default function Rodape() {
  return (
    <footer>
      <div className="pager-inner-content">
        <div className="download-options">
          <p>Está com dúvida? Entre em contato com Suporte</p>
          {/* Link para o WhatsApp */}
        <a
          href="https://api.whatsapp.com/send?phone=62996891421&text=Preciso%20de%20suporte"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/whatsapp.png" alt="WhatsApp" />
        </a>  
          <p>Nos siga no Instagram e fique por dentro das novidades</p>
                   {/* Link para o Instagram */}
        <a
          href="https://www.instagram.com/rchospitalarltda/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/Instagram.png" alt="Instagram" />
        </a>
        </div>

        <div>
          <div className="logo-footer">
          <h1 className="logo">
           +<span>RCHospitalar</span>
            </h1>
            <p>
            Agradecemos pela confiança em nossa distribuidora, a RC Hospitalar Equipamentos para Hospital.
            É uma honra fazer parte da sua jornada, contribuindo para o sucesso de sua empresa e para a saúde e bem-estar dos pacientes que dependem de produtos de qualidade para um atendimento seguro e eficaz.
            Com um compromisso contínuo com a excelência e inovação, estamos sempre prontos para atender às suas necessidades e oferecer o melhor suporte.
            Conte conosco como seu parceiro de confiança para garantir produtos de alta qualidade e um atendimento dedicado.
            Obrigado por fazer parte da nossa trajetória!
            </p>
            </div>
            <hr/>
            <p className="copyright">
             Copyright 2030 - RCHospitalar - Todos Direitos Reservados 
            </p>
        </div>
      </div>
    </footer>
  );
}
