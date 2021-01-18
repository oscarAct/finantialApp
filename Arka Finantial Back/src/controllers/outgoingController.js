const Outgoing = require("../models/outgoingModel");
const User = require("../models/userModel");

const controller = {};

controller.add = async (req, res) => {
  try {
    const { name, description, amount, needed, target } = req.body;

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
