const Booking = require('../models/boking.model');
const passenger = require('../models/passenger.model');

exports.bookFlight = async (req, res) => {
    try {
        const { passengerId, flightId, seatNumber } = req.body;

        const passengerData = await passenger.findOne({ _id: passengerId, role: 'passenger' });
        if (!passengerData) {
            return res.status(404).json({ status: false, message: "Passenger not found" });
        }

        const newBooking = await Booking.create({
            flightId,
            passengerId,
            seatNumber
        });

        res.status(201).json({
            status: true,
            message: "Flight booked successfully",
            data: newBooking
        });

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Booking failed",
            error: error.message
        });
    }
};
