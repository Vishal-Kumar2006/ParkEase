const Parking = require("../models/parking.js");

async function home(req, res) {
  const allPakings = await Parking.find(req.params);
  res.send(allPakings);
}

async function handleNewParking(req, res) {
  try {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const newParking = new Parking({ ...req.body, user: userId });
    await newParking.save();

    res
      .status(201)
      .json({ message: "Parking created successfully", newParking });
  } catch (error) {
    res.status(500).json({ message: "Error creating parking", error });
  }
}

async function getParking(req, res) {
  try {
    const parking = await Parking.findById(req.params.id).populate(
      "user",
      "name photo",
    );
    if (!parking) return res.status(404).json({ message: "Parking not found" });
    res.json(parking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getParkingByUser(req, res) {
  try {
    const userId = req.session.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const parkings = await Parking.find({ user: userId });

    res.status(201).json(parkings);
  } catch (error) {
    res.status(500).json({ message: "Error creating parking", error });
  }
}

async function updateParking(req, res) {
  try {
    const updatedParking = await Parking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedParking) {
      return res.status(404).json({ message: "Parking not found" });
    }

    res.json(updatedParking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function handleDeleteParking(req, res) {
  try {
    const deleteParking = await Parking.findByIdAndDelete(req.params.id); // ✅ Removed req.body

    if (!deleteParking) {
      return res.status(404).json({ message: "Parking not found" });
    }

    res.json({ message: "Parking deleted successfully" }); // ✅ Responding with JSON instead of redirecting
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  home,
  handleNewParking,
  getParking,
  getParkingByUser,
  updateParking,
  handleDeleteParking,
};
