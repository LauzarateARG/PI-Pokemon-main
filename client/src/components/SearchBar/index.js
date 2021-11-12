import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter} from "../../actions/index";

export default function SearchBar() {
  const dispatch = useDispatch();
  const state = useSelector((state)=> state.filters);
  const [filter, setFilter] = useState({
    fill: state.fill,
    origin: state.origin,
    type: state.type,
    search:""
  });

  //-----------------------------------------------Funciones------------------------------------------------------------

  function handlerInputChange(e) {
    e.preventDefault();
    setFilter({
      ...filter,
      search:e.target.value
    });
  }

  function handlerSubmit(e) {
    dispatch(applyFilter(filter));
    document.getElementById("search").value = "";
  }
  
  useEffect(()=>{
    setFilter({
      ...filter,
      fill: state.fill,
      origin: state.origin,
      type: state.type,
    });
  },[state])
  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div>
        <input
          type="text"
          placeholder="Buscar..."
          id="search"
          onChange={(e) => handlerInputChange(e)}
        />

        <button type="submit" onClick={(e) => handlerSubmit(e)}>Buscar</button>
    </div>
  );
}
