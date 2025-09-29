const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const usersRoutes = require('./Routes/usersRroutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', usersRoutes);

module.exports = app;