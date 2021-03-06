const express = require('express');
const Router = express.Router;
const stateRoutes = Router();

const {
    orgsByState
} = require('../controllers/state');

stateRoutes.get('/:state', orgsByState);
// stateRoutes.post('/:state', orgDogs)

module.exports = stateRoutes; 