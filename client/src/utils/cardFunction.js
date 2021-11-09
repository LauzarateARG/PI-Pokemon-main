//data es un array de oobjetos
//accFilt es on objeto cons los filtros
export function filtered( data, accFilt ) {

  // console.log("esta funcion tiene ",data)
  // console.log("esta funcion tine acc",accFilt)

  let dataFiltered = data
  if (data) {
    if (accFilt.origin !== null) {
      console.log("entro origen")
      dataFiltered = accFilt.origin === true
        ? (data = data.filter((el) => el.createInDB))
        : (data = data.filter((el) => !el.createInDB));
    }

    console.log("-------paso filtro de origen ---------")

    if ( dataFiltered && accFilt.type) {
      console.log("entro filtro por type", accFilt.type)
      dataFiltered = dataFiltered.filter(el=> el.type.includes(accFilt.type))
    }

    console.log("------paso filtro de tipos ----------")

    if(dataFiltered){
      console.log("entro attak")
      dataFiltered = accFilt.attack === true
        ? dataFiltered.sort(function(a,b){
            if (a.attack > b.attack) return -1;
            if (a.attack < b.attack) return 1;
            return 0;
        })
        : accFilt.attack === false 
        ?dataFiltered.sort(function(a,b){
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
        })
        : dataFiltered.sort(function(a,b){
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
      })
    }

    console.log("---------paso filtros de orden atakk --------")

    if(dataFiltered){
      console.log("entro alfa")
      dataFiltered = accFilt.alf === true
        ? dataFiltered.sort(function(a,b){
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        })
        : accFilt.alf === false ? dataFiltered.sort(function(a,b){
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        }): dataFiltered.sort(function(a,b){
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
      })
    }

    console.log("-----paso filtros de orden name----------")

    return dataFiltered
  }
  return data
}

// : allPokemons.filter(
//   (el) => el.type.includes(action.payload) === true
// );