import { Schema, Document, model } from "mongoose";
import bcrypt from 'bcryptjs';

export const DOCUMENT_NAME = "user";
export const COLLECTION_NAME = "users";

export default interface User extends Document {
    email: string;
    pwd: string;
}

const userSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
    pwd: {
        type: Schema.Types.String,
        required: true,
        trim: true,
    },
})




export const UserModel = model<User>(DOCUMENT_NAME, userSchema, COLLECTION_NAME);

