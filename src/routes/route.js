const express = require('express');
const registerUser = require('../controllers/users/registerUser');
const route = express();


route.post('/user', registerUser);


module.exports = route;


