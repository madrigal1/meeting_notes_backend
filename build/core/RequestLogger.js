"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = __importDefault(require("./Logger"));
class MyStream {
    write(text) {
        Logger_1.default.info(text.replace(/\n$/, ""));
    }
}
exports.default = new MyStream();
//# sourceMappingURL=RequestLogger.js.map