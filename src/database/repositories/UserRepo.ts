import Keystore from "../models/Keystore";
import User, { UserModel } from "../models/User";
import KeystoreRepo from "./KeystoreRepo";


export default class UserRepo {
    public static async create(
        user: User,
        access_token: string,
        refresh_token: string
    ): Promise<{ createdUser: User, keystore: Keystore }> {
        const createdUser = await UserModel.create(user);
        const keystore = await KeystoreRepo.create(
            createdUser,
            access_token,
            refresh_token,
        );
        return { createdUser, keystore };
    }
    public static async findByEmail(email: string): Promise<User> | null {
        return UserModel.findOne({ email }).lean<User>().exec();
    }
    public static async findById(id: string): Promise<User> | null {
        return UserModel.findById(id).lean<User>().exec();
    }
}