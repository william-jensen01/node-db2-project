const express = require('express');
const Cars = require('./cars-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.get()
        res.json(cars)
    } catch (err) {
        next(err)
    }
});

router.get('/:id', checkId, async (req, res, next) => {
    try {
        res.json(req.car) 
    } catch (err) {
        next(err)
    }
});

router.post('/', checkPayload, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body);
        res.json(newCar);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', checkId, checkPayload, async (req, res, next) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const updatedCar = await Cars.update(id, changes);
        res.json(updatedCar)
    } catch (err) {
        next(err)
    }
});

router.delete('/:id', checkId, async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await Cars.remove(id);
        res.json({ count: data, message: "Car was successfully deleted" })
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    res.status(err.statusCode).json({ message: err.message, stack: err.tack });
});

async function checkId(req, res, next) {
    const { id } = req.params;
    try {
        const car = await Cars.getById(id)
        if (car) {
            req.car = car;
            next()
        } else {
            const err = new Error('invalid id');
            err.statusCode = 404;
            next(err)
        }
    } catch (err) {
        err.statusCode = 500;
        err.message = 'error retrieving car'
        next(err)
    }
}

async function checkPayload(req, res, next) {
    const body = req.body
    if (!body.VIN || !body.Make || !body.Model || !body.Mileage) {
        const err = new Error('body must include "VIN", "Make", "Model", and "Mileage"');
        err.statusCode = 400;
        next(err);
    } else {
        next();
    }
}

module.exports = router;