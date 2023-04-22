const express = require('express');
const loginUser = require('../controllers/users/loginUser');
const registerUser = require('../controllers/users/registerUser');
const updateUser = require('../controllers/users/updateUser')
const validateRequisition = require('../middlewares/validateRequisition');
const verifyLoggedUser = require('../middlewares/verifyLoggedUser');

const clientSchema = require('../schemas/clientSchema');
const registerClient = require('../controllers/client/registerClient');

const userSchema = require('../schemas/userSchema');
const loginSchema = require('../schemas/loginSchema');
const verifyEmailDb = require('../middlewares/verifyEmailDb');
const route = express();

route.post('/user', verifyEmailDb, validateRequisition(userSchema), registerUser);
route.post('/login', validateRequisition(loginSchema), loginUser);

route.use(verifyLoggedUser);

route.put('/user', validateRequisition(userSchema), updateUser)

route.post('/client', validateRequisition(clientSchema), registerClient);

module.exports = route;
