const mongoose = require("mongoose");

const { Schema } = mongoose;

const FixedIncomesSchema = Schema(
  {
    amount: { type: String, required: true, trim: true },
    dateDay: { type: Number },
  },
  { versionKey: false, timestamps: true }
);

/*
lo que hace mongoose con este codigo, lo que hace es que en la Base de datos
va a pluralizar y hacer un lowerCase del nombre del modelo en la base en vez de 
'FixedIncomes' sera 'FixedIncomes'

*/
module.exports = mongoose.model("FixedIncomes", FixedIncomesSchema);
