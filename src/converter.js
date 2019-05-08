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

function consumptionDataInitializer(coffees){
    let result = [];
    for (let index in coffees){
        let c = coffees[index];
        result.push(new Coffee(c.name, 0));
    }
    return result;
}

function consumptionDataFactory(coffees, data){

}

module.exports = {
    userFactory: userFactory,
    consumptionDataFactory: consumptionDataFactory,
    consumptionDataInitializer: consumptionDataInitializer
};