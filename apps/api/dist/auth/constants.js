"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET_KEY = void 0;
const process_1 = __importDefault(require("process"));
exports.JWT_SECRET_KEY = process_1.default.env.JWT_SECRET_KEY;
//# sourceMappingURL=constants.js.map