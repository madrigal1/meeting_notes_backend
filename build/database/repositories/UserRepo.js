"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
const KeystoreRepo_1 = __importDefault(require("./KeystoreRepo"));
class UserRepo {
    static async create(user, access_token, refresh_token) {
        const createdUser = await User_1.UserModel.create(user);
        const keystore = await KeystoreRepo_1.default.create(createdUser, access_token, refresh_token);
        return { createdUser, keystore };
    }
    static async findByEmail(email) {
        return User_1.UserModel.findOne({ email }).lean().exec();
    }
    static async findById(id) {
        return User_1.UserModel.findById(id).lean().exec();
    }
}
exports.default = UserRepo;
//# sourceMappingURL=UserRepo.js.map