const express = require('express');
const routes = express.Router();

const { getMeal } = require('../controller/usersController');
//const authenticate = require('../middleware/authMiddleware');

routes.post('/meal',  getMeal);

module.exports = routes;