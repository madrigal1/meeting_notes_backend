import Meeting, { MeetingModel } from "../models/Meeting";


export default class MeetingRepo {
    public static async create(meeting: Meeting): Promise<Meeting> {
        const createdMeeting = await MeetingModel.create(meeting);
        return createdMeeting;
    }
    public static async fetchAll(): Promise<Array<Meeting>> {
        return MeetingModel.find({}).lean<Meeting[]>().exec();
    }
    public static async findById(_id: string): Promise<Meeting> {
        return MeetingModel.findById(_id).lean<Meeting>().exec();
    }
    public static async update(meeting: Meeting): Promise<Meeting> {
        return MeetingModel.findOneAndUpdate({ _id: meeting._id }, { $set: { ...meeting } }, { new: true });
    }
    public static async delete(meeting_id: string): Promise<any> {
        return MeetingModel.findOneAndDelete({ _id: meeting_id });
    }
}