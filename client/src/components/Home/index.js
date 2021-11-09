import React from "react";
import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../actions";
import { Link } from "react-router-dom";

//----------------------Componentes-------------------------------
import CardContain from "../CardContain";
import LoadingPage from "../LoadingPage";
import SearchBar from "../SearchBar";
import Filtros from "../Filtros";
//----------------------------------------------------------------

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  //--------------------------------------------- funciones ------------------------------------------

  // function handleClick(e) {
  //   e.preventDefault();
  //   dispatch(getPokemons());
  // }

  //----------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getPokemons());
  },[dispatch]);

  if(allPokemons.length === 0){
    return (
      <div>
        <LoadingPage/>
      </div>
    )
  }else{
        return (
      <div>
        <h1> Pokemons </h1>

        <Link to="/pokemon"> Crear Pokemon </Link>
        <div>
          <Filtros />
          <SearchBar />
        </div>
        <div>
          < CardContain />
        </div>
      </div>
    );
  }
}
