

import transactionsModel from '../../../db/models/transations.model.js';
import accountsModel from '../../../db/models/accounts.model.js';



import AppError from "../../../utils/AppError.js";
import { asyncHandling } from "../../../utils/errorHandling.js";


// //========================Start create Account ===============================================================
export const deposite = asyncHandling(async (req, res, next) => {
    const { amount, accountId, transactionType, date } = req.body;
    const accountExist = await accountsModel.findOne({ _id: accountId })

    if (!accountExist) return next(new AppError('You are not Authentaicated', '400'))

    const lastTrans = await accountsModel.findById(accountId)


    let balance = lastTrans +amount
  
    const transaction = await transactionsModel.create({
        accountId,
        user: req.user._id,
        amount,
        balance,
        transactionType,
        date:new Date.now(),

        transactions: [{

            date:new Date.now(),
            amount,
            transactionType,
            balance,
        }]

    })
    await accountsModel.updateOne({ user:req.user._id},{balance})


        res.status(201).json({ msg: "Account created Successfully" });
    });
    
    


    export const widthdraw = asyncHandling(async (req, res, next) => {
        const { amount, accountId, transactionType, date } = req.body;
        const accountExist = await accountsModel.findOne({ _id: accountId })
    
        if (!accountExist) return next(new AppError('You are not Authentaicated', '400'))
    
        const lastTrans = await accountsModel.findById(accountId)
    
        let balance = lastTrans - amount

        const transaction = await transactionsModel.create({
            accountId,
            user: req.user._id,
            amount,
            balance,
            transactionType,
            date:new Date.now(),
    
            transactions: [{
    
                date:new Date.now(),
                amount,
                transactionType,
                balance,
            }]
    
        })

        await accountsModel.updateOne({ user:req.user._id},{balance})




    res.status(201).json({ msg: "Transation created Successfully" });
});



// //========================End create Account ===============================================================


export const balance = asyncHandling(async (req, res, next) => {
    const account = await accountsModel.findOne({ _id:req.user._id ,_id:req.params})

    if (!account) return next(new AppError('You are not Authentaicated', '404'))
    


        res.status(201).json({ msg: "Account created Successfully" ,balance:account.balance});


    
})

export const transactions = asyncHandling(async (req, res, next) => {
    const transaction = await transactionsModel.findOne({ _id:req.user._id ,_id:req.params})
    if (!transaction) return next(new AppError('You are not Authentaicated or have no account yet', '404'))
    


        res.status(201).json({ msg: "Account created Successfully" ,history:transaction.history});


    
})


