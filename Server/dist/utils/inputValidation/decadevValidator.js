"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDecadevDetails = exports.decadevSchema = void 0;
const joi_1 = __importStar(require("joi"));
//Validate Decadev details
exports.decadevSchema = joi_1.default.object({
    firstName: joi_1.default.string().alphanum().min(3).max(30).required(),
    lastName: joi_1.default.string().alphanum().min(3).max(30).required(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['dev', 'com'] } }),
    password: joi_1.default.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirmPassword: joi_1.default.ref('password'),
    phoneNo: joi_1.default.number(),
    stack: joi_1.default.string(),
    squad: joi_1.default.number().min(1),
    status: joi_1.default.string(),
}).with('newPassword', 'confirmPassword');
//Validate Decadev function
const validateDecadevDetails = async (req, res, next) => {
    try {
        //Validate input details
        const data = req.body;
        delete req.body.user;
        const valid = await exports.decadevSchema.validateAsync({ ...data });
        if (valid) {
            next();
        }
    }
    catch (error) {
        //Error to handler
        if (error instanceof joi_1.ValidationError) {
            const { message } = error.details[0];
            next(new Error(message));
        }
    }
};
exports.validateDecadevDetails = validateDecadevDetails;
//Validate Decadev Update/Edit Input Values
