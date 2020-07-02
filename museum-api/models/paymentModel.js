const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    tel:{
        type: String
    },
    nameOnCard: {
        type: String
    },
    cardNumber: {
        type: String
    },
    expDate: {
        type: Date,
    },
    cvv: {
        type: String
    },
}, { collection: 'payment' });

paymentSchema.index({ '$**': 'text' });

const paymentModel = mongoose.model("PaymentModel", paymentSchema);
module.exports = paymentModel;