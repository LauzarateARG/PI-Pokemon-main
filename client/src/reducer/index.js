const initialState = {
  pokemons: [],
  types: [],
  detail: [],
  filters: {
    fill: null,
    origin: null,
    type: "",
    search:""
  },
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
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
      
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
      case "REFRESH_DETAIL":
        return {
          ...state,
          detail: action.payload
        }
    default:
      return state;
  }
}
export default rootReducer;
