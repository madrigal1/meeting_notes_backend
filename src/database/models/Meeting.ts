import { Schema, Document, model } from "mongoose";
import User from "./User";


export const DOCUMENT_NAME = "meeting";
export const COLLECTION_NAME = "meetings";

export default interface Meeting extends Document {
    title: string;
    desc: string;
    start_time: Date;
    end_time: Date;
    initiator: User;
}

const meetingSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    desc: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    start_time: {
        type: Schema.Types.Date,
        required: true,
    },
    end_time: {
        type: Schema.Types.Date,
        required: true,
    },
    initiator: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
})


export const MeetingModel = model<Meeting>(DOCUMENT_NAME, meetingSchema, COLLECTION_NAME);

