import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faSearch, faShoppingCart, faCreditCard, faEnvelope, faUser, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";  // Aqui estamos importando 'Link' para navegação
import { usePesquisa } from "./PesquisaContext";
import Listacarinho from "./Listacarinho";
import { useCart } from "./CartContext";

export default function Navbar() {
   const [showCart, setShowCart] = useState(false); 
   const [showMenu, setShowMenu] = useState(false);
   const { searchTerm, setSearchTerm } = usePesquisa();
   const { produtos } = useCart();
   const navigate = useNavigate();

   const handleSearch = () => {
      if (searchTerm) {
         navigate("/Produto");
      } else {
         alert("Digite algo para buscar.");
      }
   };

   const quantidadeTotal = produtos.reduce((acc, produto) => acc + produto.quantidade, 0);

   const handleHomeClick = () => {
      setSearchTerm("");  // Zera o termo de pesquisa quando clicar em "Início"
      navigate("/");  // Navega para a página inicial
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
                        <FontAwesomeIcon icon={faHome} className="fa-icon" /> Inicio
                     </Link>
                  </li>
                  <li>
                     <Link to="/Produto" onClick={handleHomeClick}>
                        <FontAwesomeIcon icon={faBoxOpen} className="fa-icon" /> Produtos
                     </Link>
                  </li>
                  <li>
                     <Link to="/pagamento">
                        <FontAwesomeIcon icon={faCreditCard} className="fa-icon" /> Pagamento
                     </Link>
                  </li>
                  <li>
                     <Link to="/cont">
                        <FontAwesomeIcon icon={faEnvelope} className="fa-icon" /> Contato
                     </Link>
                  </li>
                  <li>
                     <Link to="/login">
                        <FontAwesomeIcon icon={faUser} className="fa-icon" /> Conta
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
                  <FontAwesomeIcon icon={faSearch} onClick={handleSearch} aria-label="Buscar" />
               </div>

               <button 
                  className="Shopping-Cart" 
                  onClick={() => setShowCart(!showCart)}
                  aria-label={showCart ? "Fechar carrinho" : "Abrir carrinho"} >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <div className="produto-Count">
                     {quantidadeTotal > 0 ? quantidadeTotal : null}
                  </div>
               </button>

               {showCart && <Listacarinho />}
               
               <button 
                  className="menu-button"
                  onClick={() => setShowMenu(!showMenu)}
                  aria-label={showMenu ? "Fechar menu" : "Abrir menu"}>
                  <FontAwesomeIcon icon={faBars} />
               </button>
            </div>   
         </div>
      </div>
   );
}
