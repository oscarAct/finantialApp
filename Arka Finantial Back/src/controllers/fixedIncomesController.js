const FixedIncomes = require("../models/fixedIncomesModel");

const controller = {};

controller.add = (req, res) => {
  try {
    const { amount, date } = req.body;

    if (!amount || !date) {
      return res.send({ status: false, message: "Missing data." });
    } else {
      fi = new FixedIncomes();
      fi.amount = amount;
      fi.dateDay = date;

      fi.save((err, response) => {
        if (err) {
          return res.send({
            status: false,
            message: "An error occurred.",
            err,
          });
        } else {
          return res.send({
            status: true,
            message: "Added successflluy.",
            response,
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
    await FixedIncomes.find((err, response) => {
      if (err) {
        return res.send({
          status: false,
          message: "An error occurred.",
          error: err,
        });
      } else {
        return res.send({ status: true, fixedIncomes: response });
      }
    });
  } catch (error) {
    return res.send({
      status: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};

controller.delete = (req, res) => {
  try {
    const { fiId } = req.params;

    if (!fiId) return res.send({ status: false, message: "Missing data" });
    else {
      FixedIncomes.deleteOne({ _id: fiId }, (err, response) => {
        if (err) {
          return res
            .status(404)
            .send({ status: false, message: "Fixed income not found." });
        } else {
          return res.status(200).send({
            status: true,
            message: "Fixed income successfully deleted.",
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
controller.update = (req, res) => {
  try {
    const { fiId } = req.params;
    const { dateDay, amount } = req.body;

    if (!fiId || !dateDay || !amount) {
      return res.send({ status: false, message: "Missing data." });
    } else {
      updateObj = {
        dateDay,
        amount,
      };
      FixedIncomes.findByIdAndUpdate(
        { _id: fiId },
        updateObj,
        (err, response) => {
          if (err) {
            return res
              .status(500)
              .send({ status: false, message: "An error occurred.", err });
          } else {
            return res.status(200).send({
              status: true,
              message: "Fixed income updated successfully.",
              updatedElement: response,
            });
          }
        }
      );
    }
  } catch (error) {
    return res.send({
      status: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};
module.exports = controller;
