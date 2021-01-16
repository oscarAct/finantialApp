const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = Schema(
  {
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    email: { type: String, unique: true },
    password: { type: String },
    initials: { type: String },
    activated: { type: Boolean },
    incoming: [{ type: Schema.ObjectId, ref: "Incoming" }],
    outgoing: [{ type: Schema.ObjectId, ref: "Outgoing" }],
    savings: [{ type: Schema.ObjectId, ref: "Savings" }],
    fixedIncome: { type: Boolean, required: false },
    fixedIncomes: [{ type: Schema.ObjectId, ref: "fixedIncomes" }],
    unsetAccount: { type: Boolean, required: true },
    currency: { type: Schema.ObjectId, ref: "Currency" },
    profilePhoto: { type: String },
  },
  { versionKey: false, timestamps: true }
);

/*
this block of code has the function to delete the parameters we do not want
*/
UserSchema.methods.toJSON = function () {
  // methods.toJSON, is the method by default that moongose use to send data
  const obj = this.toObject(); // declaring a variable with the current object "user"
  delete obj.password; // deleting the password to send
  return obj; // return object without passwword and activeProfile
};

/*
lo que hace mongoose con este codigo, lo que hace es que en la Base de datos
va a pluralizar y hacer un lowerCase del nombre del modelo en la base en vez de 
'User' sera 'users'

*/
module.exports = mongoose.model("User", UserSchema);
