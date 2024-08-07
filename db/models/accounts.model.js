import mongoose, { Schema } from "mongoose";
import systemRoles from "../../utils/systemRoles.js";



const accountSchema = new Schema({
   
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },


 
    intialAmount: {
        type: Number,
        required: [true, 'AmIntial amount must be enter']
    },

},
    {
        timestamps: true,
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });




const accountModel = mongoose.model('Account', accountSchema);

export default accountModel;
