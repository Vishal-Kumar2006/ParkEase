const express = require("express");
const router = express.Router();
const Parking = require("../models/parking");


router.get("/", async (req, res) => {
    const allPakings = await Parking.find(req.params);
    res.send(allPakings);
});


router.post("/new", async (req, res) => {
    
    try {
        const parking = new Parking(req.body);
        if(parking.image == "") parking.image = "https://www.newdelhiairport.in/media/2011/premium-lane-parking.jpg";
        console.log(parking);
        const saved = await parking.save();
        res.json(saved);
    } catch (error) {
        console.error("Error while saving to DB:", error);  // Log full error
        res.status(500).json({ message: error.message });
    }
});

// Move this route below to avoid conflicts
router.get("/:id", async (req, res) => {
    try {
        const parking = await Parking.findById(req.params.id);
        if (!parking) return res.status(404).json({ message: "Parking not found" });
        res.json(parking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put("/:id/update", async (req, res) => {
    try {
        const updatedParking = await Parking.findByIdAndUpdate(
            req.params.id,  
            req.body, 
            { new: true, runValidators: true } 
        );

        if (!updatedParking) {
            return res.status(404).json({ message: "Parking not found" });
        }

        res.json(updatedParking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete("/:id/delete", async (req, res) => {
    try {
        const deleteParking = await Parking.findByIdAndDelete(req.params.id); // ✅ Removed req.body

        if (!deleteParking) {
            return res.status(404).json({ message: "Parking not found" });
        }

        res.json({ message: "Parking deleted successfully" }); // ✅ Responding with JSON instead of redirecting
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;
