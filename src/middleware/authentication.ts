import * as express from 'express';
import jwt from 'jsonwebtoken';
import { STATUS_CODE } from '~/Infrastructure/constants/statusCode';
import { baseResponseError } from '~/Infrastructure/utilities/baseResponse';
import { getLine } from '~/Infrastructure/utilities/getLine';

export default function authentication(req: express.Request, res: express.Response, next: express.NextFunction) {
    const bearerToken = req.headers['authorization'];
    if (bearerToken) {
        const token = bearerToken.split(' ')[1];
        try {
            if (process.env.JWT_SECRET) {
                jwt.verify(token, process.env.JWT_SECRET);
                return next();
            } else {
                baseResponseError({
                    getLine: getLine(),
                    res,
                    req,
                    code: STATUS_CODE.InternalServerError
                });
            }
        } catch (catchError) {
            baseResponseError({
                getLine: getLine(),
                res,
                req,
                code: STATUS_CODE.Unauthorized,
                catchError
            });
        }
    } else {
        baseResponseError({
            getLine: getLine(),
            res,
            req,
            code: STATUS_CODE.Unauthorized
        });
    }
}
