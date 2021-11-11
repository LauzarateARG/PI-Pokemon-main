import axios from "axios";

export function getPokemons() {
  return async function (dispath) {
    var json = await axios("http://localhost:3001/pokemons");
    return dispath({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}
export function getTypes() {
  return async function (dispath) {
    try {
      var json = await axios("http://localhost:3001/tipos");
      return dispath({
        type: "GET_TYPE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function searchPokemon(name) {
  return async function (dispath) {
    try {
      var json = await axios("http://localhost:3001/pokemons?name=" + name);
      return dispath({
        type: "GET_NAME_POKEMON",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function applyFilter(payload) {
  return {
    type: "APPLY_FILTERS",
    payload,
  };
}
export function postPokemon(payload) {
  return async function (dispath) {
    try {
      const data = await axios.post("http://localhost:3001/pokemons", payload);
      return data; 
    } catch (error) {
      console.log(error)
    }
  };
}
export function getDetail(id){
  return async function (dispath){
    try {
      const json = await axios("http://localhost:3001/pokemons/" + id);
      return dispath({
        type:"GET_DETAIL",
        payload:json.data
      }) 
    } catch (error) {
      console.log(error)
    }
  }
}
export function refreshDetail(payload){
  return{
    type:"REFRESH_DETAIL",
    payload
  }
}