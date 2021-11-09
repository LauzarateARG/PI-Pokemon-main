import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchPokemon } from "../../actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //-----------------------------------------------Funciones------------------------------------------------------------

  function handlerInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handlerSubmit(e) {
    e.preventDefault();
    dispatch(searchPokemon(name));
  }

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handlerInputChange(e)}
      />

      <button typ="submit" onClick={(e) => handlerSubmit(e)}>
          Buscar
      </button>
    </div>
  );
}
