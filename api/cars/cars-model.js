const db = require('../../data/db-config');
const { inspect } = require('util')
const lodash = require('lodash');
const transform = lodash.transform;
const isEqual = lodash.isEqual;
const isArray = lodash.isArray;
const isObject = lodash.isObject;

module.exports = {
    get,
    getById,
    create,
    update,
    remove
};

async function get() {
    const cars = await db('cars');
    return cars;
}

async function getById(id) {
    const [car] = await db('cars').where({ id });
    return car;
}

async function create(data) {
    const [newCarId] = await db('cars').insert(data);
    const newCar = await getById(newCarId);
    return newCar;
}

function difference(origObj, newObj) {
    function changes(newObj, origObj) {
      let arrayIndexCounter = 0
      return transform(newObj, function (result, value, key) {
        if (!isEqual(value, origObj[key])) {
          let resultKey = isArray(origObj) ? arrayIndexCounter++ : key
          result[resultKey] = (isObject(value) && isObject(origObj[key])) ? changes(value, origObj[key]) : value
        }
      })
    }
    return changes(newObj, origObj)
}

async function update(id, changes) {
    const oldCar = await getById(id);
    const count = await db('cars').where({ id }).update(changes);
    const updatedCar = await getById(id);
    // return {oldCar, updatedCar};
    // return difference(oldCar, updatedCar);
    const differences = difference(oldCar, updatedCar);
    return {oldCar, updatedCar, differences};
}

async function remove(id) {
    const count = await db('cars').where({ id }).del();
    return count;
}