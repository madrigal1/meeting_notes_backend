import { Request } from "express";
import User from "../database/models/User";
import Keystore from "../database/models/Keystore";

// declare interface PublicRequest extends Request {
//   apiKey: string;
// }



declare interface ProtectedRequest extends Request {
    user: User;
    accessToken: string;
    keystore: Keystore;
}

declare interface Tokens {
    accessToken: string;
    refreshToken: string;
}
