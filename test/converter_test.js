let expect = require("chai").expect;
let assert = require("chai").assert;
let converter = require("../src/converter");

const users = [{"name": "Marco"},{"name": "Nicola"},{"name": "Pascal"}];
const coffees = [{"name": "Espresso"},{"name": "Milchkaffee"},{"name": "Schale"}];
const cData = [{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2},{"coffee_name":"Milchkaffee","person_name":"Pascal","coffee_count":27}];
const userConsumptionData = [{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2}];
const finalizedData = [
                        {
                            "name": "Marco",
                            "consumptionData": [
                                {
                                    "consumed": 2,
                                    "name": "Espresso"
                                },
                                {
                                    "consumed": 27,
                                    "name": "Milchkaffee"
                                },
                                {
                                    "consumed": 0,
                                    "name": "Schale"
                                }
                            ]
                        },
                        {
                            "name": "Nicola",
                            "consumptionData": [
                                {
                                    "consumed": 0,
                                    "name": "Espresso"
                                },
                                {
                                    "consumed": 0,
                                    "name": "Milchkaffee"
                                },
                                {
                                    "consumed": 0,
                                    "name": "Schale"
                                }
                            ]
                        },
                        {
                            "name": "Pascal",
                            "consumptionData": [
                                {
                                    "consumed": 0,
                                    "name": "Espresso"
                                },
                                {
                                    "consumed": 27,
                                    "name": "Milchkaffee"
                                },
                                {
                                    "consumed": 0,
                                    "name": "Schale"
                                }
                            ]
                        }
                    ];


describe('Test the consumptionDataInitializer and consumptionDataFactory', () => {
    it('returns an array of coffee objects 0 times consumed', () => {
        let result = converter.consumptionDataInitializer(coffees);
        expect(result).to.deep.equal([{"name":"Espresso","consumed":0},{"name":"Milchkaffee","consumed":0},{"name":"Schale","consumed":0}])
    });    

    it('returns an array of coffee objects with provided consumption data', () => {
        let result = converter.consumptionDataFactory(coffees, userConsumptionData);
        expect(result).to.deep.equal([{"name":"Espresso","consumed":2},{"name":"Milchkaffee","consumed":27},{"name":"Schale","consumed":0}])
    });  
});

describe('Test the filterConsumptionDataByUser function', () => {
    it('returns an array of consumption data only belonging to one user', () => {
        let result = converter.filterConsumptionDataByUser({"name": "Marco"}, cData);
        expect(result).to.deep.equal(userConsumptionData)
    });     
});

describe('Test the userDataFactory', () => {
    it('returns an array of user objects', () => {
        let result = converter.userFactory(users, cData, coffees);
        expect(result).to.deep.equal(finalizedData);
    });     
});

describe('Test getUsers with API', () => {
    it('return userData', () => {
        let result = converter.getUsers();
        expect(result).to.deep.equal(finalizedData)
    });     
});