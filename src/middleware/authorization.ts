import * as express from 'express';
import jwt from 'jsonwebtoken';
import { STATUS_CODE } from '~/constants/statusCode';
import { baseResponseError } from '~/util/baseResponse';
import { PERMISSION } from '~/constants/permission';
import { getLine } from '~/util/getLine';

export default function authorization(role: PERMISSION) {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const headers = req.headers;
            const bearerToken = headers['authorization'];
            const token = bearerToken?.split(' ')[1];
            const identity = jwt.decode(token || '') as { user: { permission?: string } };
            const permission = identity.user.permission;
            if (!permission) return false;
            const permissionDeserialized = JSON.parse(permission);
            const hasPermission = !!permissionDeserialized.find(
                (item: string) => item === role || item === PERMISSION.Admin
            );
            if (hasPermission) {
                next();
            }
        } catch (error) {
            baseResponseError({
                getLine: getLine(),
                res,
                req,
                code: STATUS_CODE.NoPermission
            });
        }
    };
}
