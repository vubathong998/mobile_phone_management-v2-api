import * as express from 'express';
import jwt from 'jsonwebtoken';
import { logger } from './loggerConfig';
import { STATUS_CODE } from './constants/statusCode';
import { baseResponseError } from './util/baseResponse';
import { PERMISSION } from './constants/permission';
import { getLine } from './util/getLine';

export const getInfoIdentity = (headers: any, field: string): string => {
    try {
        const bearerToken = headers['authorization'];
        const token = bearerToken?.split(' ')[1];
        const identity = jwt.decode(token || '') as any;
        return identity.user[field];
    } catch (error) {
        return '';
    }
};

export const checkPermission = (headers: any, role: PERMISSION): boolean => {
    try {
        const bearerToken = headers['authorization'];
        const token = bearerToken?.split(' ')[1];
        const identity = jwt.decode(token || '') as { user: { permission?: string } };
        const permission = identity.user.permission;
        if (!permission) return false;
        const permissionDeserialized = JSON.parse(permission);
        const hasPermission = !!permissionDeserialized.find(
            (item: string) => item === role || item === PERMISSION.Admin
        );
        return hasPermission;
    } catch (error) {
        return false;
    }
};

export default function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const bearerToken = req.headers['authorization'];
    if (bearerToken != undefined) {
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
