"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiError_1 = require("../../../core/ApiError");
const ApiResponse_1 = require("../../../core/ApiResponse");
const UserRepo_1 = __importDefault(require("../../../database/repositories/UserRepo"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const validator_1 = __importDefault(require("../../../helpers/validator"));
const userSchema_1 = __importDefault(require("./userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const authUtils_1 = require("../../../auth/authUtils");
const KeystoreRepo_1 = __importDefault(require("../../../database/repositories/KeystoreRepo"));
const router = express_1.default.Router();
router.post("/register", (0, validator_1.default)(userSchema_1.default.new), (0, asyncHandler_1.default)(async (req, res) => {
    const search = await UserRepo_1.default.findByEmail(req.body.email);
    if (search)
        throw new ApiError_1.BadRequestError(`Email ${req.body.email} Exists`);
    const accessTokenKey = crypto_1.default.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString("hex");
    const salt = bcryptjs_1.default.genSaltSync(10);
    console.log(salt);
    const hashPwd = bcryptjs_1.default.hashSync(req.body.pwd, salt);
    req.body.pwd = hashPwd;
    console.log({ user: req.body });
    const { createdUser, keystore } = await UserRepo_1.default.create(req.body, accessTokenKey, refreshTokenKey);
    if (!createdUser)
        return new ApiError_1.InternalError(`Unable to create user`);
    const tokens = await (0, authUtils_1.createTokens)(createdUser._id, keystore.primaryKey, keystore.secondarKey);
    console.log({ createdUser });
    return new ApiResponse_1.SuccessResponse(`New User Created: ${createdUser._id}`, {
        user: createdUser.toObject(),
        tokens,
    }).send(res);
}));
router.post("/login", (0, validator_1.default)(userSchema_1.default.login), (0, asyncHandler_1.default)(async (req, res) => {
    let user;
    user = await UserRepo_1.default.findByEmail(req.body.email);
    console.log({ user, req: req.body });
    if (!user)
        throw new ApiError_1.BadRequestError(`User with email ${req.body.email} does not exists`);
    const match = await bcryptjs_1.default.compare(req.body.pwd, user.pwd);
    if (!match)
        throw new ApiError_1.AuthFailureError("Invalid password");
    const accessTokenKey = crypto_1.default.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString("hex");
    await KeystoreRepo_1.default.create(user, accessTokenKey, refreshTokenKey);
    const tokens = await (0, authUtils_1.createTokens)(user._id, accessTokenKey, refreshTokenKey);
    await KeystoreRepo_1.default.create(user, accessTokenKey, refreshTokenKey);
    return new ApiResponse_1.SuccessResponse(`Succesful login of ${user.email} with id ${user._id}`, {
        user,
        tokens
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map