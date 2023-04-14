const express = require('express');
const registerUser = require('../controllers/users/registerUser');
const validateRequisition = require('../middlewares/validateRequisition');
const userSchema = require('../schemas/userSchema');
const route = express();


route.post('/user', validateRequisition(userSchema), registerUser);


module.exports = route;


