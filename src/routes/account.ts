import express from 'express';
import AccountController from '~/controller/AccountController';
const routeAccount = express.Router();
const accountController = new AccountController();

routeAccount.post('/login', accountController.login);
routeAccount.post('/register', accountController.register);

export default routeAccount;
