const express = require('express');
const routes = express.Router();
const {signup, login,getMeal } = require('../controller/usersController');
const authenticate = require('../middleware/authMiddleware');


routes.post('/signup', signup);
routes.post('/login', login);
routes.post('/meal',authenticate,  getMeal );


module.exports = routes;