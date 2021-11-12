//data es un array de oobjetos
//accFilt es on objeto cons los filtros
export function filtered(data, accFilt) {
  // console.log("esta funcion tiene ",data)
  // console.log("esta funcion tine acc",accFilt)

  let dataFiltered = [...data];

  if (data) {

    if (accFilt.type.length > 0) {
      console.log("data filtrada de type", dataFiltered)
      dataFiltered = dataFiltered.filter((el) => el.type.includes(accFilt.type));
      console.log("data filtrada de type",dataFiltered)
    }

    if(accFilt.search.length > 0){
      dataFiltered = dataFiltered.filter((el) => el.name.toLowerCase() === accFilt.search.toLowerCase());
      console.log("filtro search creado",accFilt.search)
    }


    if(dataFiltered){
      switch (accFilt.origin) {
        case "Db":
          dataFiltered = dataFiltered.filter((el) => el.createInDB===true)
          break;
        case "api":
          dataFiltered = dataFiltered.filter((el) => !el.createInDB)
          break;
        default:
          break;
      }
    }

    if (dataFiltered) {
      switch (accFilt.fill) {
        case "ID":
          dataFiltered = dataFiltered.sort(function (a, b) {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
          });
          break;

        case "AZ":
           dataFiltered.sort(function (a, b) {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          break;
        case "ZA":
           dataFiltered.sort(function (a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          });
          break;
        case "F+":
           dataFiltered.sort(function (a, b) {
            if (a.attack > b.attack) return -1;
            if (a.attack < b.attack) return 1;
            return 0;
          });
          break;
        case "F-":
           dataFiltered.sort(function (a, b) {
            if (a.attack > b.attack) return 1;
            if (a.attack < b.attack) return -1;
            return 0;
          });
          break;
        default:
           dataFiltered.sort(function (a, b) {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
          });
          break;
      }
    }
    return dataFiltered;
  }
  return data;
}
