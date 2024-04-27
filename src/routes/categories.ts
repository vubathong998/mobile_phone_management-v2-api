import express from 'express';
import { PERMISSION } from '~/Infrastructure/constants/permission';
import {
    categoriesCreateValidation,
    categoriesDeleteValidation,
    categoriesGetByPageValidation
} from '~/Infrastructure/validation/categoriesValidation';
import CategoriesController from '~/controller/CategoriesController';
import authentication from '~/middleware/authentication';
import authorization from '~/middleware/authorization';
import validation from '~/middleware/validationRequestBody';

const routeCategories = express.Router();
const categoriesController = new CategoriesController();

routeCategories.post(
    '/get-by-page',
    authentication,
    authorization(PERMISSION.Category),
    validation(categoriesGetByPageValidation),
    categoriesController.getByPage
);
routeCategories.post(
    '/create',
    authentication,
    authorization(PERMISSION.CategoryCreate),
    validation(categoriesCreateValidation),
    categoriesController.create
);
routeCategories.delete(
    '/delete/:id',
    authentication,
    authorization(PERMISSION.CategoryDelete),
    validation(categoriesDeleteValidation),
    categoriesController.delete
);
// routeCategories.put('/:id',authentication, categoriesController.update);
export default routeCategories;
