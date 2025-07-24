const express = require("express");
const router = express.Router();
const { getAllFlights, createFlight, deleteFlight, updateFlight } = require("../controller/flight.controller");

router.get('/getAllFlights', getAllFlights)
router.post("/createFlight", createFlight);
router.delete("/deleteFlight/:id", deleteFlight);
router.put("/updateFlight/:id", updateFlight);

module.exports = router;
