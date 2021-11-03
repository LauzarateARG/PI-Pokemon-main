import React from "react";

export default function Paginado({ pokemonsPerPage, allPokemons, paginado }) {
  const pageNumber = [];

  for (let i = 0; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
        <ul>
            {
            pageNumber?.map((n) => (
                <li key = {n}>
                    <a onClick = { () => paginado(n) } > {n} </a>
                </li>
            ))
            }
        </ul>
    </nav>
  );
}
