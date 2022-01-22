"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokens = exports.validateTokenData = exports.getAccessToken = void 0;
const ApiError_1 = require("../core/ApiError");
// import JWT, { GooglePayload, JwtPayload } from '../core/JWT';
const JWT_1 = __importStar(require("../core/JWT"));
const config_1 = require("../config");
const getAccessToken = (authorization) => {
    if (!authorization)
        throw new ApiError_1.AuthFailureError('Invalid Authorization: Key must be present in req header with correct spelling');
    if (!authorization.startsWith('Bearer '))
        throw new ApiError_1.AuthFailureError('Invalid Authorization: Include the Bearer prefix space the accesstoken');
    return authorization.split(' ')[1];
};
exports.getAccessToken = getAccessToken;
const validateTokenData = (payload) => {
    if (!payload ||
        !payload.iss ||
        !payload.sub ||
        !payload.aud ||
        !payload.prm ||
        payload.iss !== config_1.tokenInfo.issuer ||
        payload.aud !== config_1.tokenInfo.audience)
        throw new ApiError_1.AuthFailureError('Invalid Access Token : Token Data');
    return true;
};
exports.validateTokenData = validateTokenData;
// export const validateGoogleTokenData = (payload: GooglePayload): boolean => {
//   if (
//     !payload ||
//     !payload.iss ||
//     !payload.sub ||
//     !payload.aud ||
//     !payload.email ||
//     payload.iss !== "https://securetoken.google.com" ||
//     payload.aud !== "acminternal"
//   )
//     throw new AuthFailureError('Invalid Google Access Token : Token Data');
//   return true;
// };
const createTokens = async (user_id, accessTokenKey, refreshTokenKey) => {
    const accessToken = await JWT_1.default.encode(new JWT_1.JwtPayload(config_1.tokenInfo.issuer, config_1.tokenInfo.audience, user_id, accessTokenKey, config_1.tokenInfo.accessTokenValidityDays));
    if (!accessToken)
        throw new ApiError_1.InternalError();
    const refreshToken = await JWT_1.default.encode(new JWT_1.JwtPayload(config_1.tokenInfo.issuer, config_1.tokenInfo.audience, user_id, refreshTokenKey, config_1.tokenInfo.refreshTokenValidityDays));
    if (!refreshToken)
        throw new ApiError_1.InternalError();
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};
exports.createTokens = createTokens;
//# sourceMappingURL=authUtils.js.map