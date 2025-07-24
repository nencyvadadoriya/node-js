const Booking = require('../models/boking.model');
const Flight = require('../models/flight.model')
const Passenger = require('../models/passenger.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

//search flight
exports.searchFlights = async (req, res) => {
    try {
        const { source, destination } = req.body;
        const flights = await Flight.find({ source, destination });
        if (!flights.length) {
            return res.status(404).json({ status: false, message: "No flights found" });
        }
        res.status(200).json({ status: true, data: flights });
    } catch (err) {
        res.status(400).json({ status: false, message: "searching flights failed", error: err });
    }
};

//book flight
exports.bookFlight = async (req, res) => {
    try {
        const { flightId, passengerId, seats } = req.body;
        const booking = await Booking.create({
            flightId: flightId,
            passengerId: req.user._id,
            seats: seats,
        });
        await Passenger.findByIdAndUpdate(req.user._id, {
            assigned_flight: flightId
        });

        res.status(201).json({
            status: true, message: "flight booke successfully", data: booking
        });
    } catch (error) {
        res.status(400).json({ status: false, message: "booking failed", error: error });
    }
};

//chaking booking
exports.checkIn = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const booking = await Booking.findOne({
            _id: bookingId, passengerId: req.user._id
        });

        if (!booking) {
            return res.status(200).json({ status: false, message: "booking not found" });
        }
        if (booking.CheckedIn) {
            return res.status(200).json({ status: false, message: "already checked-in" });
        }
        res.status(200).json({ status: true, message: "checked in successfully", data: booking });
    } catch (error) {
        res.status(400).json({ status: false, message: "check-in failed", error: error });
    }
};

// view bookings 
exports.viewBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ passengerId: req.user._id })
            .populate('flightId', 'flight_no source destination');

        res.status(200).json({ status: true, message: "your bookings", data: bookings });
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(400).json({ status: false, message: "fetching bookings failed", error: error });
    }
};

// cancel flight tickit
exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const booking = await Booking.findOneAndDelete({ _id: bookingId, passengerId: req.user._id });

        if (!booking) {
            return res.status(404).json({ status: false, message: "booking not found" });
        }
        res.status(200).json({ status: true, message: "booking cancelled successfully" });
    } catch (error) {
        res.status(400).json({ status: false, message: "cancellation failed", error: error });
    }
};

// register passenger 
exports.register = async (req, res) => {
    try {
        if (await Passenger.findOne({ username: req.body.username }))
            res.status(201).json({ register: false, message: "username  is allredy exits.." })

        if (await Passenger.findOne({ email: req.body.email }))
            return res.status(201).json({ register: false, message: "email  is allredy exits.." })
        req.body.password = await bcrypt.hash(req.body.password, 7);
        const insertsPassenger = await Passenger.create(req.body);
        if (insertsPassenger) {
            res.status(201).json({ status: true, message: " Passenger register successfullyy.." })
        }
        else
            res.status(201).json({ status: false, message: " Passenger register failed.." })
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error })
    }
};


// login passenger
exports.login = async (req, res) => {
    try {
        const passengerEmail = await Passenger.findOne({ email: req.body.email });
        if (passengerEmail) {
            if (await bcrypt.compare(req.body.password, passengerEmail.password)) {
                const token = jwt.sign({ adminData: passengerEmail }, process.env.SCERET);
                res.status(201).json({ status: true, message: "login sucessfully..", token: token })
            } else {
                res.status(201).json({ status: false, message: "password  not found.." })
            }
        } else {
            res.status(201).json({ status: false, message: "email is not found.." })
        }
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error })
    }
};

//view profile
exports.viewProfile = async (req, res) => {
    try {
        res.status(200).json({ message: "passenger  profile is here", profile: req.user })
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error });
    }
}

//update profile
exports.updateProfile = async (req, res) => {
    try {
        const passengerId = req.params.id;
        const updateData = req.body;
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 7);
        }
        const updatedpassenger = await Passenger.findByIdAndUpdate(passengerId, updateData, { new: true });

        if (updatedpassenger) {
            res.status(200).json({
                status: true, message: "passenger profile updated successfully", updatedData: updatedpassenger
            });
        } else {
            res.status(404).json({ status: false, message: "passenger not found" });
        }
    } catch (error) {
        res.status(400).json({ status: false, message: "something went wrong", error: error });
    }
};

//forget password
exports.forgetPassword = async (req, res) => {
    try {
        const adminData = await Passenger.findOne({ email: req.body.email });
        if (!adminData)
            return res.status(201).json({ forget: false, message: "Email is invalid" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        await Passenger.findByIdAndUpdate(adminData._id, {
            otp
        });
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vadadoriyanency8@gmail.com',
                pass: 'jubtjccmjmawofgf'
            }
        });

        let mail = {
            from: 'vadadoriyanency8@gmail.com',
            to: 'kathiriyashruti3@gmail.com',
            subject: '🔐 OTP for Supervisor Password Reset',
            html: `
                    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px;">
                        <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
                            <h2 style="text-align: center; color: #333333;">🔐 Supervisor Password Reset</h2>
                            <p style="font-size: 16px; color: #555555;">
                                Hello <strong>${adminData.username || "Supervisor"}</strong>,
                                <br><br>
                                We received a request to reset your password. Please use the following OTP (One Time Password) to proceed:
                            </p>

                            <div style="text-align: center; margin: 30px 0;">
                                <span style="font-size: 30px; font-weight: bold; letter-spacing: 5px; color: #2e86de;">${otp}</span>
                            </div>

                            <p style="font-size: 14px; color: #777777;">
                                ⚠️ This OTP is valid for only <strong>10 minutes</strong>. Do not share it with anyone.
                                <br><br>
                            </p>

                            <hr style="margin-top: 40px;">
                            <p style="font-size: 12px; color: #aaaaaa; text-align: center;">
                                &copy; ${new Date().getFullYear()} white infotegh . All rights reserved.
                            </p>
                        </div>
                    </div>
                    `
        };

        let sendmail = await transporter.sendMail(mail);

        if (sendmail.messageId) {
            res.status(201).json({ forget: true, message: "OTP sent successfully", otp: otp });
        } else {
            res.status(201).json({ forget: false, message: "OTP send failed" });
        }

    } catch (error) {
        res.status(400).json({ message: "something went wrong", error });
    }
};

// password reset 
exports.resetPassword = async (req, res) => {
    try {
        const { email, new_password } = req.body;

        const hashedPassword = await bcrypt.hash(new_password, 7);
        await Passenger.updateOne({ email, password: hashedPassword }
        );
        res.status(200).json({ status: true, msg: "password reset successful" });
    } catch (err) {
        res.status(400).json({ status: false, msg: "something went wrong", error: err });
    }
};
