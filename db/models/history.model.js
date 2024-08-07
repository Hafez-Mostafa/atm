import mongoose, { Schema } from "mongoose";
import systemRoles from "../../utils/systemRoles.js";


const historySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    transactionId: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },

    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String },
    balance: { type: Number, required: true },

},
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });




const historyModel = mongoose.model('History', historySchema);

export default historyModel;
