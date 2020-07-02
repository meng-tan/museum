const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const exhibitionOrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    email: {
        type: String
    },
    placedTime: {
        type: Date,
        default: Date.now
    },
    exhibitionId: {
        type: Schema.Types.ObjectId,
        ref: 'ExhibitionModel'
    },
    exhibitionTitle: {
        type: String,
    },
    total: {
        type: Number
    },
    tickets: {
        adult: {
            price: Number,
            amount: Number,
        },
        senior: {
            price: Number,
            amount: Number,
        },
        student: {
            price: Number,
            amount: Number,
        },
        child: {
            price: Number,
            amount: Number,
        }
    },
    paymentId: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentModel'
    }
}, { collection: 'exhibition-order' });

exhibitionOrderSchema.index({ '$**': 'text' });

const exhibitionOrderModel = mongoose.model("ExhibitionOrderModel", exhibitionOrderSchema);
module.exports = exhibitionOrderModel;