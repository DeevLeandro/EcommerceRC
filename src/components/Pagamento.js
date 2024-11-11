import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function Pagamento() {
  const { produtos, total } = useCart(); // Obtém os produtos e o total do carrinho
  const navigate = useNavigate();

  const [tipoPagamento, setTipoPagamento] = useState(""); // Define o tipo de pagamento (PIX neste caso)
  const [erro, setErro] = useState("");
  const [qrCodeBase64, setQrCodeBase64] = useState(null); // Estado para armazenar o QR Code
  const [cep, setCep] = useState(""); // Estado para o CEP
  const [enderecoEntrega, setEnderecoEntrega] = useState(""); // Estado para o endereço de entrega
  const [numeroEndereco, setNumeroEndereco] = useState(""); // Estado para o número do endereço
  const [pontoReferencia, setPontoReferencia] = useState(""); // Estado para o ponto de referência

  // URL da imagem padrão para produtos
  const imagemPadrao = "https://via.placeholder.com/150?text=Caixa+de+Produto";

  // Função para buscar o endereço via CEP
  const buscarEnderecoPorCep = async (cep) => {
    // Remove os caracteres especiais do CEP
    const cepFormatado = cep.replace(/[^\d]/g, ''); // Remove qualquer coisa que não seja número

    if (cepFormatado.length === 8) { // Verifica se o CEP tem 8 dígitos
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`);
        const data = await response.json();
        if (data.erro) {
          alert("CEP não encontrado.");
        } else {
          // Preenche o campo de endereço com os dados retornados
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

  const handleFinalizarCompra = async () => {
    if (!tipoPagamento) {
      alert("Por favor, selecione um tipo de pagamento.");
      return;
    }
    if (!enderecoEntrega || !numeroEndereco) {
      alert("Por favor, informe o endereço completo de entrega.");
      return;
    }

    // Cria a string com o endereço completo
    const enderecoCompleto = `${enderecoEntrega}, ${numeroEndereco}, ${pontoReferencia}`;

    const body = {
      transaction_amount: total,
      payment_method_id: tipoPagamento, // Seleção do tipo de pagamento, aqui 'pix'
      endereco_entrega: enderecoCompleto, // Endereço de entrega completo
    };

    try {
      // Faz requisição para o backend, que enviará o pagamento para o Mercado Pago
      const response = await fetch("http://192.168.0.105:8080/ServerPrincipal/PagamentoMercadoPago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // Verifica se a resposta é bem-sucedida
      if (!response.ok) {
        const errorData = await response.json(); // Tenta ler a resposta do erro em JSON
        console.error("Erro ao finalizar a compra:", errorData); // Exibe no console para depuração
        throw new Error(errorData.error || "Erro desconhecido ao finalizar a compra.");
      }

      const paymentData = await response.json();
      console.log("Dados do pagamento:", paymentData);

      if (paymentData.qr_code_base64) {
        // Salva o QR Code base64 para exibição
        setQrCodeBase64(paymentData.qr_code_base64);
        alert("Compra finalizada! Escaneie o QR Code exibido para concluir o pagamento.");
      } else {
        alert("Compra finalizada com sucesso!");
      }

      navigate("/"); // Redireciona após a compra
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error);
      alert(`Erro ao finalizar a compra: ${error.message}`);
      setErro("Erro ao finalizar a compra: " + error.message);
    }
  };

  return (
    <div className="pagamento-container">
      <h2 className="pagamento-title">Resumo do Pedido</h2>
      <h3 className="pagamento-total">Total: R$ {total.toFixed(2)}</h3>

      <h4 className="pagamento-itens-title">Itens no Carrinho:</h4>
      <ul className="pagamento-itens-list">
        {produtos.map((produto) => (
          <li key={produto.id} className="pagamento-item">
            <img
              src="/images/Produtos.png"// Se não tiver imagem, usa a imagem padrão
              alt="Produtos"
              className="pagamento-item-img"
            />
            <b>{produto.nome}</b> - Quantidade: {produto.quantidade}
          </li>
        ))}
      </ul>

      <div className="pagamento-endereco-container">
        <h3 className="pagamento-endereco-title">Endereço de Entrega</h3>
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="pagamento-endereco-input"
        />
        <button
          onClick={() => buscarEnderecoPorCep(cep)}
          className="pagamento-buscar-cep-btn"
        >
          Buscar Endereço
        </button>
        <textarea
          value={enderecoEntrega}
          onChange={(e) => setEnderecoEntrega(e.target.value)}
          className="pagamento-endereco-textarea"
          placeholder="Endereço de entrega"
        />
        <input
          type="text"
          placeholder="Número do Endereço"
          value={numeroEndereco}
          onChange={(e) => setNumeroEndereco(e.target.value)}
          className="pagamento-endereco-input"
        />
        <input
          type="text"
          placeholder="Ponto de Referência"
          value={pontoReferencia}
          onChange={(e) => setPontoReferencia(e.target.value)}
          className="pagamento-endereco-input"
        />
      </div>

      <h3 className="pagamento-tipo-pagamento-title">Escolha o Tipo de Pagamento</h3>
      <div className="pagamento-tipo-pagamento">
        <label className="pagamento-radio-label">
          <input
            type="radio"
            value="pix"
            checked={tipoPagamento === "pix"}
            onChange={(e) => setTipoPagamento(e.target.value)}
            className="pagamento-radio-input"
          />
          PIX
        </label>
      </div>

      <button className="pagamento-btn" onClick={handleFinalizarCompra}>
        Finalizar Compra
      </button>

      {erro && <p className="pagamento-erro-message">{erro}</p>}

      {/* Exibe o QR Code se disponível */}
      {qrCodeBase64 && (
        <div className="pagamento-qr-code">
          <h3 className="pagamento-qr-code-title">Escaneie o QR Code para concluir o pagamento:</h3>
          <img src={`data:image/png;base64,${qrCodeBase64}`} alt="QR Code para pagamento PIX" className="pagamento-qr-code-img" />
        </div>
      )}
    </div>
  );
}
