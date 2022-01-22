import express from 'express'
import { AuthFailureError, BadRequestError, InternalError } from '../../../core/ApiError';
import { SuccessResponse } from '../../../core/ApiResponse';
import UserRepo from '../../../database/repositories/UserRepo';
import asyncHandler from '../../../helpers/asyncHandler';
import validator from '../../../helpers/validator';
import userSchema from './userSchema';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
import { createTokens } from '../../../auth/authUtils';
import KeystoreRepo from '../../../database/repositories/KeystoreRepo';

const router = express.Router();

router.post(
    "/register",
    validator(userSchema.new),
    asyncHandler(async (req, res) => {
        const search = await UserRepo.findByEmail(req.body.email);
        if (search) throw new BadRequestError(`Email ${req.body.email} Exists`);

        const accessTokenKey = crypto.randomBytes(64).toString("hex");
        const refreshTokenKey = crypto.randomBytes(64).toString("hex");

        const salt = bcrypt.genSaltSync(10);
        console.log(salt);
        const hashPwd = bcrypt.hashSync(req.body.pwd, salt);
        req.body.pwd = hashPwd;
        console.log({ user: req.body });

        const { createdUser, keystore } = await UserRepo.create(req.body, accessTokenKey, refreshTokenKey);
        if (!createdUser) return new InternalError(`Unable to create user`);

        const tokens = await createTokens(
            createdUser._id,
            keystore.primaryKey,
            keystore.secondarKey
        );

        console.log({ createdUser });
        return new SuccessResponse(`New User Created: ${createdUser._id}`, {
            user: createdUser.toObject(),
            tokens,
        }).send(res);
    })
)

router.post(
    "/login",
    validator(userSchema.login),
    asyncHandler(async (req, res) => {
        let user;
        
        user = await UserRepo.findByEmail(req.body.email);
        console.log({user,req:req.body})
        if (!user) throw new BadRequestError(`User with email ${req.body.email} does not exists`);
        
        const match = await bcrypt.compare(req.body.pwd, user.pwd);
        if (!match) throw new AuthFailureError("Invalid password");

        const accessTokenKey = crypto.randomBytes(64).toString("hex");
        const refreshTokenKey = crypto.randomBytes(64).toString("hex");

        await KeystoreRepo.create(user, accessTokenKey, refreshTokenKey);
        const tokens = await createTokens(user._id, accessTokenKey, refreshTokenKey);

        await KeystoreRepo.create(
            user,
            accessTokenKey,
            refreshTokenKey,
        );

        return new SuccessResponse(`Succesful login of ${user.email} with id ${user._id}`, {
            user,
            tokens
        }).send(res);
    })
)

export default router;
