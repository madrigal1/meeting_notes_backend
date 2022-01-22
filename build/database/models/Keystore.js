"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeystoreModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Keystore";
exports.COLLECTION_NAME = "keystores";
const schema = new mongoose_1.Schema({
    client: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    primaryKey: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    secondaryKey: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        select: false,
        required: true,
    },
    updatedAt: {
        type: mongoose_1.Schema.Types.Date,
        select: false,
        required: true,
    },
});
exports.KeystoreModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=Keystore.js.map