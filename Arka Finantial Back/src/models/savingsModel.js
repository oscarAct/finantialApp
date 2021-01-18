const mongoose = require("mongoose");

const { Schema } = mongoose;

const SavingsSchema = Schema(
  {
    name: { type: String, required: true, trim: true },
    goal: { type: Number, required: true },
    currentAmount: { type: Number },
    incoming: [{ type: Schema.ObjectId, ref: "Incoming" }],
    outgoing: [{ type: Schema.ObjectId, ref: "Outgoing" }],
    deleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

/*
lo que hace mongoose con este codigo, lo que hace es que en la Base de datos
va a pluralizar y hacer un lowerCase del nombre del modelo en la base en vez de 
'Savings' sera 'Savings'

*/
module.exports = mongoose.model("Savings", SavingsSchema);
