import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, applyFilter } from "../../actions";
import { useState, useEffect } from "react";

export default function Filtros() {
  const dispatch = useDispatch();
  const search = useSelector((state)=> state.filters.search)
  const allTypes = useSelector((state) => state.types);
  const [filter, setFilter] = useState({
    fill: null,
    origin: null,
    type: "",
    search:search
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
      [e.target.name]: e.target.value 
    });
  }

  function handlerReset(e){
    setFilter({
      fill: null,
      origin: null,
      type: "",
      search:"",
    })
    dispatch(applyFilter(filter))
  }

  //-------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getTypes());
    console.log(search)
  }, [dispatch]);

  return (
    <form onSubmit={(e) => handlerSubmit(e)}>
      <button onClick={e=>handlerReset(e )}> Refresh </button>

      <select name="fill" onChange={(e) => handlerChange(e)}>
        <option value="ID"> All Pokemons </option>
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
        <option value=""> All Pokemons </option>
        {allTypes?.map((el) => {
          return <option value={el.name}> {el.name} </option>;
        })}
      </select>

      <button type="submit"> Aplicar </button>
    </form>
  );
}
