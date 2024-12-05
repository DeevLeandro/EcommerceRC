import React, { useState, useEffect } from 'react';

const Mapa = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const endereco = "Av. T-7, 371 - sala 1310 - St. Oeste, Goiânia - GO, 74415-030"; // Endereço da loja

  useEffect(() => {
    const consultarEndereco = async () => {
      try {
        // Realizando a solicitação para a API do Google Maps Geocoding
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=AIzaSyBZ4FPLvNkkYvOvxurCVAB1w5kVoccdJlk`);
        const data = await response.json();

        // Verificando o status da resposta da API
        if (data.status === 'OK') {
          const { lat, lng } = data.results[0].geometry.location;
          setLocation({ lat, lng });
        } else {
          // Exibindo o erro completo retornado pela API
          setError(`Erro ao obter dados de geolocalização. Status: ${data.status}. Mensagem: ${data.error_message}`);
        }
      } catch (err) {
        // Capturando qualquer erro durante a requisição
        setError('Erro ao consultar a API: ' + err.message);
      }
    };

    consultarEndereco();
  }, []);

  return (
    <div className="mapa-container">
      <h3>Visite-nos</h3>
      <div className="mapa">
        {error ? (
          <p>{error}</p>
        ) : location ? (
          <iframe
            title="Localização da Loja"
            width="100%"
            height="400"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBZ4FPLvNkkYvOvxurCVAB1w5kVoccdJlk&q=${location.lat},${location.lng}`}
            allowFullScreen
            loading="lazy"
          ></iframe>
        ) : (
          <p>Carregando mapa...</p>
        )}
      </div>
    </div>
  );
};

export default Mapa;
