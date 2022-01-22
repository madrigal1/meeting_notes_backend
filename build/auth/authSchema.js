"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    auth: joi_1.default.object()
        .keys({
        authorization: joi_1.default.string().required(),
    })
        .unknown(true),
    discordAuth: joi_1.default.object()
        .keys({
        discord_token: joi_1.default.string().required(),
    })
        .unknown(true),
};
//# sourceMappingURL=authSchema.js.map