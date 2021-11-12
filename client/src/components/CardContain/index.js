import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, Fragment } from "react";
import { getPokemons, refreshDetail } from "../../actions";
import { Link } from "react-router-dom";
import img from "../../assets/img.js"
import { filtered } from "../../utils/cardFunction";
import style from "./style.module.css"

//----------------------Componentes-------------------------------
import Card from "../Card";
import Paginado from "../Paginado";
//----------------------------------------------------------------


export default function CardContain() {
  const dispatch = useDispatch()
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
    console.log("todos los pokemons",pokemonFiltred)
  },[filter]);


  useEffect(() => {
    dispatch(refreshDetail([]))
  },[dispatch]);

  useEffect(() =>{
    dispatch(getPokemons()) 
  },[allPokemons])

  //---------------------------------------------------------------------------------

  return (
    <div className={style.contain}>
    <div className={style.cards}>
      {currentPK?.map((el) => {
        return (
          <Fragment>
            <Link to={"/home/Pokemon/" + el.id}>
              <Card name={el.name} img={ el.gif ? el.gif : img.egg } type={el.createInDB ? el.types: el.type} createInDB={el.createInDB} />
            </Link>
          </Fragment>
        );
      })}
      </div>
      <div className={style.paginado}>
      <Paginado
        pokemonPerPage={pokemonPerPage}
        allPokemons={pokemonFiltred}
        paginado={paginado}
      />
      </div>
    </div>
  );
}
