import express from 'express';
import CategoriesController from '~/controller/CategoriesController';
import verifyToken from '~/tokenHandler';
// import verifyToken from '../checkVerifyToken.js';

const routeCategories = express.Router();
const categoriesController = new CategoriesController();

routeCategories.post('/', verifyToken, categoriesController.getByPage);
routeCategories.post('/create', verifyToken, categoriesController.create);
// routeCategories.put('/:id', verifyToken, categoriesController.update);
export default routeCategories;
