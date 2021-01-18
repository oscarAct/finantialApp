const express = require("express");
const savingController = require("../controllers/savingsController");
const midAuth = require("../middlewares/auth");

const router = express.Router();

// rutas de usuarios

router.get("/savings", midAuth.authenticated, savingController.fetch);
router.post("/saving/add", midAuth.authenticated, savingController.add);
router.delete(
  "/saving/remove/:fiId",
  midAuth.authenticated,
  savingController.delete
);
router.put("/saving/update/:fiId", savingController.update);

module.exports = router;
