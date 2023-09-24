const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const exhibitionSchema = new Schema(
  {
    title: {
      type: String
    },
    dateFrom: {
      type: Date
    },
    dateTo: {
      type: Date
    },
    location: {
      type: String
    },
    isFree: {
      type: Boolean
    },
    tickets: {
      adult: {
        price: Number,
        stock: Number
      },
      senior: {
        price: Number,
        stock: Number
      },
      student: {
        price: Number,
        stock: Number
      },
      child: {
        price: Number,
        stock: Number
      }
    },
    description: {
      type: String
    },
    imgUrl: {
      type: String
    }
  },
  { collection: "exhibition" }
);

exhibitionSchema.index({ "$**": "text" });

const exhibitionModel = mongoose.model("Exhibition", exhibitionSchema);
module.exports = exhibitionModel;
