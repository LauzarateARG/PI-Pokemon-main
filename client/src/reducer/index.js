const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  filters: {
    alf: null,
    attack: null,
    origin: null,
    type: "",
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case "GET_TYPE":
      return {
        ...state,
        types: action.payload,
      };

    case "APPLY_FILTERS":
      return {
        ...state,
        filters: action.payload,
      };
    
    case "FILTER_BY_TYPE":
      const allPokemons = state.allPokemons;
      const statusFiltered =
        action.payload === "All"
          ? allPokemons
          : allPokemons.filter(
              (el) => el.type.includes(action.payload) === true
            );
      return {
        ...state,
        pokemons: statusFiltered,
      };

    case "FILTER_CREATE":
      const createdFilter =
        action.payload === "dbPk"
          ? state.allPokemons.filter((el) => el.createInDB)
          : state.allPokemons((el) => !el.createInDB);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
      };

    case "ORDER_BY_NAME":
      let sortName =
        action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : action.payload === "des"
          ? state.pokemons.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.id > b.id) return 1;
              if (a.id < b.id) return -1;
              return 0;
            });
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : sortName,
      };

    case "ORDER_BY_POWER":
      let sortPower =
        action.payload === "des"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) return 1;
              if (a.attack < b.attack) return -1;
              return 0;
            })
          : action.payload === "asc"
          ? state.pokemons.sort(function (a, b) {
              if (a.attack > b.attack) return -1;
              if (a.attack < b.attack) return 1;
              return 0;
            })
          : state.pokemons.sort(function (a, b) {
              if (a.id > b.id) return 1;
              if (a.id < b.id) return -1;
              return 0;
            });
      return {
        ...state,
        pokemons: sortPower,
      };

    case "GET_NAME_POKEMON":
      return {
        ...state,
        pokemons: action.payload,
      };

    default:
      return state;
  }
}
export default rootReducer;
