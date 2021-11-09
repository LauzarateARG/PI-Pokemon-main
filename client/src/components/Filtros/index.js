import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, applyFilter } from "../../actions";
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
    console.log(filter);
  }

  function handlerChange(e) {
    e.preventDefault();
    setFilter({
      ...filter,
      [e.target.name]:
        e.target.value === "All Pokemons"
          ? null
          : e.target.value === "true"
          ? true
          : e.target.value === "false"
          ? false
          : e.target.value
    });
  }

  //-------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <form onSubmit={(e) => handlerSubmit(e)}>
      <button> volver a cargar pokemon </button>

      <select name="alf" onChange={(e) => handlerChange(e)}>
        <option value={null}> All Pokemons </option>
        <option value={true}> A-Z </option>
        <option value={false}> Z-A </option>
      </select>

      <select name="attack" onChange={(e) => handlerChange(e)}>
        <option value={null}> All Pokemons </option>
        <option value={true}> Ascendente </option>
        <option value={false}> Descendente </option>
      </select>

      <select name="origin" onChange={(e) => handlerChange(e)}>
        <option value={null}> All Pokemons </option>
        <option value={true}> Mis pokemons </option>
        <option value={false}> Pokemons </option>
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
