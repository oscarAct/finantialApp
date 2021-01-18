const Currency = require("../models/currencyModel");

const controller = {};

controller.add = async (req, res) => {
  try {
    const { name, symbol } = req.body;

    if (!name || !symbol) {
      return res.send({ status: false, message: "Missing data" });
    } else {
      const currency = new Currency();
      currency.name = name;
      currency.symbol = symbol;
      await currency.save((error, currencyStored) => {
        if (error) {
          return res
            .status(200)
            .send({ status: false, message: "An error ocurred.", error });
        } else if (!currencyStored) {
          return res
            .status(200)
            .send({ status: false, message: "The currency has not saved" });
        } else {
          return res.status(200).send({
            status: true,
            message: "Currency created successfully.",
            currencyStored,
            author: controller.author,
          });
        }
      });
    }
  } catch (error) {
    return res.send({ status: true, message: "An error ocurred.", error });
  }
};
controller.delete = (req, res) => {
  try {
    const { currencyId } = req.params;

    if (!currencyId)
      return res.send({ status: false, message: "Missing data" });
    else {
      Currency.deleteOne({ _id: currencyId }, (err, response) => {
        if (err) {
          return res
            .status(404)
            .send({ status: false, message: "Currency not found." });
        } else {
          return res
            .status(200)
            .send({ status: true, message: "Currency successfully deleted." });
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
    await Currency.find((err, response) => {
      if (err) {
        return res.send({
          status: false,
          message: "An error occurred.",
          error: err,
        });
      } else {
        return res.send({ status: true, currencies: response });
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

module.exports = controller;
