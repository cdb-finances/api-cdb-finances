const express = require('express');
const registerUser = require('../controllers/users/registerUser');
const validateRequisition = require('../middlewares/validateRequisition');
const userSchema = require('../schemas/userSchema');
const updateUser = require('../controllers/users/updateUser');
const route = express();


route.post('/user', validateRequisition(userSchema), registerUser);
route.put('/user', validateRequisition(userSchema), updateUser)

module.exports = route;


