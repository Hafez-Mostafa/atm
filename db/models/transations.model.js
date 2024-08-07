import mongoose, { Schema } from "mongoose";
import systemRoles from "../../utils/systemRoles.js";


const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',  // Reference to the User model
        required: true
    },

    amount: {
        type: Number,
        required: [true, 'Amount must be enter']
    },
    transactionType: {
        type: String,
        enum: ['deposite', 'withdraw']
    },
    balance: Number,

    transactions: [{
        date: { type: Date, required: true },
        amount: { type: Number,required: true },
        transactionType: { type: String },
        balance: { type: Number, required: true },
    }]
,
    date: Date
},
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });




const transactionModel = mongoose.model('Transaction', transactionSchema);

export default transactionModel;
