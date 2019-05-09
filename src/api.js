let axios = require('axios');
let converter = require('./converter.js');
const backend = "http://localhost:3001";

function getUsers(){
    return [{"name": "Marco"},{"name": "Nicola"},{"name": "Pascal"}];
}

function getCoffees(){
    return [{"name": "Espresso"},{"name": "Machiato"},{"name": "Milchkaffee"}];
}

function getConsumptionData(){
    return [{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2},{"coffee_name":"Milchkaffee","person_name":"Pascal","coffee_count":27}];
}

function getAsyncUsers(callback, converter){

    axios.all([
        axios.get(backend + "/"),
        axios.get(backend + "/users"),
        axios.get(backend + "/coffees"),
      ])
      .then(axios.spread(function (consumptionDataResponse, userResponse, coffeesResponse) {
        //... but this callback will be executed only when both requests are complete.
        let data = converter.getAsyncUsers(consumptionDataResponse.data, userResponse.data, coffeesResponse.data);
        callback(data);
      }));
}

module.exports = {
    getCoffees: getCoffees,
    getUsers: getUsers,
    getConsumptionData: getConsumptionData,
    getAsyncUsers: getAsyncUsers
}