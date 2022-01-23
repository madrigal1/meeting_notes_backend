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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const ApiError_1 = require("../../../core/ApiError");
const ApiResponse_1 = require("../../../core/ApiResponse");
const MeetingRepo_1 = __importDefault(require("../../../database/repositories/MeetingRepo"));
const UserRepo_1 = __importDefault(require("../../../database/repositories/UserRepo"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const validator_1 = __importStar(require("../../../helpers/validator"));
const meetingSchema_1 = __importDefault(require("./meetingSchema"));
const router = express_1.default.Router();
router.use(authentication_1.default);
router.delete("/delete/:id", (0, validator_1.default)(meetingSchema_1.default.id, validator_1.ValidationSource.PARAM), (0, asyncHandler_1.default)(async (req, res) => {
    const meeting = await MeetingRepo_1.default.delete(req.params.id);
    if (!meeting)
        throw new ApiError_1.BadRequestError(`No Meeting with id ${req.params.id}`);
    return new ApiResponse_1.SuccessResponse(`Successfully delete meeting`, {
        meeting
    }).send(res);
}));
router.get("/fetch/:id", (0, validator_1.default)(meetingSchema_1.default.id, validator_1.ValidationSource.PARAM), (0, asyncHandler_1.default)(async (req, res) => {
    const allMeetings = await MeetingRepo_1.default.findByUser(req.params.id);
    if (!allMeetings || allMeetings.length == 0)
        throw new ApiError_1.InternalError(`unable to fetch all meetings`);
    return new ApiResponse_1.SuccessResponse(`Successfully fetched all meetings of user ${req.params.id}`, {
        allMeetings
    }).send(res);
}));
router.get("/fetch/all", (0, asyncHandler_1.default)(async (_, res) => {
    const allMeetings = await MeetingRepo_1.default.fetchAll();
    if (!allMeetings || allMeetings.length == 0)
        throw new ApiError_1.InternalError(`unable to fetch all meetings`);
    return new ApiResponse_1.SuccessResponse(`Successfully fetched all meetings`, {
        allMeetings
    }).send(res);
}));
router.put("/update", (0, validator_1.default)(meetingSchema_1.default.update), (0, asyncHandler_1.default)(async (req, res) => {
    const meeting = await MeetingRepo_1.default.findById(req.body._id);
    if (!meeting)
        throw new ApiError_1.BadRequestError(`No meeting with id ${req.body._id}`);
    if (req.body.title)
        meeting.title = req.body.title;
    if (req.body.desc)
        meeting.desc = req.body.desc;
    if (req.body.start_time)
        meeting.start_time = req.body.start_time;
    if (req.body.end_time)
        meeting.end_time = req.body.end_time;
    await MeetingRepo_1.default.update(meeting);
    return new ApiResponse_1.SuccessResponse(`Successfully updated meeting`, {
        meeting
    }).send(res);
}));
router.post("/new", (0, validator_1.default)(meetingSchema_1.default.new), (0, asyncHandler_1.default)(async (req, res) => {
    const initiator = await UserRepo_1.default.findByEmail(req.body.initiator);
    if (!initiator)
        throw new ApiError_1.BadRequestError(`No user with email ${req.body.initiator}`);
    req.body.initiator = initiator;
    const createdMeeting = await MeetingRepo_1.default.create(req.body);
    if (!createdMeeting)
        throw new ApiError_1.InternalError(`Error: unable to create meeting`);
    return new ApiResponse_1.SuccessResponse(`Successfully created a new meeting`, {
        meeting: createdMeeting
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map