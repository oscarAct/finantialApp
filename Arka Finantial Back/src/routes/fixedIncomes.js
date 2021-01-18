const express = require("express");
const fiController = require("../controllers/fixedIncomesController");
const midAuth = require("../middlewares/auth");

const router = express.Router();

// rutas de usuarios

router.get("/fixedIncomes", midAuth.authenticated, fiController.fetch);
router.post("/fixedIncomes/add", midAuth.authenticated, fiController.add);
router.delete(
  "/fixedIncomes/remove/:fiId",
  midAuth.authenticated,
  fiController.delete
);
router.put(
  "/fixedIncomes/update/:fiId",
  midAuth.authenticated,
  fiController.update
);

module.exports = router;
