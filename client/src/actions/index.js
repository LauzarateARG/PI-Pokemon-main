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
      console.log(error)
    }
  };
}
export function searchPokemon(name){
  return async function(dispath){
    try {
      var json = await axios.get("http://localhost:3001/pokemons?name=" + name)
      return dispath({
        type:"GET_NAME_POKEMON",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }

  }
}
export function filterByType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}
export function filterCreate(payload){
  return{
    type:"FILTER_CREATE",
    payload
  }
}
export function orderByName(payload){
  return{
    type:"ORDER_BY_NAME",
    payload
  }
}
export function orderByPower(payload){
  return{
    type:"ORDER_BY_POWER",
    payload
  }
}
export function applyFilter(payload){
  return{
    type:"APPLY_FILTERS",
    payload
  }
}
