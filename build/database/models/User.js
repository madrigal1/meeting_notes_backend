"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "user";
exports.COLLECTION_NAME = "users";
const userSchema = new mongoose_1.Schema({
    email: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    pwd: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
});
exports.UserModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, userSchema, exports.COLLECTION_NAME);
//# sourceMappingURL=User.js.map