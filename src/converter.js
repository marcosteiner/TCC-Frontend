class User{
    constructor(name, consumptionData){
        this.name = name;
        this.consumptionData = consumptionData;
    }
}

class Coffee{
    constructor(name, consumed){
        this.name = name;
        this.consumed = consumed;
    }
}

function userFactory(){

}

function consumptionDataFactory(){
    return [{"name":"Espresso","consumed":0},{"name":"Milchkaffee","consumed":0},{"name":"Schale","consumed":0}];
}

module.exports = {
    userFactory: userFactory,
    consumptionDataFactory: consumptionDataFactory
};