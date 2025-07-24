const Flight = require('../models/flight.model');

//create flight
exports.createFlight = async (req, res) => {
    try {
        const flight = await Flight.create(req.body);
        res.status(201).json({ success: true, data: flight });
    } catch (err) {
        res.status(400).json({ success: false, message: 'flight creation failed' });
    }
};

//delete Flight
exports.deleteFlight = async (req, res) => {
    const flightId = req.params.id;

    try {
        const deletedFlight = await Flight.findByIdAndDelete(flightId);

        if (!deletedFlight) {
            return res.status(404).json({ message: "flight not found" });
        }
        res.json({ message: "flight deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "deletion failed" });
    }
};

//update flight
exports.updateFlight = async (req, res) => {
    const flightId = req.params.id;
    const updateData = req.body;
    try {
        const flight = await Flight.findByIdAndUpdate(flightId, updateData);
        if (!flight) {
            return res.status(404).json({ message: "flight not found" });
        }
        res.json({ message: "flight updated successfully", data: flight });
    } catch (error) {
        res.status(400).json({ message: "update failed" });
    }
};

//view all flights
exports.getAllFlights = async (req, res) => {
    try {
        const flights = await Flight.find().populate("hostess_list", "name");
        res.status(200).json({ success: true, data: flights });
    } catch (err) {
        res.status(400).json({ success: false, message: "failed fetch flights" });
    }
};

