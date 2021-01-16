const mongoose = require("mongoose");

const { Schema } = mongoose;

const CurrencySchema = Schema(
  {
    name: { type: String, required: true, trim: true },
    symbol: { type: String },
  },
  { versionKey: false, timestamps: true }
);

/*
lo que hace mongoose con este codigo, lo que hace es que en la Base de datos
va a pluralizar y hacer un lowerCase del nombre del modelo en la base en vez de 
'Currency' sera 'Currency'

*/
module.exports = mongoose.model("Currency", CurrencySchema);
