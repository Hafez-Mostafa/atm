

import transactionsModel from '../../../db/models/transations.model.js';
import accountsModel from '../../../db/models/accounts.model.js';
import historyModel from '../../../db/models/history.model.js';




import AppError from "../../../utils/AppError.js";
import { asyncHandling } from "../../../utils/errorHandling.js";


// ======================== Start create Account ===============================================================
export const deposite = asyncHandling(async (req, res, next) => {
    const { amount, accountId, transactionType } = req.body;

    // Validate input
    if (!amount || !accountId || !transactionType) {
        return next(new AppError('All fields are required', '400'));
    }

    // Check if the account exists
    const accountExist = await accountsModel.findById(accountId);
    if (!accountExist) {
        return next(new AppError('Account not found', '400'));
    }

    // Get the last transaction for the account
    const lastTrans = await transactionsModel.findOne({ accountId }).sort({ createdAt: -1 });

    // Calculate the new balance
    let balance;
    if (!lastTrans) {
        balance = accountExist.intialAmount + amount;
    } else {
        balance = lastTrans.balance + amount;
    }

    const transaction = await transactionsModel.create({
        accountId,
        user: req.user._id,
        amount,
        balance,
        transactionType,
        date: Date.now(),
    })

    accountExist.balance = balance
    await accountExist.save()

    await historyModel.create({
        date: Date.now(),
        amount,
        transactionType,
        balance,
        user: req.user._id,
        accountId,
        transactionId: transaction._id

    });
    res.status(201).json({ msg: "Transaction created successfully", transaction });
});


// ======================== Start create Account ===============================================================
export const withdraw = asyncHandling(async (req, res, next) => {
    const { amount, accountId, transactionType } = req.body;

    // Validate input
    if (!amount || !accountId || !transactionType) {
        return next(new AppError('All fields are required', '400'));
    }

    // Check if the account exists
    const accountExist = await accountsModel.findById(accountId);
    if (!accountExist) {
        return next(new AppError('Account not found', '400'));
    }

    // Get the last transaction for the account
    const lastTrans = await transactionsModel.findOne({ accountId }).sort({ createdAt: -1 });

    // Calculate the new balance
    let balance;
    if (!lastTrans) {
        balance = accountExist.intialAmount - amount;
    } else {
        balance = lastTrans.balance - amount;
    }

    const transaction = await transactionsModel.create({
        accountId,
        user: req.user._id,
        amount,
        balance,
        transactionType,
        date: Date.now(),
    })

    accountExist.balance = balance
    await accountExist.save()

    await historyModel.create({
        date: Date.now(),
        amount,
        transactionType,
        balance,
        user: req.user._id,
        accountId,
        transactionId:transaction._id

    });
    res.status(201).json({ msg: "Transaction created successfully", transaction });
});


// //========================End create Account ===============================================================


export const balance = asyncHandling(async (req, res, next) => {
    const { id } = req.params
    const account = await accountsModel.findOne({ user: req.user._id, _id: id })

    if (!account) return next(new AppError('You are not Authentaicated', '404'))



    res.status(201).json({ msg: "Account created Successfully", balance: account.balance });



})

export const transactions = asyncHandling(async (req, res, next) => {
    const { id } = req.params

    const transaction = await transactionsModel.find({ user: req.user._id }, { _id: 0 })
        .populate({
            path: 'user',  // The field in transactionsModel that references the User model
            select: 'fullname  BOD createdAt email mobileNumber -_id'  // Optionally, you can choose which fields to include/exclude from the populated document
        });
    if (!transaction) return next(new AppError('You are not Authentaicated or have no account yet', '404'))



    res.status(201).json({ msg: "Account created Successfully", transaction });



})


