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

function filterConsumptionDataByUser(user, consumptionData){
    let checkUser = (data) => {
        return data.person_name === user.name;
    };

    return consumptionData.filter(checkUser);
}

function userFactory(users, consumptionData, coffees){
    let result = [];
    for (let index in users){
        let u = users[index];
        let userConsumptionData = filterConsumptionDataByUser(u, consumptionData);
        let resultData = consumptionDataFactory(coffees, userConsumptionData);
        result.push(new User(u.name, resultData));
    }
    return result;
}

function consumptionDataInitializer(coffees){
    let result = [];
    for (let index in coffees){
        let c = coffees[index];
        result.push(new Coffee(c.name, 0));
    }
    return result;
}

function consumptionDataFactory(coffees, userConsumptionData){
    let result = [];
    let rawConsumptionData = consumptionDataInitializer(coffees);

    for (let index in rawConsumptionData){
        let c = new Coffee(rawConsumptionData[index].name, rawConsumptionData[index].consumed)
        result.push(c);

        for(let indexUserData in userConsumptionData){
            let data = userConsumptionData[indexUserData];
            if(result[index].name === data.coffee_name){
                result[index].consumed = data.coffee_count;
            }
        }
    }
    return result;
}

module.exports = {
    userFactory: userFactory,
    consumptionDataFactory: consumptionDataFactory,
    consumptionDataInitializer: consumptionDataInitializer,
    filterConsumptionDataByUser: filterConsumptionDataByUser
};