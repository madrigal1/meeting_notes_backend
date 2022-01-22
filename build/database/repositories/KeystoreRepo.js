"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Keystore_1 = require("../models/Keystore");
class KeystoreRepo {
    static findforKey(client, key) {
        return Keystore_1.KeystoreModel.findOne({ client: client, primaryKey: key, status: true }).exec();
    }
    static remove(id) {
        return Keystore_1.KeystoreModel.findByIdAndRemove(id).lean().exec();
    }
    static find(client, primaryKey, secondaryKey) {
        return Keystore_1.KeystoreModel.findOne({
            client: client,
            primaryKey: primaryKey,
            secondaryKey: secondaryKey,
        })
            .lean()
            .exec();
    }
    static findById(id) {
        return Keystore_1.KeystoreModel.findById(id)
            .lean()
            .exec();
    }
    static async create(client, primaryKey, secondaryKey) {
        const now = new Date();
        let keystore;
        keystore = await Keystore_1.KeystoreModel.findOne({ client });
        if (keystore) {
            // console.log("tokens exists")
            keystore = await Keystore_1.KeystoreModel.findOneAndUpdate({ client }, { $set: { primaryKey, secondaryKey } }, { new: true });
        }
        else {
            // console.log("new tokens creted")
            keystore = await Keystore_1.KeystoreModel.create({
                client: client._id,
                primaryKey: primaryKey,
                secondaryKey: secondaryKey,
                createdAt: now,
                updatedAt: now,
            });
        }
        return keystore;
    }
}
exports.default = KeystoreRepo;
//# sourceMappingURL=KeystoreRepo.js.map