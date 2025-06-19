const express = require("express");
const router = express.Router();

const reviewRoutes = require("../routes/review");

const {
  home,
  handleNewParking,
  getParking,
  updateParking,
  handleDeleteParking,
} = require("../controllers/parking");

router.get("/", home);

router.post("/new", handleNewParking);

router.get("/:id", getParking);

router.put("/:id/update", updateParking);

router.delete("/:id/delete", handleDeleteParking);

router.use("/:id/review",reviewRoutes );

module.exports = router;