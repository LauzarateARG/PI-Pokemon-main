import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, Fragment } from "react";
import { getPokemons, getTypes } from "../../actions";
import { Link } from "react-router-dom";

import { filtered } from "../../utils/cardFunction";

//----------------------Componentes-------------------------------
import Card from "../Card";
import Paginado from "../Paginado";
//----------------------------------------------------------------


export default function CardContain() {
  const allPokemons = useSelector((state) => state.pokemons);
  const filter = useSelector((state) => state.filters);
//-------------------------- Paginado -----------------------------------------------
  const [pokemonFiltred,setPokemonFiltred] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(9);
  const indexToLPK = currentPage * pokemonPerPage;
  const indexToFPK = indexToLPK - pokemonPerPage;
  const currentPK = pokemonFiltred.slice(indexToFPK, indexToLPK);
 

  //-------------------------- Funciones --------------------------------------------

  function paginado(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    setPokemonFiltred(filtered(allPokemons,filter))
  },[filter]);

  //---------------------------------------------------------------------------------

  return (
    <div>
      {currentPK?.map((el) => {
        return (
          <Fragment>
            <Link to={"/home/" + el.id}>
              <Card name={el.name} img={el.gif} type={el.type} />
            </Link>
          </Fragment>
        );
      })}

      <Paginado
        pokemonPerPage={pokemonPerPage}
        allPokemons={pokemonFiltred}
        paginado={paginado}
      />
    </div>
  );
}
