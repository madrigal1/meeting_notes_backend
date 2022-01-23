"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Meeting_1 = require("../models/Meeting");
class MeetingRepo {
    static async create(meeting) {
        const createdMeeting = await Meeting_1.MeetingModel.create(meeting);
        return createdMeeting;
    }
    static async fetchAll() {
        return Meeting_1.MeetingModel.find({}).lean().exec();
    }
    static async findById(_id) {
        return Meeting_1.MeetingModel.findById(_id).lean().exec();
    }
    static async findByUser(_id) {
        return Meeting_1.MeetingModel.find({ initiator: _id }).lean().exec();
    }
    static async update(meeting) {
        return Meeting_1.MeetingModel.findOneAndUpdate({ _id: meeting._id }, { $set: { ...meeting } }, { new: true });
    }
    static async delete(meeting_id) {
        return Meeting_1.MeetingModel.findOneAndDelete({ _id: meeting_id });
    }
}
exports.default = MeetingRepo;
//# sourceMappingURL=MeetingRepo.js.map