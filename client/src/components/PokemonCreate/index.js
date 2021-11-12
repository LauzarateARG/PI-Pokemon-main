import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postPokemon, getTypes } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";

function validate(input) {
  console.log("Input ---->", input);

  let regex = /https:\/\/[a-zA-Z./-]+/gm;

  let errors = {
    name: false,
    hp: false,
    attack: false,
    defense: false,
    speed: false,
    height: false,
    weight: false,
    img: false,
    type: false,
  };

  errors.name = input.name.length > 0 ? false : " *Debe ingresar nombre ";

  errors.hp =
    input.hp <= 0
      ? " *Debe tener puntos de vida "
      : input.hp > 500
      ? " *Posee demasidados puntos de vida, vida max 500"
      : false;

  errors.attack =
    input.attack <= 0
      ? " *Debe tener puntos de atque "
      : input.attack > 500
      ? " *Posee demasidos puntos de ataque, ataque max 500"
      : false;

  errors.defense =
    input.defense <= 0
      ? " *Debe tener puntos de defensa "
      : input.defense > 500
      ? " *Posee demasidos puntos de defensa, defensa max 500 "
      : false;

  errors.speed =
    input.speed <= 0
      ? " *Debe tener puntos de velocidad "
      : input.speed > 500
      ? " *Posee demasidos puntos de velocidad, velocidad max 500 "
      : false;

  errors.height =
    input.height <= 0
      ? " *Debe tener altura "
      : input.height > 500
      ? " *Pokemon demasiado alto, altura max 500 "
      : false;

  errors.weight =
    input.weight <= 0
      ? " *Debe tener peso "
      : input.weight > 500
      ? " *Pokemon demasiado pesado, peso max 500 "
      : false;

  errors.type =
    input.type.length === 0
      ? " *Debe ingresar un tipo, maximo 2 tipos por pokemon "
      : input.type[0] === input.type[1]
      ? "*No se permite repetir tipos"
      : input.type.length > 2
      ? "*Solo se permite 2 tipos por Pokemon"
      : false;

  errors.img =
    input.img.length === 0
      ? "*puede ingresar la url de su imagen"
      : input.img.match(regex)
      ? false
      : "*Debe ser una url";

  console.log("errors ----> ", errors);
  return errors;
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tipos = useSelector((state) => state.types);

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    type: [],
  });

  const [errors, setErrors] = useState({
    name: false,
    hp: false,
    attack: false,
    defense: false,
    speed: false,
    height: false,
    weight: false,
    type: false,
  });
  //---------------------------------------- Funciones ---------------------------------------------

  function handleChange(e) {
    setInput((prev) => {
      const newState = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      console.log(newState);
      setErrors(validate(newState));
      return newState;
    });
  }

  function handlerSelect(e) {
    setInput((prev) => {
      const newState = {
        ...prev,
        type: [...input.type, e.target.value],
      };
      console.log(newState);
      setErrors(validate(newState));
      return newState;
    });
  }

  function handlerDelet(e) {
    e.preventDefault();
    setInput((prev) => {
      const newState = {
        ...prev,
        type: [],
      };
      console.log(newState);
      setErrors(validate(newState));
      return newState;
    });
  }

  function handlerSubmit(e) {
    e.preventDefault();

    if (
      errors.name ||
      errors.hp ||
      errors.attack ||
      errors.defense ||
      errors.speed ||
      errors.height ||
      errors.weight ||
      errors.type
    ) {
      alert("Error al crear Pokemon, por favor revise los datos ingresados");
    } else {
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
        img: "",
        type: [],
      });
      history.push("/home");
    }
  }
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  //------------------------------------------------------------------------------------------------

  return (
    <div>
      <h1> Crea tu propio Pokemon </h1>

      <form onSubmit={(e) => handlerSubmit(e)}>
        <div className={style.form}>
          <label> Nombre </label>
          <input type="text" name="name" onChange={handleChange} required />

          {errors.name && <p> {errors.name} </p>}

          <label> Vida </label>
          <input type="number" name="hp" onChange={handleChange} required />
          {errors.hp && <p> {errors.hp} </p>}

          <label> Ataque </label>
          <input type="number" name="attack" onChange={handleChange} required />
          {errors.attack && <p> {errors.attack} </p>}

          <label> Defensa </label>
          <input
            type="number"
            name="defense"
            onChange={handleChange}
            required
          />
          {errors.defense && <p> {errors.defense} </p>}

          <label> Velocidad </label>
          <input type="number" name="speed" onChange={handleChange} required />
          {errors.speed && <p> {errors.speed} </p>}

          <label> Peso </label>
          <input type="number" name="weight" onChange={handleChange} required />
          {errors.weight && <p> {errors.weight} </p>}

          <label> Altura </label>
          <input type="number" name="height" onChange={handleChange} required />
          {errors.height && <p> {errors.height} </p>}

          <label> Img </label>
          <input type="url" name="img" onChange={handleChange} />
          {errors.img && <p> {errors.img} </p>}

          <label> tipo </label>
          <div>
            <select name="type" onChange={(e) => handlerSelect(e)}>
              {tipos?.map((el) => {
                return <option value={el.name}> {el.name} </option>;
              })}
            </select>
            <button onClick={handlerDelet}> restablecer tipos </button>

            <h4>{input.type.map((el) => el + " ,")}</h4>
          </div>
          {errors.type && <p> {errors.type} </p>}

          <button type="submit"> Crear </button>
        </div>
      </form>
    </div>
  );
}
