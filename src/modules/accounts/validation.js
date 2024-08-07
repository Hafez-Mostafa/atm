import joi from 'joi';
import { generalFields } from '../../../utils/generalFields.js';



export const createAccount = {
    body: joi.object({
        name: joi.string().min(3).required(),
       
        intialAmount: joi.number().min(2).max(100),
    }),

  
    headers: generalFields.header.required()
}
