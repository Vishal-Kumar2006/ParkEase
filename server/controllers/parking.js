const Parking = require("../models/parking.js");

async function fetchAllParking(req, res) {
  const page = req.query.page;
  const limit = 12;

  if (!page) {
    return res.status(400).json({ message: "Invalid client request" });
  }

  try {
    const allPakings = await Parking.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await Parking.countDocuments();
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({ allPakings, totalPages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function fetchElectricParking(req, res) {
  const page = Number(req.query.page) || 1;
  const limit = 12;

  if (page < 1) {
    return res.status(400).json({ message: "Invalid page number" });
  }
  try {
    const [allParkings, count] = await Promise.all([
      Parking.find({ isElectric: true })
        .skip((page - 1) * limit)
        .limit(limit),
      Parking.countDocuments({ isElectric: true }),
    ]);

    return res.status(200).json({
      allParkings,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
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
  fetchAllParking,
  fetchElectricParking,
  handleNewParking,
  getParking,
  getParkingByUser,
  updateParking,
  handleDeleteParking,
};
