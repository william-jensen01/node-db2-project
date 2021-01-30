const db = require('../../data/db-config');

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

async function update(id, changes) {
    const count = await db('cars').where({ id }).update(changes);
    const updatedCar = await getById(id);
    return updatedCar;
}

async function remove(id) {
    const count = await db('cars').where({ id }).del();
    return count;
}