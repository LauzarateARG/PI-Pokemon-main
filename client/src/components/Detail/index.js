import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage"

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);
  if (myPokemon.length > 0) {
    return (
      <div>
        <h1> {myPokemon[0].name}</h1>
        <img src={myPokemon[0].img} />
        <h2>vida: {myPokemon[0].hp}</h2>
        <h2>ataque: {myPokemon[0].attack}</h2>
        <h2>defensa: {myPokemon[0].defense}</h2>
        <h2>velocidad: {myPokemon[0].speed}</h2>
        <h2>altura: {(myPokemon[0].height/10)+" m"}</h2>
        <h2>peso: {myPokemon[0].weight}</h2>
        <h2>
          {" "}
          tipos :{" "}
          {!myPokemon[0].createdInDb
            ? myPokemon[0].type + " "
            : myPokemon[0].type.map((el) => el.name + " ")}
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
