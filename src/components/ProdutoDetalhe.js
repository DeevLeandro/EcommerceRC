import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function ProdutoDetalhe() {
  const { id } = useParams(); // Pega o ID do produto da URL
  const { adicionarAoCarrinho } = useCart();
  const navigate = useNavigate();
  const [produtoDetalhado, setProdutoDetalhado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setLoading(true);

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://equilibrioapperp.pontalsistemas.com.br/serverecommerce/PesqProduto",
      headers: {
        "X-Embarcadero-App-Secret": "DE1BA56B-43C5-469D-9BD2-4EB146EB8473",
        "Content-Type": "application/json",
      },
      params: {
        Token: "LOF2YBFRRPK5SO44TWQA",
        Grupo: "231",
        Empresa: "371",
        TipoPesquisa: "G",
        Campo: id, // Busca pelo ID do produto
        Valor: "",
        limite: "1", // Limita a busca a um produto
        Paginacao: "1",
      },
    };

    axios(config)
      .then((response) => {
        // Verifica se o retorno é válido e mapeia corretamente
        const produtoEncontrado = response.data?.produtos?.[0];
        if (produtoEncontrado) {
          setProdutoDetalhado(produtoEncontrado);
          setErro(null);
        } else {
          setErro("Produto não encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar produto:", error);
        setErro("Erro ao carregar produto. Tente novamente mais tarde.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;
  if (!produtoDetalhado) return <p>Produto não encontrado.</p>;

  const {
    Produto: nome,
    Atacado: preco,
    Varejo: preco2,
    Estoque: estoque,
    Marca: marca,
    Descricao,
    Fotos,
  } = produtoDetalhado;
  const image1 = Fotos?.[0]?.Caminho;
  const image2 = Fotos?.[1]?.Caminho;

  const precoAtacado = parseFloat(preco.replace(",", ".")) || 0;
  const precoVarejo = parseFloat(preco2.replace(",", ".")) || 0;

  const handleAddToCart = () => {
    if (estoque <= 0) {
      alert("Produto fora de estoque!");
      return;
    }

    adicionarAoCarrinho({
      id,
      nome,
      preco: precoAtacado,
      image: image1,
      estoque,
    });
  };

  const handleComprarAgora = () => {
    handleAddToCart();
    navigate("/pagamento");
  };

  return (
    <div className="produto-detalhe">
      <div className="produto-imagens">
        <img src={image1} alt={nome} className="produto-imagem-principal" />
        {image2 && (
          <img src={image2} alt={nome} className="produto-imagem-secundaria" />
        )}
      </div>
      <div className="produto-info">
        <h1>{nome}</h1>
        <p className="descricao">{Descricao}</p>
        <p className="marca">Marca: {marca}</p>
        <p className="estoque">Estoque: {estoque}</p>
        <p className="preco">
          <span>R$</span>{precoAtacado.toFixed(2)}
        </p>
        <p className="preco-varejo">
          <span>R$</span>{precoVarejo.toFixed(2)}
        </p>
        <div className="btn-produto">
          <button
            className="btn-icon add-to-cart-btn"
            onClick={handleAddToCart}
          >
            <span>Adicionar ao Carrinho</span>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
          <button className="btn-icon" onClick={handleComprarAgora}>
            <span>Comprar Agora</span>
            <FontAwesomeIcon icon={faMoneyBill} />
          </button>
        </div>
      </div>
    </div>
  );
}
