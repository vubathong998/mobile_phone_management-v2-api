import express from 'express';
import { PERMISSION } from '~/Infrastructure/constants/permission';
import {
    phonesCreateValidation,
    phonesDeleteValidation,
    phonesGetByPageValidation
    // phonesUpdateValidation
} from '~/Infrastructure/validation/phonesValidation';
import authentication from '~/middleware/authentication';
import authorization from '~/middleware/authorization';
import validation from '~/middleware/validationRequestBody';
import PhonesController from '~/controller/PhoneController';

const routePhones = express.Router();
const phonesControl = new PhonesController();

routePhones.post(
    '/get-by-page',
    authentication,
    authorization(PERMISSION.Phone),
    validation(phonesGetByPageValidation),
    phonesControl.getByPage
);

routePhones.post(
    '/create',
    authentication,
    authorization(PERMISSION.PhoneCreate),
    validation(phonesCreateValidation),
    phonesControl.create
);

routePhones.post(
    '/update',
    authentication,
    authorization(PERMISSION.PhoneUpdate),
    // validation(phonesUpdateValidation),
    phonesControl.update
);

routePhones.post(
    '/delete',
    authentication,
    authorization(PERMISSION.PhoneDelete),
    validation(phonesDeleteValidation),
    phonesControl.getByPage
);

export default routePhones;
