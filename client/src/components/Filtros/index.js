import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, applyFilter,getPokemons } from "../../actions";
import { useState, useEffect } from "react";

export default function Filtros() {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);
  const [filter, setFilter] = useState({
    alf: null,
    attack: null,
    origin: null,
    type: "",
  });
  //-------------------------------------------funciones---------------------------------------------------------

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(applyFilter(filter));
  }

  function handlerChange(e) {
    e.preventDefault();
    setFilter({
      ...filter,
      [e.target.name]:
        e.target.value === "All Pokemons" ? null: e.target.value
    });
  }

  function handlerReset(e){
    setFilter({
      alf: null,
      attack: null,
      origin: null,
      type: "",
    })
    dispatch(applyFilter(filter))
    dispatch(getPokemons())
  }

  //-------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <form onSubmit={(e) => handlerSubmit(e)}>
      <button onClick={e=>handlerReset(e )}> volver a cargar pokemon </button>

      <select name="fill" onChange={(e) => handlerChange(e)}>
        <option value={null}> All Pokemons </option>
        <option value="AZ"> A-Z </option>
        <option value="ZA"> Z-A </option>
        <option value="F+"> fuerza+ </option>
        <option value="F-"> fuerza- </option>
      </select>

      <select name="origin" onChange={(e) => handlerChange(e)}>
        <option value="id"> All Pokemons </option>
        <option value="Db"> Mis pokemons </option>
        <option value="api"> Pokemons </option>
      </select>

      <select name="type" onChange={(e) => handlerChange(e)}>
        <option value={null}> All Pokemons </option>
        {allTypes?.map((el) => {
          return <option value={el.name}> {el.name} </option>;
        })}
      </select>

      <button type="submit"> Aplicar </button>
    </form>
  );
}
