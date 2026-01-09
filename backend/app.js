const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const usersRoutes = require('./Routes/usersRroutes');
const mealRoutes = require('./Routes/mealRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use('/api/auth', usersRoutes);
app.use('/api/', mealRoutes);

module.exports = app;