const Incoming = require("../models/incomingModel");
const { findById, createIndexes } = require("../models/userModel");
const User = require("../models/userModel");
const Savings = require("../models/savingsModel");

const controller = {};

controller.add = async (req, res) => {
  try {
    const { name, description, amount, target } = req.body;

    if (!name || !description || !amount || !target) {
      return res.send({ status: false, message: "Missing data" });
    } else {
      const incoming = new Incoming();
      incoming.name = name;
      incoming.description = description;
      incoming.amount = amount;
      incoming.target = target;
      await incoming.save((error, incomingSaved) => {
        if (error) {
          return res
            .status(200)
            .send({ status: false, message: "An error ocurred.", error });
        } else if (!incomingSaved) {
          return res
            .status(200)
            .send({ status: false, message: "The income has not saved" });
        } else {
          User.findById(req.user.id, (err, userFound) => {
            if (err) {
              return res.send({ status: false, message: "User not found" });
            } else {
              if (parseInt(incomingSaved.target) == 1) {
                userFound.incoming.push(incomingSaved._id);
                userFound.balance = userFound.balance + incomingSaved.amount;
                userFound.save((failed, saved) => {
                  if (failed) {
                    return res.send({
                      status: false,
                      message:
                        "Cannot save the incoming amount into the user records.",
                      failed,
                    });
                  } else {
                    return res.send({
                      status: true,
                      message: "Record save successfully.",
                    });
                  }
                });
              } else {
                Savings.findById(
                  { _id: incomingSaved.target },
                  (savingError, savingDoc) => {
                    if (savingError) {
                      return res.send({ status: false, savingError });
                    } else {
                      savingDoc.currentAmount += incomingSaved.amount;
                      savingDoc.incoming.push(incomingSaved._id);
                      savingDoc.save((savingError, savingSuccess) => {
                        if (savingError) {
                          return res.send({
                            status: false,
                            message: "Cannot save saving new current amount.",
                            savingError,
                          });
                        } else {
                          return res.send({
                            status: true,
                            message: "Saving saved successfully",
                            savingSuccess,
                          });
                        }
                      });
                    }
                  }
                );
              }
            }
          });
        }
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "An error ocurred.",
      error: error.message,
    });
  }
};

controller.fetch = async (req, res) => {
  try {
    await User.find({ deleted: false, _id: req.user.id })
      .populate({
        path: "incoming",
        match: {
          deleted: false,
        },
      })
      .exec((err, response) => {
        if (err) {
          return res.send({ status: false, message: "An error occurred." });
        } else {
          return res.send({ status: true, incomes: response });
        }
      });
  } catch (error) {
    return res.send({
      status: false,
      message: "An error ocurred.",
      error: error.message,
    });
  }
};
controller.delete = (req, res) => {
  try {
    const { fiId } = req.params;

    if (!fiId) {
      return res.send({ status: false, message: "Missing data." });
    } else {
      Incoming.findById({ _id: fiId }, (err, income) => {
        if (err) {
          return res
            .status(200)
            .send({ status: false, message: "An error ocurred.", error });
        } else if (!income) {
          return res
            .status(200)
            .send({ status: false, message: "The income has not found" });
        } else {
          income.deleted = true;
          income.save((err, success) => {
            if (err) {
              return res.send({ status: false, err });
            } else {
              return res.send({
                status: true,
                message: "Income deleted successfully",
              });
            }
          });
        }
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "An error ocurred.",
      error: error.message,
    });
  }
};
controller.update = (req, res) => {
  try {
    const { name, description, amount } = req.body;
    const { fiId } = req.params;

    if (!name || !description || !amount) {
      return res.send({ status: false, message: "Missing data" });
    } else {
      Incoming.findById({ _id: fiId }, (err, response) => {
        if (err) {
          return res
            .status(200)
            .send({ status: false, message: "An error ocurred.", error });
        } else {
          response.name = name;
          response.description = description;
          response.amount = amount;
          response.save((error, success) => {
            if (error) {
              return res.send({ status: false, message: "An error occurred." });
            } else {
              return res.send({
                status: true,
                message: "Income updated successfully",
                IncomeSaved: success,
              });
            }
          });
        }
      });
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "An error ocurred.",
      error: error.message,
    });
  }
};

module.exports = controller;
