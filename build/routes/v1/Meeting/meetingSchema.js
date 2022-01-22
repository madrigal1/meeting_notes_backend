"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    "new": joi_1.default.object().keys({
        "title": joi_1.default.string().required(),
        "desc": joi_1.default.string().required(),
        "start_time": joi_1.default.string().required(),
        "end_time": joi_1.default.string().required(),
        "initiator": joi_1.default.string().required(),
    }),
    "update": joi_1.default.object().keys({
        "_id": joi_1.default.string().required(),
        "title": joi_1.default.string(),
        "desc": joi_1.default.string(),
        "start_time": joi_1.default.string(),
        "end_time": joi_1.default.string(),
        "initiator": joi_1.default.string(),
    }),
    "id": joi_1.default.object().keys({
        "id": joi_1.default.string().required(),
    })
};
//# sourceMappingURL=meetingSchema.js.map