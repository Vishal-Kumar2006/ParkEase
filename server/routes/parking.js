const express = require("express");
const router = express.Router();

const reviewRoutes = require("../routes/review.js");

const {
  fetchAllParking,
  fetchElectricParking,
  handleNewParking,
  getParking,
  getParkingByUser,
  updateParking,
  handleDeleteParking,
} = require("../controllers/parking.js");

router.get("/all-parkings", fetchAllParking);

router.get("/electric-parking", fetchElectricParking);

router.post("/new", handleNewParking);

router.get("/getParking-byUserId", getParkingByUser);

router.get("/:id", getParking);

router.put("/:id/update", updateParking);

router.delete("/:id/delete", handleDeleteParking);

router.use("/:id/review", reviewRoutes);

module.exports = router;
