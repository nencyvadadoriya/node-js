const Hostess = require('../models/hostess.model');
const Flight = require('../models/flight.model');
const Booking = require('../models/boking.model');
const Passenger = require('../models/passenger.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
// register passenger 
exports.register = async (req, res) => {
    try {
        if (await Hostess.findOne({ username: req.body.username }))
            return res.status(201).json({ register: false, message: "username already exists.." });

        if (await Hostess.findOne({ email: req.body.email }))
            return res.status(201).json({ register: false, message: "email already exists.." });

        req.body.password = await bcrypt.hash(req.body.password, 7);

        const insertHostess = await Hostess.create(req.body);
        if (insertHostess) {
            return res.status(201).json({ status: true, message: "hostess registered successfully." });
        }
        res.status(201).json({ status: false, message: "hostess registration failed." });
    } catch (error) {
        res.status(400).json({ message: "something went wrong..", error: error });
    }
};

// login passenger
exports.login = async (req, res) => {
    try {
        const hostessEmail = await Hostess.findOne({ email: req.body.email });
        if (hostessEmail) {
            if (await bcrypt.compare(req.body.password, hostessEmail.password)) {
                const token = jwt.sign({ adminData: hostessEmail }, process.env.SCERET);
                res.status(201).json({ status: true, message: "login sucessfully..", token: token })
            } else {
                res.status(201).json({ status: false, message: "password  not found.." })
            }
        } else {
            res.status(201).json({ status: false, message: "username or email is not found.." })
        }
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error })
    }
};

//view profile
exports.viewProfile = async (req, res) => {
    try {
        res.status(200).json({ message: "Hostess profile is here", profile: req.user })
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
        const updatedHostess = await Hostess.findByIdAndUpdate(passengerId, updateData);

        if (updatedHostess) {
            res.status(200).json({
                status: true, message: "hostess profile updated successfully", updatedData: updatedHostess
            });
        } else {
            res.status(404).json({ status: false, message: "hostess not found" });
        }
    } catch (error) {
        res.status(400).json({ status: false, message: "something went wrong", error });
    }
};

//forget password
exports.forgetPassword = async (req, res) => {
    try {
        const hostessData = await Hostess.findOne({ email: req.body.email });
        if (!hostessData)
            return res.status(201).json({ forget: false, message: "Email is invalid" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        await Hostess.findByIdAndUpdate(hostessData._id, {
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
                                Hello <strong>${hostessData.username || "Supervisor"}</strong>,
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
        await Hostess.updateOne({ email, password: hashedPassword }
        );
        res.status(200).json({ status: true, msg: "password reset successfully" });
    } catch (err) {
        res.status(400).json({ status: false, msg: "something went wrong", error });
    }
};

// create passenger
exports.createPassenger = async (req, res) => {
    try {
        const { name, username, email, password, age, assigned_flight } = req.body;

        const existing = await Passenger.findOne({ email });
        if (existing) {
            return res.status(200).json({ status: false, message: "passenger already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 7);
        const passenger = await Passenger.create({
            name,
            username,
            email,
            password: hashPassword,
            age,
            assigned_flight
        });

        res.status(201).json({
            status: true,
            message: "passenger created successfully",
            data: passenger
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "creation passenger failed",
            error: error
        });
    }
};

// assign hostess to flight
exports.assignHostess = async (req, res) => {
    try {
        const { hostess_id, flight_id } = req.body;

        const hostess = await Hostess.findById(hostess_id);
        const flight = await Flight.findById(flight_id);
        if (!hostess || !flight) {
            return res.status(404).json({ success: false, message: 'hostess or Flight not found' });
        }
        res.status(200).json({ success: true, message: 'hostess assigned to flight successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'assignment failed' });
    }
};

//view flight passengers
exports.viewFlightPassengers = async (req, res) => {
    try {
        const flightId = req.params.fid;
        const passengers = await Booking.find({ flightId })
            .populate('passengerId', 'name email');

        if (!passengers.length) {
            return res.status(404).json({
                status: false,
                message: "No passengers found for this flight."
            });
        }
        res.status(200).json({
            status: true, message: "passengers fetched successfully", data: passengers
        });

    } catch (error) {
        res.status(400).json({
            status: false, message: "something went wrong", error: error
        });
    }
};

// check passenger
exports.checkInPassenger = async (req, res) => {
    try {
        const bookingId = req.params.pid;

        const booking = await Booking.findByIdAndUpdate({ bookingId, CheckedIn: true });

        if (!booking) {
            return res.status(404).json({ status: false, message: "Passenger booking not found" });
        }

        res.status(200).json({
            status: true, message: "Passenger checked-in successfully", data: booking
        });

    } catch (error) {
        res.status(400).json({
            status: false, message: "something went wrong", error: error
        });
    }
};

//view all passenger in flight
exports.viewAllPassengersWithFlight = async (req, res) => {
    try {
        const data = await Passenger.find()
            .populate('assigned_flight', 'flightName departureTime');
        res.status(200).json({
            status: true, message: "Passengers with assigned flight details", data: data
        });
    } catch (error) {
        res.status(400).json({
            status: false, message: "failed passengers", error: error
        });
    }
};
