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
