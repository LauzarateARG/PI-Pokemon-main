import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons,  } from "../../actions";
import styles from "./style.module.css";

//----------------------Componentes-------------------------------
import CardContain from "../CardContain";
import LoadingPage from "../LoadingPage";
import SearchBar from "../SearchBar";
import Filtros from "../Filtros";
//----------------------------------------------------------------

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);


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
      <div className = {styles.Home}>
        <div className={styles.cardC}>
          <Filtros />
          <SearchBar />
          < CardContain />
          </div>
      </div>
    );
  }
}
