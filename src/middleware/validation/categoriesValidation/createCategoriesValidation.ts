import * as express from 'express';
import Joi from 'joi';
import { baseResponseError } from '~/util/baseResponse';
import { getLine } from '~/util/getLine';
import { CategoriesCreateRequest } from '~/models/type/Categories/CategoriesRequest';

export default async function createCategoriesValidation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    try {
        const correctCondition = Joi.object<CategoriesCreateRequest>({
            categoryName: Joi.string().required().min(1).max(20).trim()
        });
        await correctCondition.validateAsync(req.body);
        next();
    } catch (catchError) {
        baseResponseError({
            getLine: getLine(),
            res,
            req,
            catchError,
            message: JSON.stringify(catchError)
        });
    }
}
