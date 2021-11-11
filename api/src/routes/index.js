const { default: axios } = require("axios");
const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getApiData, getDBData, getTipo, getDBTypes } = require("../routeModels/models.js");

const { Tipo, Pokemon } = require("../db");
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//rutas
const getAllPokemons = async () => {
  const apiInfo = await getApiData();
  const dbInfo = await getDBData();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/pokemons", async (req, res) => {
  const name = req.query.name;

  const pokeInfo = await getAllPokemons();

  if (name) {
    let pokemonName = await pokeInfo.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    pokemonName.length
      ? res.status(200).send(pokemonName)
      : res.status(404).send("pokemon no encontrado");
  } else {
    res.status(200).send(pokeInfo);
  }
});

router.get("/pokemons/:id", async (req, res) => {
  const id = req.params.id;
  const allPokemon = await getAllPokemons();
  if (id) {
    let pokemonId = await allPokemon.filter((el) => el.id == id);
    pokemonId.length
      ? res.status(200).json(pokemonId)
      : res.status(404).send("pokemon no encontrado");
  } else {
    res.status(200).send(allPokemon);
  }
});

router.get("/tipos", async (req, res) => {
  try {
    const pokeTipos = await getTipo();
    pokeTipos.forEach((el) => {
      Tipo.findOrCreate({
        where: { name: el },
      });
    });
    const pokeTiposDB = await Tipo.findAll();
    res.status(200).send(pokeTiposDB);
  } catch (error) {}
});

router.post("/pokemons", async (req, res) => {
  let { name, type, hp, attack, defense, speed, height, weight, createInDB } =
    req.body;

  let createPokemon = await Pokemon.create({
    name,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createInDB,
  });

  let typeDb = await Tipo.findAll({
    where: { name: type },
  });

  createPokemon.addTipo(typeDb);
  res.status(200).send("Pokemon creado con exito");
});


module.exports = router;
