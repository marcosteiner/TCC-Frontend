let expect = require("chai").expect;
let assert = require("chai").assert;
let converter = require("../src/converter");

const users = [{"name": "Marco"},{"name": "Nicola"},{"name": "Pascal"}];
const coffees = [{"name": "Espresso"},{"name": "Milchkaffee"},{"name": "Schale"}];
const cData = [{"coffee_name":"Milchkaffee","person_name":"Marco","coffee_count":27},{"coffee_name":"Espresso","person_name":"Marco","coffee_count":2},{"coffee_name":"Milchkaffee","person_name":"Pascal","coffee_count":27}]


describe('Test the consumptionDataFactory', () => {
    it('returns an array of coffee objects 0 times consumed', () => {
        let result = converter.consumptionDataFactory(coffees, []);
        expect(result).to.deep.equal([{"name":"Espresso","consumed":0},{"name":"Milchkaffee","consumed":0},{"name":"Schale","consumed":0}])
    });    
});

