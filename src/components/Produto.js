import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMoneyBill, faStar } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./CartContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Produto({ id, nome, preco, preco2, estoque, marca, image1, image2, categorias }) {
  const { adicionarAoCarrinho } = useCart();
  const navigate = useNavigate();
  const location = useLocation(); // Usar o hook useLocation para capturar o caminho atual da URL
  const precoAtacado = preco ? parseFloat(preco.replace(",", ".")) : 0;
  const precoVarejo = preco2 ? parseFloat(preco2.replace(",", ".")) : 0;
  
  // Estado para armazenar a avaliação do produto
  const [rating, setRating] = useState(0);

  const handleAddToCart = () => {
    // Verifica se há estoque suficiente
    if (estoque <= 0) {
      alert("Produto fora de estoque!");
      return;
    }
    
    adicionarAoCarrinho({
      id,
      nome,
      preco: precoAtacado, // Adiciona o que você deseja no carrinho
      image: image1,
      estoque: estoque, // Passa a quantidade disponível
    });
  };

  const handleComprarAgora = () => {
    handleAddToCart(); // Adiciona o produto ao carrinho
    navigate("/pagamento"); // Redireciona para a página de pagamento
  };

  const handleViewDetails = () => {
    navigate(`/detalhe-produto/${id}`); // Redireciona para a página de detalhes do produto
  };

  const handleRating = (index) => {
    setRating(index + 1); // Define a avaliação com base no índice da estrela clicada
  };

  // Verificar se a URL atual é a página de lista de produtos
  const isListaProdutos = location.pathname === "/produtos"; // Verifique se estamos na página de produtos

  return (
    <div className="Lista">
      {/* Remover MenuCategorias aqui */}

      <div className="image-container">
        <img
          src={image1}
          alt={nome}
          onMouseEnter={(e) => { e.currentTarget.src = image2; }}
          onMouseLeave={(e) => { e.currentTarget.src = image1; }}
          className="fade-in"
          onClick={handleViewDetails} // Redireciona para os detalhes ao clicar
        />
      </div>
      <p className="name">{nome}</p>
      <p className="id">{id}</p>
      <p className="marca">{marca}</p>
      
      {/* Exibição das estrelas de avaliação */}
      <div className="rate">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={`star ${rating > index ? "filled" : ""}`}
            onClick={() => handleRating(index)} // Altera a avaliação ao clicar
          />
        ))}
      </div>

      <p className="estoque">{estoque}</p>
      <p className="price"><span>R$</span>{precoAtacado.toFixed(2)}</p>
      <p className="price2"><span>R$</span>{precoVarejo.toFixed(2)}</p> {/* Corrigido para usar precoVarejo */}

      <div className="btnPrduto">
        <button className="btn-icon add-to-cart-btn" onClick={handleAddToCart}>
          <span>Adicionar ao Carrinho</span>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
        
        {/* Botão de Comprar Agora */}
        <button className="btn-icon" onClick={handleComprarAgora}>
          <span>Comprar Agora</span>
          <FontAwesomeIcon icon={faMoneyBill} />
        </button>
      </div>
    </div>
  );
}
