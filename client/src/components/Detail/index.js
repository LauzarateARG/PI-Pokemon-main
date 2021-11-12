import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage"
import img from "../../assets/img"

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    console.log(myPokemon[0])
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);
  if (myPokemon.length > 0) {
    return (
      <div>
        <h1> {myPokemon[0].name}</h1>
        <img src={myPokemon[0].img||img.egg} />
        <h2>vida: {myPokemon[0].hp}</h2>
        <h2>ataque: {myPokemon[0].attack}</h2>
        <h2>defensa: {myPokemon[0].defense}</h2>
        <h2>velocidad: {myPokemon[0].speed}</h2>
        <h2>altura: {myPokemon[0].height/10} M </h2>
        <h2>peso: {myPokemon[0].weight} kg</h2>
        <h2>
          tipos :
          {myPokemon[0].createInDB
          ?myPokemon[0].types.map( el => "  " + el.name + " ")
          :myPokemon[0].type.map( el => "  " + el + " ")}
        </h2>
      </div>
    );
  } else {
    return (
      <div>
        <LoadingPage/>
      </div>
    );
  }
}
