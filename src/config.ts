

export const port = process.env.PORT || 3000;

export const environment = process.env.NODE_ENV || "dev";

export const corsUrl = "*";

export const db = {
    devUrl: process.env.DB_DEV_URL || "mongodb://127.0.0.1:27017/meetingnotes",
    prodUrl: process.env.DB_PROD_URL || "",
}

export const tokenInfo = {
    accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_DAYS),
    refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_DAYS),
    issuer: process.env.TOKEN_ISSUER,
    audience: process.env.TOKEN_AUDIENCE,
};

export const jwtSecret = process.env.JWT_SECRET || "secret";