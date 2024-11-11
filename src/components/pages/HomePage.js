import React from "react";
import { Link } from "react-router-dom"; // Importando Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Importando ícone de pesquisa
import Header from "../Header";
import ListaProduto from "../Listaproduto";
import Sessaoexclusiva from "../Sessaoexclusiva";
import Listacomentario from "../Listacomentario";

export default function HomePage({ produto, erro, pagina, handleProximaPagina, handlePaginaAnterior, limite }) {
    return (
      <>          
          <Header />
          <div className="page-inner-content">
            <div className="selecao-titulo">
              <h3>{limite === "4" ? "Produtos" : "Lista de Produtos"}</h3>
              <div className="underline"></div>
              <div className="main-content">
                {erro ? <p>Erro: {erro}</p> : <ListaProduto produto={produto} />}
                
                {limite === "4" ? (
                  <Link to="/Produto"> {/* Usando Link para redirecionar para /Produto */}
                    <button className="btnvermais">
                      <FontAwesomeIcon icon={faSearch} style={{ marginRight: "8px" }} /> {/* Ícone à esquerda do texto */}
                      Ver Mais
                    </button>
                  </Link>
                ) : (
                  <div className="pagination clécio"> {/* Adicionei a classe clécio aqui */}
                    <button onClick={handlePaginaAnterior} disabled={pagina === 1} className="pagination-button">
                      Página Anterior
                    </button>
                    <span>Página {pagina}</span>
                    <button onClick={handleProximaPagina} className="pagination-button">
                      Próxima Página
                    </button>
                  </div>
                )}
                <Sessaoexclusiva />              
                <Listacomentario /> 
              </div>          
            </div>
          </div>
      </>
    );
}
