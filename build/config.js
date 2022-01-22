"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = exports.tokenInfo = exports.db = exports.corsUrl = exports.environment = exports.port = void 0;
exports.port = process.env.PORT || 3000;
exports.environment = process.env.NODE_ENV || "dev";
exports.corsUrl = "*";
exports.db = {
    devUrl: process.env.DB_DEV_URL || "mongodb://127.0.0.1:27017/meetingnotes",
    prodUrl: process.env.DB_PROD_URL || "",
};
exports.tokenInfo = {
    accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS),
    refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS),
    issuer: process.env.TOKEN_ISSUER,
    audience: process.env.TOKEN_AUDIENCE,
};
exports.jwtSecret = process.env.JWT_SECRET || "secret";
//# sourceMappingURL=config.js.map