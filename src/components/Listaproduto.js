import React from "react";
import Produto from "./Produto";
import { usePesquisa } from "./PesquisaContext";

export default function ListaProduto({ produto }) {
   const { searchTerm } = usePesquisa();
   const produtos = Array.isArray(produto) ? produto : [];

   const produtosFiltrados = produtos.filter(item =>
      item.Produto.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="lista-produto">
         {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((item, index) => (
               <Produto
                  key={index}
                  id={item.IDProduto}
                  nome={item.Produto}
                  marca={item.Marca}
                  preco={item.Atacado}
                  preco2={item.Varejo}
                  estoque={item.Qtde}
                  image1={item.Fotos?.[0]?.Caminho}
                  image2={item.Fotos?.[1]?.Caminho}
               />
            ))
         ) : (
            <p>Nenhum produto encontrado</p>
         )}
      </div>
   );
}
