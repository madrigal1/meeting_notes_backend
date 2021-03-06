"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./User"));
const Meeting_1 = __importDefault(require("./Meeting"));
const router = express_1.default.Router();
router.use("/user", User_1.default);
router.use("/meeting", Meeting_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map