import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card";
import Paginado from "../Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  //--------------------------------------------- en la primera pagin mostrar 6 y en las demas 12 ------------------------------------------
  // const [ currentPage, setCurrentPage ] = useState( 1 )
  // const [ pokemonsPerPage, setpokemonsPerPage] = useState(6)
  //----------------------------------------------------------------------------------------------------------------------------------------
  // const lastPokemon = currentPage * pokemonsPerPage
  // const firstPokemon = lastPokemon - pokemonsPerPage
  // const currentPokemon = allPokemons.slice(firstPokemon,lastPokemon)

  // const paginado = (page) => {
  //   setCurrentPage(page)
  // }

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  return (
    <div>
      <Link to="/pokemon"> Crear Pokemon </Link>
      <h1> Pokemons </h1>
      <button onClick={(e) => handleClick(e)}> volver a cargar pokemon </button>

      <div>
        <select>
          <option value="asc"> Ascendente </option>
          <option value="des"> Descendente </option>
        </select>
        <select>
          <option value="fuego"> fuego </option>
          <option value="agua"> agua </option>
        </select>
        <select>
          <option value="All"> All pokemon </option>
          <option value="dbPk"> Mis pokemons </option>
          <option value="apiPk"> Pokemons </option>
        </select>

        {/* <Paginado
        pokemonsPerPage = {pokemonsPerPage}
        allPokemons = {allPokemons}
        paginado = {paginado}
        /> */}

        {allPokemons?.map((el) => {
          return (
            <fragmetn>
              <Link to={"/home/" + el.id}>
                <Card name={el.name} img={el.gif} type={el.type} />
              </Link>
            </fragmetn>
          );
        })}
      </div>
    </div>
  );
}
