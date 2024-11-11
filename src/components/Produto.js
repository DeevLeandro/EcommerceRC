import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

export default function Produto({ id, nome, preco, preco2, estoque, marca, image1, image2 }) {
  const { adicionarAoCarrinho } = useCart();
  const navigate = useNavigate(); // Usar o hook useNavigate para redirecionar
  const precoAtacado = preco ? parseFloat(preco.replace(",", ".")) : 0;
  const precoVarejo = preco2 ? parseFloat(preco2.replace(",", ".")) : 0; // Converte preco2

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

  return (
    <div className="Lista">
      <div className="image-container">
        <img
          src={image1}
          alt={nome}
          onMouseEnter={(e) => { e.currentTarget.src = image2; }}
          onMouseLeave={(e) => { e.currentTarget.src = image1; }}
          className="fade-in"
        />
      </div>
      <p className="name">{nome}</p>
      <p className="marca">{marca}</p>
      <p className="estoque">{estoque}</p>
      <p className="price"><span>R$</span>{precoAtacado.toFixed(2)}</p>
      <p className="price2"><span>R$</span>{precoVarejo.toFixed(2)}</p> {/* Corrigido para usar precoVarejo */}

      <div className="btnPrduto">
        <button className="btn-icon add-to-cart-btn" onClick={handleAddToCart}>
          <span>Adicionar ao Carrinho</span>
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
        
        {/* Botão de Comprar Agora com nova lógica */}
        <button className="btn-icon" onClick={handleComprarAgora}>
          <span>Comprar Agora</span>
          <FontAwesomeIcon icon={faMoneyBill} />
        </button>
      </div>
    </div>
  );
}
