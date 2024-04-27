import * as express from 'express';
import Joi, { SchemaMap } from 'joi';
import { baseResponseError } from '~/Infrastructure/utilities/baseResponse';
import { getLine } from '~/Infrastructure/utilities/getLine';

export default function validation<T>(schema?: SchemaMap<T>) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const correctCondition = Joi.object<T>(schema);
            await correctCondition.validateAsync(req.body);
            next();
        } catch (catchError) {
            baseResponseError({
                getLine: getLine() + ' (validation)',
                res,
                req,
                catchError,
                message: JSON.stringify(catchError)
            });
        }
    };
}
