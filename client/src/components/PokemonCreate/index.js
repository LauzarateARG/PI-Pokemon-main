import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";

function validate(input) {
  let errors = {
    name:""
  };
  if (!input.name) {
    errors.name = "debe ingresar un nombre";
    if (
      input.hp > 255 ||
      input.attack > 255 ||
      input.defense > 255 ||
      input.speed > 255
    ) {
      errors.name = "pokemon muy poderoso, sus stats no pueden superar 255";
    }
    else if (input.hp < 0 || input.hp < 0 || input.hp < 0 || input.hp < 0) {
      errors.name = "pokemon muy debil, sus stats no pueden ser menor a 0";
    }
    else if (input.height > 200) {
      errors.name = "el pokemon es demasiado alto, altura maxima 200mm";
    }
    else if (input.height <= 0) {
      errors.name =
        "el pokemon es demasiado bajo, su altura tiene que ser mayor a 0";
    }
    else if (input.weight > 100) {
      errors.name = "el pokemon tiene mucho peso, peso maximo 100kg";
    }
    else if (input.weight <= 0) {
      errors.name =
        "el pokemon tiene poco peso, su peso tiene que ser mayor a 0";
    }
    else if (input.type.length > 2) {
      errors.name = "solo se permiten 2 tipos por pokemon";
    }
    else if (input.type.length === 0) {
      errors.name = "el pokemon debe tener tipo";
    }
  }
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const type = useSelector((state) => state.types);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: [],
  });

  const [errors, setErrors] = useState({});
  //---------------------------------------- Funciones ---------------------------------------------

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({input})
    );
    console.log(input);
  }

  function handlerChange(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
    setErrors(input);
    console.log(input);
  }

  function handlerDelet(e) {
    e.preventDefault();
    setInput({
      ...input,
      type: [],
    });
  }

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input));
    console.log(input);
    alert("pokemon Creado");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      type: [],
    });
    history.push("/home");
  }

  //------------------------------------------------------------------------------------------------

  return (
    <div>
      <h1> crea tu propio Pokemon </h1>

      <form onSubmit={(e) => handlerSubmit(e)}>
        <div className={style.form}>
          <label> Nombre </label>
          <input type="text" name="name" onChange={handleChange} />

          <label> vida </label>
          <input type="number" name="hp" onChange={handleChange} />
          <label> ataque </label>
          <input type="number" name="attack" onChange={handleChange} />
          <label> defensa </label>
          <input type="number" name="defense" onChange={handleChange} />
          <label> velocidad </label>
          <input type="number" name="speed" onChange={handleChange} />
          <label> peso </label>
          <input type="number" name="weight" onChange={handleChange} />
          <label> altura </label>
          <input type="number" name="height" onChange={handleChange} />

          <label> tipo </label>
          <div>
            <select onChange={(e) => handlerChange(e)}>
              {type?.map((el) => {
                return <option value={el.name}> {el.name} </option>;
              })}
            </select>
            <button onClick={handlerDelet}> restablecer tipos </button>
          </div>

          <h4>{input.type.map((el) => el + " ,")}</h4>

          {errors ? (
            <p>{errors.name}</p>
          ) : (
            <button type="submit"> Crear </button>
          )}
        </div>
      </form>
    </div>
  );
}
