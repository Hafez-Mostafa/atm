

import accountsModel from '../../../db/models/accounts.model.js';
import userModel from '../../../db/models/user.model.js';



import AppError from "../../../utils/AppError.js";
import { asyncHandling } from "../../../utils/errorHandling.js";


//========================Start create Account ===============================================================
export const createAccount = asyncHandling(async (req, res, next) => {
    const { intialAmount } = req.body;

    const userExist = await userModel.findOne({ _id: req.user._id })

    if (!userExist) return next(new AppError('You are not Authentaicated', '400'))
    // let name = `${userExist.lastname} ${userExist.lastname}`
    const account = await accountsModel.create({
        user: req.user._id, intialAmount,
    })


    res.status(201).json({ msg: "Account created Successfully" });
});



//========================End create Account ===============================================================



