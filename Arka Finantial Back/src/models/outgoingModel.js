const mongoose = require("mongoose");

const { Schema } = mongoose;

const OutgoingSchema = Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    amount: { type: Number },
    needed: { type: Boolean },
    target: { type: String },
    deleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

/*
lo que hace mongoose con este codigo, lo que hace es que en la Base de datos
va a pluralizar y hacer un lowerCase del nombre del modelo en la base en vez de 
'Outgoing' sera 'Outgoing'

*/
module.exports = mongoose.model("Outgoing", OutgoingSchema);
