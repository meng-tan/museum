const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const paymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    tel: {
      type: String
    },
    nameOnCard: {
      type: String
    },
    cardNumber: String,
    cardNumberEnding: String,
    expDate: String,
    cvv: {
      type: String
    }
  },
  { collection: "payment" }
);

paymentSchema.pre("save", function (next) {
  this.cardNumberEnding = this.cardNumber.substring(12);
  next();
});

paymentSchema.index({ "$**": "text" });

const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = paymentModel;
