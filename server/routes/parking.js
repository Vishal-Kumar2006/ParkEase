const express = require("express");
const router = express.Router();

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

module.exports = router;