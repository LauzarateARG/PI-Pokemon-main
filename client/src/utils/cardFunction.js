//data es un array de oobjetos
//accFilt es on objeto cons los filtros
export function filtered(data, accFilt) {
  // console.log("esta funcion tiene ",data)
  // console.log("esta funcion tine acc",accFilt)

  let dataFiltered = data;
  if (data) {

    if (accFilt.type) {
      dataFiltered = data.filter((el) => el.type.includes(accFilt.type));
    }


    if(dataFiltered){
      switch (accFilt.origin) {
        case "Db":
          dataFiltered = data.filter((el) => el.createInDB)
          break;
        case "api":
          dataFiltered = data.filter((el) => !el.createInDB)
          break;
        case "id":
          dataFiltered = data
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
          dataFiltered = dataFiltered.sort(function (a, b) {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
          break;
        case "ZA":
          dataFiltered = dataFiltered.sort(function (a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          });
          break;
        case "F+":
          dataFiltered = dataFiltered.sort(function (a, b) {
            if (a.attack > b.attack) return -1;
            if (a.attack < b.attack) return 1;
            return 0;
          });
          break;
        case "F-":
          dataFiltered = dataFiltered.sort(function (a, b) {
            if (a.attack > b.attack) return 1;
            if (a.attack < b.attack) return -1;
            return 0;
          });
          break;
        default:
          dataFiltered = dataFiltered.sort(function (a, b) {
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
