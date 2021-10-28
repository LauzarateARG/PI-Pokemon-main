const axios = require("axios");
const { Pokemon, Tipo } = require("../db");

module.exports = {
  getApiData: async () => {
    let url = [];
    let pokeData = [];
    let types = [];
    const { data } = await axios(`https://pokeapi.co/api/v2/pokemon`);

    url = data.results.map((el) => {
      return el.url;
    });

    for (let i = 0; i < url.length; i++) {
      const { data } = await axios(url[i]);

      types = data.types.map((el) => {
        return el.type.name;
      });

      let pokemonParse = {
        id: data.id,
        name: data.name,
        img: data.sprites.front_default,
        type: types,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,

        imgShiny: data.sprites.front_shiny,
        //  gif:data.sprites.versions.generation-v.black-white.animated.front_default,
        //  gifSginy:data.sprites.versions.generation-v.black-white.animated.front_shiny
      };
      pokeData.push(pokemonParse);
    }
    return pokeData;
  },
  getDBData: async () => {
    return await Pokemon.findAll({
      include: {
        model: Tipo,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  },
  getTipo: async () => {
    let tipos = [];
    const { data } = await axios("https://pokeapi.co/api/v2/type");
    tipos = data.results.map((el) => el.name);
    return tipos;
  },
};
