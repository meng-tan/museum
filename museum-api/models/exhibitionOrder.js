const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const exhibitionOrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
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
      ref: "Exhibition"
    },
    exhibitionTitle: {
      type: String
    },
    total: {
      type: Number
    },
    tickets: {
      adult: {
        price: Number,
        amount: Number
      },
      senior: {
        price: Number,
        amount: Number
      },
      student: {
        price: Number,
        amount: Number
      },
      child: {
        price: Number,
        amount: Number
      }
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment"
    }
  },
  { timestamps: true, collection: "exhibition-order" }
);

exhibitionOrderSchema.index({ "$**": "text" });

const exhibitionOrderModel = mongoose.model(
  "ExhibitionOrder",
  exhibitionOrderSchema
);
module.exports = exhibitionOrderModel;
