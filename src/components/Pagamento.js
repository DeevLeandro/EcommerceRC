import React, { useState } from "react";
import { useCart } from "./CartContext";
import axios from "axios";

export default function Pagamento() {
  const { produtos, total } = useCart();

  const [cepDestino, setCepDestino] = useState("");
  const [enderecoEntrega, setEnderecoEntrega] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");
  const [valorFrete, setValorFrete] = useState(0);
  const [prazoEntrega, setPrazoEntrega] = useState("");

  const buscarEnderecoPorCep = async (cep) => {
    const cepFormatado = cep.replace(/[^\d]/g, "");
    if (cepFormatado.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`);
        const data = await response.json();
        if (data.erro) {
          alert("CEP não encontrado.");
        } else {
          setEnderecoEntrega(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        }
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
        alert("Erro ao buscar o endereço. Tente novamente.");
      }
    } else {
      alert("Por favor, insira um CEP válido.");
    }
  };

  const calcularFrete = async () => {
    if (!cepDestino || cepDestino.replace(/[^\d]/g, "").length !== 8) {
      alert("Por favor, insira um CEP de destino válido.");
      return;
    }

    try {
      const config = {
        method: "get",
        url: "https://equilibrioapperp.pontalsistemas.com.br/ServerEcommerce/ConsultarFrete",
        headers: {
          "X-Embarcadero-App-Secret": "DE1BA56B-43C5-469D-9BD2-4EB146EB8473",
          "Content-Type": "application/json",
        },
        params: {
          Token: "54918616RFBA4R4990RA38CR7A0787D2FD3E",
          CEPOrigem: "74075030",
          CEPDestino: cepDestino.replace(/[^\d]/g, ""),
          ValorNFe: total.toFixed(2).replace('.', ','),
          QtdeVolume: "1",
          PesoBruto: "0,6",
          Comprimento: "0",
          Altura: "0",
          Largura: "0",
          Diamentro: "0",
        },
      };

      const response = await axios.request(config);
      const data = response.data;

      console.log("Resposta completa da API de frete:", data);

      const menorFrete = data.reduce((prev, curr) => {
        return parseFloat(curr.Valor.replace(",", ".")) < parseFloat(prev.Valor.replace(",", ".")) ? curr : prev;
      });

      setValorFrete(parseFloat(menorFrete.Valor.replace(",", ".")));
      setPrazoEntrega(menorFrete.PrazoEntrega);
    } catch (error) {
      console.error(error);
    }
  };

  const finalizarCompra = () => {
    alert("Compra finalizada com sucesso!");
    // Adicione aqui a lógica para finalizar a compra.
  };

  return (
    <div className="pagamento-container">
      <h2 className="pagamento-title">Resumo do Pedido</h2>
      <div className="produtos-container">
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-item">
            <img src="\images\Produtos.png" alt={produto.nome} className="produto-imagem" />
            <div className="produto-info">
              <h3 className="produto-nome">{produto.nome}</h3>
              <p className="produto-quantidade">Quantidade: {produto.quantidade}</p>
              <p className="produto-preco">Preço: R$ {produto.preco.toFixed(2).replace('.', ',')}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="pagamento-total">Total: R$ {total.toFixed(2).replace('.', ',')}</h3>
      <h3 className="pagamento-total">Frete: R$ {valorFrete.toFixed(2).replace('.', ',')}</h3>
      <h3 className="pagamento-total">Total com Frete: R$ {(total + valorFrete).toFixed(2).replace('.', ',')}</h3>
      <h3 className="pagamento-prazo">Prazo de Entrega: {prazoEntrega} dias</h3>

      <div className="pagamento-endereco-container">
        <h3 className="pagamento-endereco-title">Endereço de Entrega</h3>
        <input
          type="text"
          placeholder="Digite o CEP de Destino"
          value={cepDestino}
          onChange={(e) => setCepDestino(e.target.value)}
          className="pagamento-endereco-input"
        />
        <div className="pagamento-buttons-container">
          <button
            onClick={() => buscarEnderecoPorCep(cepDestino)}
            className="pagamento-buscar-cep-btn"
          >
            Buscar Endereço
          </button>
          <button onClick={calcularFrete} className="pagamento-calcular-frete-btn">
            Calcular Frete
          </button>
        </div>
        <textarea
          value={enderecoEntrega}
          onChange={(e) => setEnderecoEntrega(e.target.value)}
          className="pagamento-endereco-textarea"
          placeholder="Endereço de entrega"
        />
        <input
          type="text"
          placeholder="Ponto de Referência"
          value={pontoReferencia}
          onChange={(e) => setPontoReferencia(e.target.value)}
          className="pagamento-endereco-input"
        />
      </div>

      <button onClick={finalizarCompra} className="pagamento-finalizar-compra-btn">
        Finalizar Compra
      </button>
    </div>
  );
}
