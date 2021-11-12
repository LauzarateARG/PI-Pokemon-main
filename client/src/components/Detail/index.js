import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage";
import img from "../../assets/img";
import styles from "./style.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    console.log(myPokemon[0]);
  }, [dispatch]);

  const myPokemon = useSelector((state) => state.detail);
  if (myPokemon.length > 0) {
    return (
      <div className={styles.contain}>
        <div className={styles.detail}>
        <h3>vida: {myPokemon[0].hp}</h3>
          <h3>ataque: {myPokemon[0].attack}</h3>
          <h3>defensa: {myPokemon[0].defense}</h3>
          <h3>velocidad: {myPokemon[0].speed}</h3>
          <h3>altura: {myPokemon[0].height / 10} M </h3>
          <h3>peso: {myPokemon[0].weight} kg</h3>
          <h3>
            tipos :
            {myPokemon[0].createInDB
              ? myPokemon[0].types.map((el) => "  " + el.name + " ")
              : myPokemon[0].type.map((el) => "  " + el + " ")}
          </h3>
        </div>
        <div className={styles.imgContain}>
          <h1> {myPokemon[0].name}</h1>
          <img className={styles.img} src={myPokemon[0].gif || img.egg} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <LoadingPage />
      </div>
    );
  }
}
