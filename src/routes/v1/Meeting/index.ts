import express from "express";
import authentication from "../../../auth/authentication";
import { BadRequestError, InternalError } from "../../../core/ApiError";
import { SuccessResponse } from "../../../core/ApiResponse";
import MeetingRepo from "../../../database/repositories/MeetingRepo";
import UserRepo from "../../../database/repositories/UserRepo";
import asyncHandler from "../../../helpers/asyncHandler";
import validator, { ValidationSource } from "../../../helpers/validator";
import meetingSchema from "./meetingSchema";



const router = express.Router();

router.use(authentication);


router.delete(
    "/delete/:id",
    validator(meetingSchema.id, ValidationSource.PARAM),
    asyncHandler(async (req, res) => {
        const meeting = await MeetingRepo.delete(req.params.id);
        if (!meeting) throw new BadRequestError(`No Meeting with id ${req.params.id}`)

        return new SuccessResponse(`Successfully delete meeting`, {
            meeting
        }).send(res);

    }),
)

router.get(
    "/fetch/:id", 
    validator(meetingSchema.id, ValidationSource.PARAM),
    asyncHandler(async (req, res) => {
        const allMeetings = await MeetingRepo.findByUser(req.params.id);
        if (!allMeetings || allMeetings.length == 0) throw new InternalError(`unable to fetch all meetings`);


        return new SuccessResponse(`Successfully fetched all meetings of user ${req.params.id}`, {
            allMeetings
        }).send(res);
    }),
)

router.get(
    "/fetch/all",
    asyncHandler(async (_, res) => {
        const allMeetings = await MeetingRepo.fetchAll();
        if (!allMeetings || allMeetings.length == 0) throw new InternalError(`unable to fetch all meetings`);


        return new SuccessResponse(`Successfully fetched all meetings`, {
            allMeetings
        }).send(res);
    }),
)




router.put(
    "/update",
    validator(meetingSchema.update),
    asyncHandler(async (req, res) => {
        const meeting = await MeetingRepo.findById(req.body._id);
        if (!meeting) throw new BadRequestError(`No meeting with id ${req.body._id}`);

        if (req.body.title) meeting.title = req.body.title;
        if (req.body.desc) meeting.desc = req.body.desc;
        if (req.body.start_time) meeting.start_time = req.body.start_time;
        if (req.body.end_time) meeting.end_time = req.body.end_time;

        await MeetingRepo.update(meeting);

        return new SuccessResponse(`Successfully updated meeting`, {
            meeting
        }).send(res);
    }),
)


router.post(
    "/new",
    validator(meetingSchema.new),
    asyncHandler(async (req, res) => {
        const initiator = await UserRepo.findByEmail(req.body.initiator);
        if (!initiator) throw new BadRequestError(`No user with email ${req.body.initiator}`);

        req.body.initiator = initiator;

        const createdMeeting = await MeetingRepo.create(req.body);
        if (!createdMeeting) throw new InternalError(`Error: unable to create meeting`);

        return new SuccessResponse(`Successfully created a new meeting`, {
            meeting: createdMeeting
        }).send(res);
    }),
)

export default router;
