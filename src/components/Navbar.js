import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faSearch,
  faCreditCard,
  faPhone,
  faBox,
  faUserCircle,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { usePesquisa } from "./PesquisaContext";
import Listacarinho from "./Listacarinho";
import { useCart } from "./CartContext";
import { useCadastro } from "./CadastroContext";
import Loading from "./Loading";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const { searchTerm, setSearchTerm } = usePesquisa();
  const { produtos } = useCart();
  const { temCadastro } = useCadastro(); // Usando o contexto
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm) {
      setIsLoading(true); // Inicia o carregamento
      setTimeout(() => {
        setIsLoading(false); // Simula carregamento
        navigate("/Produto");
      }, 1500); // 1.5 segundos de carregamento
    } else {
      alert("Digite algo para buscar.");
    }
  };

  const quantidadeTotal = produtos.reduce(
    (acc, produto) => acc + produto.quantidade,
    0
  );

  const handleHomeClick = () => {
    setSearchTerm("");
    navigate("/"); // Navega para a página inicial sem recarregar
  };

  return (
    <div className="nav">
      <div className="inner-content">
        <h1 className="logo">
          +<span>RCHospitalar</span>
        </h1>
        <nav className={`${showMenu && "show"}`}>
          <ul>
            <li>
              <Link to="/" onClick={handleHomeClick}>
                <FontAwesomeIcon icon={faHome} className="fa-icon" /> Início
              </Link>
            </li>
            <li>
              <Link to="/Produto" onClick={() => setSearchTerm("")}>
                <FontAwesomeIcon icon={faBox} className="fa-icon" /> Produtos
              </Link>
            </li>
            <li>
              <Link to="/pagamento">
                <FontAwesomeIcon icon={faCreditCard} className="fa-icon" />{" "}
                Pagamento
              </Link>
            </li>
            <li>
              <Link to="/cont">
                <FontAwesomeIcon icon={faPhone} className="fa-icon" /> Contato
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className={`fa-icon ${temCadastro ? "icon-verde" : "icon-cinza"}`}
                />{" "}
                Conta
              </Link>
            </li>
          </ul>
        </nav>

        <div className="navs-icon-conteiner">
          <div className="search-input-container">
            <input
              type="search"
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Pesquisar produtos"
            />
            <FontAwesomeIcon
              icon={faSearch}
              onClick={handleSearch}
              aria-label="Buscar"
            />
          </div>

          <button
            className="Shopping-Cart"
            onClick={() => setShowCart(!showCart)}
            aria-label={showCart ? "Fechar carrinho" : "Abrir carrinho"}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <div className="produto-Count">
              {quantidadeTotal > 0 ? quantidadeTotal : null}
            </div>
          </button>

          {showCart && <Listacarinho />}

          <button
            className="menu-button"
            onClick={() => setShowMenu(!showMenu)}
            aria-label={showMenu ? "Fechar menu" : "Abrir menu"}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* Exibe o carregamento enquanto isLoading for verdadeiro */}
      {isLoading && <Loading />}
    </div>
  );
}
