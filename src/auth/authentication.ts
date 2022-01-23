import express from 'express';
import { ProtectedRequest } from '../types/app-request';
import UserRepo from '../database/repositories/UserRepo';
import { AuthFailureError, AccessTokenError, TokenExpiredError } from '../core/ApiError';
import JWT from '../core/JWT';
import KeystoreRepo from '../database/repositories/KeystoreRepo';
import { getAccessToken, validateTokenData } from './authUtils';
import validator, { ValidationSource } from '../helpers/validator';
import asyncHandler from '../helpers/asyncHandler';
import authSchema from './authSchema';
import Logger from '../core/Logger';
import { Types } from 'mongoose';


const router = express.Router();

export default router.use(
    validator(authSchema.auth, ValidationSource.HEADER),
    asyncHandler(async (req: ProtectedRequest, _, next) => {
        if (!req.headers.authorization) throw new AuthFailureError("No Auth Token in Request Header");
        req.accessToken = getAccessToken(req.headers.authorization); // Express headers are auto converted to lowercase
        console.log("test middlwre");
        try {
            const payload = await JWT.validate(req.accessToken);
            validateTokenData(payload);

            const user = await UserRepo.findById(new Types.ObjectId(payload.sub));
            if (!user) throw new AuthFailureError('User not registered: Please Login first and check the autorisation header');
            req.user = user;

            const keystore = await KeystoreRepo.findforKey(req.user, payload.prm);
            if (!keystore) throw new AuthFailureError('No such User Logged in/ Credentials have expired. Please Login again .');
            req.keystore = keystore;
            return next();
        } catch (e) {
            if (e instanceof TokenExpiredError) throw new AccessTokenError("Token Expired: " + e.message);
            throw e;
        }
    }),
);

