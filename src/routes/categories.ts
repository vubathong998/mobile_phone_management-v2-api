import express from 'express';
import { PERMISSION } from '~/constants/permission';
import CategoriesController from '~/controller/CategoriesController';
import authentication from '~/middleware/authentication';
import authorization from '~/middleware/authorization';
import createCategoriesValidation from '~/middleware/validation/categoriesValidation/createCategoriesValidation';

const routeCategories = express.Router();
const categoriesController = new CategoriesController();

routeCategories.post('/', authentication, authorization(PERMISSION.Category), categoriesController.getByPage);
routeCategories.post(
    '/create',
    authentication,
    authorization(PERMISSION.CategoryCreate),
    createCategoriesValidation,
    categoriesController.create
);
// routeCategories.put('/:id',authentication, categoriesController.update);
export default routeCategories;
