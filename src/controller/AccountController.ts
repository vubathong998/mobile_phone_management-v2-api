import * as express from 'express';
import AccountSchema from '~/models/schemas/AccountSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { baseResponseError, baseResponseSuccess } from '~/Infrastructure/utilities/baseResponse';
import { STATUS_CODE } from '~/Infrastructure/constants/statusCode';
import { LoginResponse } from '~/models/type/Account/AccountResponse';
import { getLine } from '~/Infrastructure/utilities/getLine';

class AccountController {
    async login(req: express.Request, res: express.Response) {
        try {
            const user = await AccountSchema.findOne({
                username: req.body.username
            });
            if (user?.password && process.env.JWT_SECRET) {
                const match = await bcrypt.compare(req.body.password, user.password as string);
                if (match) {
                    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
                        expiresIn: '5h'
                    });

                    baseResponseSuccess<LoginResponse>({ req, res, data: { token }, getLine: getLine(), isLog: true });
                } else {
                    baseResponseError({
                        res,
                        req,
                        code: STATUS_CODE.NotFound,
                        getLine: getLine(),
                        message: 'username or password incorrect'
                    });
                }
            } else {
                baseResponseError({
                    res,
                    req,
                    code: STATUS_CODE.InternalServerError,
                    customLog: { EnvJWT_SECRET: process.env.JWT_SECRET },
                    getLine: getLine()
                });
            }
        } catch (error) {
            baseResponseError({
                res,
                req,
                code: STATUS_CODE.NotFound,
                catchError: error,
                getLine: getLine(),
                message: 'username or password incorrect'
            });
        }
    }
    async register(req: express.Request, res: express.Response) {
        try {
            if (process.env.SAIL_ROUND && process.env.JWT_SECRET) {
                const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                if (emailRegex.test(req.body.email)) {
                    const salt = bcrypt.genSaltSync(parseInt(process.env.SAIL_ROUND));
                    const hash = bcrypt.hashSync(req.body.password, salt);
                    const data = {
                        ...req.body,
                        email: req.body.email,
                        password: hash,
                        permission: ''
                    };
                    const user = await AccountSchema.create(data);

                    const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
                        expiresIn: '5h'
                    });

                    baseResponseSuccess<LoginResponse>({
                        res,
                        data: { token },
                        getLine: getLine(),
                        isLog: true
                    });
                } else {
                    baseResponseError({ res, req, code: STATUS_CODE.InternalServerError, getLine: getLine() });
                }
            } else {
                baseResponseError({
                    getLine: getLine(),
                    res,
                    req,
                    code: STATUS_CODE.InternalServerError,
                    customLog: { EnvSAIL_ROUND: process.env.SAIL_ROUND, EnvJWT_SECRET: process.env.JWT_SECRET }
                });
            }
        } catch (error) {
            baseResponseError({
                res,
                req,
                code: STATUS_CODE.InternalServerError,
                catchError: error,
                getLine: getLine()
            });
        }
    }
}

export default AccountController;
