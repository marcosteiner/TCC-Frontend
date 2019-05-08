 function getUsers(){
    return [{"name": "Marco"},{"name": "Nicola"},{"name": "Pascal"}];
}

 function getCoffees(){
    return [{"name": "Espresso"},{"name": "Milchkaffee"},{"name": "Schale"}];
}

 function getConsumptionData(){
    return [{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2},{"coffee_name":"Milchkaffee","person_name":"Pascal","coffee_count":27}];
}

module.exports = {
    getCoffees: getCoffees,
    getUsers: getUsers,
    getConsumptionData: getConsumptionData
}