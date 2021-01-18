const express = require("express");
const incomingController = require("../controllers/incomingController");
const midAuth = require("../middlewares/auth");

const router = express.Router();

// rutas de usuarios

router.get("/incomings", midAuth.authenticated, incomingController.fetch);
router.post("/incoming/add", midAuth.authenticated, incomingController.add);
router.delete(
  "/incoming/remove/:fiId",
  midAuth.authenticated,
  incomingController.delete
);
router.put("/incoming/update/:fiId", incomingController.update);

module.exports = router;
