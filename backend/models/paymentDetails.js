const mongoose = require("mongoose");

const PaymentDetailsSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});
const PaymentDetailsModel = mongoose.model(
  "PaymentDetails",
  PaymentDetailsSchema
);
module.exports = PaymentDetailsModel;
