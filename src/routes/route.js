const express = require('express');
const loginUser = require('../controllers/users/loginUser');
const registerUser = require('../controllers/users/registerUser');
const validateRequisition = require('../middlewares/validateRequisition');
const verifyLoggedUser = require('../middlewares/verifyLoggedUser');
const userSchema = require('../schemas/userSchema');
const loginSchema = require('../schemas/loginSchema');
const route = express();


route.post('/user', validateRequisition(userSchema), registerUser);
route.post('/login', validateRequisition(loginSchema), loginUser);

route.use(verifyLoggedUser);

module.exports = route;


