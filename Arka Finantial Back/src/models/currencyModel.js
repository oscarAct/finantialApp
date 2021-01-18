const mongoose = require("mongoose");

const { Schema } = mongoose;

const CurrencySchema = Schema(
  {
    name: { type: String, required: true, trim: true },
    symbol: { type: String },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Currency", CurrencySchema);
