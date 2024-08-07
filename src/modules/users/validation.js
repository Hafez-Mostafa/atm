import joi from 'joi';
import { generalFields } from '../../../utils/generalFields.js';


export const signUpValidation = {
    body: joi.object({
        firstname: joi.string().alphanum().min(3).max(30).required(),
        lastname: joi.string().alphanum().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required(),
        cpassword: joi.any().valid(joi.ref('password')).required(),
        DOB: joi.date().required(),
        mobileNumber: joi.number(),
        recoveryEmail: joi.string().email(),
        role: joi.string().alphanum(),
        address: joi.array().items(joi.string()).required(),

    }),

};



export const verfiyValidation = {
    body: joi.object({
        recoveryEmail: joi.string().email(),

    }),

};


export const signInValidation = {
    body: joi.object({
        email: joi.string().email().required(),
        password: joi.string()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required()
    }),

};

export const visitProfileValidation = {
    params: joi.object({ otherId: generalFields.id.required() })

};
