const express = require('express');
const loginUser = require('../controllers/users/loginUser');
const registerUser = require('../controllers/users/registerUser');
const updateUser = require('../controllers/users/updateUser')
const validateRequisition = require('../middlewares/validateRequisition');
const verifyLoggedUser = require('../middlewares/verifyLoggedUser');
const clientSchema = require('../schemas/clientSchema');
const listClients = require('../controllers/client/listClients');
const registerClient = require('../controllers/client/registerClient');
const detailClient = require('../controllers/client/detailClient');
const updateClient = require('../controllers/client/updateClient');
const registerCharge = require('../controllers/charges/registerCharge');
const listCharges = require('../controllers/charges/listCharges');
const listChargesByStatus = require('../controllers/charges/listChargesByStatus');

const userSchema = require('../schemas/userSchema');
const loginSchema = require('../schemas/loginSchema');
const verifyEmailDb = require('../middlewares/verifyEmailDb');
const updateClientSchema = require('../schemas/updateClientSchema');
const updateUserSchema = require('../schemas/updateUserSchema');
const registerChargeSchema = require('../schemas/registerChargeSchema');

const getLoggedUser = require('../controllers/users/getUser');
const route = express();

route.get('/', (req, res) => {
  return res.json('ok')
})
route.post('/user', verifyEmailDb, validateRequisition(userSchema), registerUser);
route.post('/user', validateRequisition(userSchema), registerUser);
route.post('/login', validateRequisition(loginSchema), loginUser);

route.use(verifyLoggedUser);

route.get('/user', getLoggedUser);
route.put('/user', validateRequisition(updateUserSchema), updateUser);
route.post('/client', validateRequisition(clientSchema), registerClient);
route.get('/client', listClients);
route.get('/client/:id', detailClient);
route.put('/client/:id', validateRequisition(updateClientSchema), updateClient);
route.post('/charge/:id', validateRequisition(registerChargeSchema), registerCharge);
route.get('/charge', listCharges);
route.get('/charge/status', listChargesByStatus);

module.exports = route;
