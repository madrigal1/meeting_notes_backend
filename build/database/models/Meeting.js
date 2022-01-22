"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "meeting";
exports.COLLECTION_NAME = "meetings";
const meetingSchema = new mongoose_1.Schema({
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    desc: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    start_time: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
    },
    end_time: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
    },
    initiator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
});
exports.MeetingModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, meetingSchema, exports.COLLECTION_NAME);
//# sourceMappingURL=Meeting.js.map