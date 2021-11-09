import React from "react";

export default function Paginado({ allPokemons, pokemonPerPage, paginado }) {
  let pageNumber = []

  for (let i = 0; i < Math.ceil(allPokemons.length/pokemonPerPage); i++) {
    pageNumber.push(i + 1);
  }

  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map((number) => (
              <button onClick={()=>paginado(number)}> {number} </button>
          ))}
      </ul>
    </nav>
  );
}
