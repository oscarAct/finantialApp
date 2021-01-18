const Savings = require("../models/savingsModel");
const User = require("../models/userModel");

const controller = {};

controller.add = (req, res) => {
  try {
    const { name, goal } = req.body;

    if (!name || !goal) {
      return res.send({ status: false, message: "Missing data." });
    } else {
      savings = new Savings();
      savings.name = name;
      savings.goal = goal;
      savings.currentAmount = 0;

      savings.save((err, response) => {
        if (err) {
          return res.send({
            status: false,
            message: "An error occurred.",
            err,
          });
        } else {
          User.findById(req.user.id, (err, userFound) => {
            if (err) {
              return res.send({ status: false, message: "User not found" });
            } else {
              console.log(response);
              userFound.savings.push(response._id);
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
      message: "An error occurred.",
      error: error.message,
    });
  }
};
controller.fetch = async (req, res) => {
  try {
    await User.find({ deleted: false, _id: req.user.id })
      .populate({
        path: "savings",
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
      Savings.findById({ _id: fiId }, (err, saving) => {
        if (err) {
          return res
            .status(200)
            .send({ status: false, message: "An error ocurred.", error });
        } else if (!saving) {
          return res
            .status(200)
            .send({ status: false, message: "The saving has not found" });
        } else {
          saving.deleted = true;
          saving.save((err, success) => {
            if (err) {
              return res.send({ status: false, err });
            } else {
              return res.send({
                status: true,
                message: "Saving deleted successfully",
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
controller.update = (req, res) => {};

module.exports = controller;
