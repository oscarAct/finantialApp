const express = require("express");
const currencyController = require("../controllers/currencyController");
const midAuth = require("../middlewares/auth");

const router = express.Router();

// rutas de usuarios

router.get("/currencies", midAuth.authenticated, currencyController.fetch);
router.post("/currency/add", midAuth.authenticated, currencyController.add);
router.delete(
  "/currency/remove/:currencyId",
  midAuth.authenticated,
  currencyController.delete
);

module.exports = router;
