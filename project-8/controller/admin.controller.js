const admin = require('../models/admin.model')
const supervisor = require("../models/supervisor.model");
const Flight = require('../models/flight.model');
const Hostess = require('../models/hostess.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')

//register admin
exports.registerAdmin = async (req, res) => {
    try {
        if (await admin.findOne({ username: req.body.username }))
            res.status(201).json({ register: false, message: "username  is allredy exits.." })

        if (await admin.findOne({ email: req.body.email }))
            return res.status(201).json({ register: false, message: "email  is allredy exits.." })
        req.body.password = await bcrypt.hash(req.body.password, 7);

        const insertadmin = await admin.create(req.body);
        if (insertadmin) {
            res.status(201).json({ status: true, message: " admin register successfullyy.." })
        }
        else
            res.status(201).json({ status: false, message: " admin register failed.." })
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error })
    }
}

//login admin
exports.loginAdmin = async (req, res) => {
    try {
        const adminEmail = await admin.findOne({ email: req.body.email });
        if (adminEmail) {
            if (await bcrypt.compare(req.body.password, adminEmail.password)) {
                const token = jwt.sign({ adminData: adminEmail }, process.env.SCERET);
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

// admin profile
exports.adminProfile = async (req, res) => {
    try {
        res.status(200).json({ message: "admin profile is hear..", profile: req.user })
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error });
    }
}

// create supervisor
exports.createSupervisor = async (req, res) => {
    try {
        const data = req.body;
        const exists = await supervisor.findOne({ email: data.email });
        if (exists) {
            return res.status(400).json({ message: "supervisor already exists" });
        }
        const hashedPassword = await bcrypt.hash(data.password, 7);
        data.password = hashedPassword;
        const newSupervisor = await supervisor.create(data);
        res.status(201).json({ message: "supervisor create", data: newSupervisor });
    } catch (err) {
        res.status(500).json({ message: "failed to create supervisor" });
    }
};

//delete supervisor
exports.deleteSupervisor = async (req, res) => {
    try {
        const supervisorId = req.params.id;
        const deletedSupervisor = await supervisor.findByIdAndDelete(supervisorId);
        if (!deletedSupervisor) {
            return res.status(404).json({ status: false, message: "Supervisor not found" });
        }
        res.status(200).json({
            status: true, message: "Supervisor deleted successfully", data: deletedSupervisor
        });
    } catch (error) {
        res.status(400).json({ status: false, message: "something went wrong", error: error });
    }
};

//update supervisor
exports.updateSupervisor = async (req, res) => {
    try {
        const supervisorId = req.params.id;
        const updates = req.body;

        const updatedSupervisor = await supervisor.findByIdAndUpdate(
            supervisorId,
            updates,
        );
        if (!updatedSupervisor) {
            return res.status(404).json({ status: false, message: "supervisor not found" });
        }

        res.status(200).json({
            status: true,
            message: "Supervisor updated successfully",
            data: updatedSupervisor
        });
    } catch (error) {
        res.status(400).json({ status: false, message: "something went wrong", error: error });
    }
};

// supervisor profile
exports.supervisorProfile = (req, res) => {
    try {
        res.status(200).json({ message: "supervicer profile is here", profile: req.user })
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error });
    }
}

//get all supervisor
exports.getAllSupervisors = async (req, res) => {
    try {
        const all = await Hostess.find({});
        res.json({ message: "all supervisors", data: all });
    } catch (err) {
        res.status(500).json({ message: "failed to fetch supervisors" });
    }
};

// create new hostess
exports.createHostess = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 7);
        req.body.password = hashedPassword;
        const hostess = await Hostess.create(req.body);
        res.status(201).json({ success: true, data: hostess });
    } catch (err) {
        res.status(400).json({ success: false, message: 'hostess creation failed' });
    }
};

//allHostes
exports.allHostes = async (req, res) => {
    try {
        const all = await Hostess.find();
        res.json({ message: "all hostess", data: all });
    } catch (err) {
        res.status(400).json({ message: "failed to fetch Hostess" });
    }
}

//updateHostess
exports.updateHostess = async (req, res) => {
    try {
        const hostessId = req.params.id;
        const updateData = req.body;

        const updatedHostess = await Hostess.findByIdAndUpdate(hostessId, updateData);

        if (!updatedHostess) {
            return res.status(404).json({ status: false, message: "hostess not found" });
        }

        res.status(200).json({
            status: true, message: "hostess info updated successfully", data: updatedHostess
        });

    } catch (error) {
        res.status(400).json({ status: false, message: "Something went wrong", error: error });
    }
};

//delete hostess
exports.deleteHostess = async (req, res) => {
    try {
        const hostessId = req.params.id;

        const deletedHostess = await Hostess.findByIdAndDelete(hostessId);

        if (!deletedHostess) {
            return res.status(404).json({
                status: false,
                message: "hostess not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "hostess deleted successfully",
            deletedData: deletedHostess
        });

    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Something went wrong",
            error: error
        });
    }
};

//view assign flights
exports.viewAsignflights = async (req, res) => {
    try {
        const supervisorId = req.user._id;
        const flights = await Flight.find({ assignedSupervisor: supervisorId });
        res.status(200).json({
            status: true, message: "flights fetch", data: flights
        });

    } catch (error) {
        res.status(400).json({
            status: false, message: "something went wrong", error: error
        });
    }
};

// admin changePassword 
exports.changePassword = async (req, res) => {
    try {
        const isMatch = await bcrypt.compare(req.body.current_password, req.user.adminData.password);
        if (!isMatch)
            return res.status(400).json({ message: "current password is not match.." });
        if (req.body.new_password === req.body.current_password)
            return res.status(400).json({ message: "current password and new password are same.." });
        const hashedPassword = await bcrypt.hash(req.body.new_password, 7);
        const updatePassword = await admin.findByIdAndUpdate(
            req.user.adminData._id,
            { password: hashedPassword },
        );
        if (updatePassword) {
            return res.status(200).json({ message: "password is changed." });
        } else {
            return res.status(400).json({ message: "password is not changed." });
        }
    } catch (error) {
        res.status(400).json({ message: "something went wrong..", error: error });
    }
};

//forget password
exports.forgetPassword = async (req, res) => {
    try {
        const adminData = await admin.findOne({ email: req.body.email })
        if (!adminData)
            return res.status(201).json({ forget: false, message: "email is invalied" })
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vadadoriyanency8@gmail.com',
                pass: 'jubtjccmjmawofgf'
            }
        });
        const otp = Math.floor(Math.random() * 1000000);
        let mail = {
            from: 'vadadoriyanency8@gmail.com',
            to: "vadadoriyanency8@gmail.com",
            subject: 'Your OTP for Password Reset',
            html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                            <h2 style="color: #333;">🔐 Password Reset Request</h2>
                            <p style="font-size: 16px; color: #555;">
                                Hi there,<br><br>
                                We received a request to reset your password. Please use the OTP below to reset your password:
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <span style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #2c3e50;">${otp}</span>
                            </div>
                            <p style="font-size: 14px; color: #777;">
                                This OTP is valid for only 10 minutes. Do not share it with anyone.<br><br>
                                If you did not request a password reset, you can safely ignore this email.
                            </p>
                            <hr style="margin: 20px 0;">
                            <p style="font-size: 12px; color: #aaa; text-align: center;">
                                &copy; ${new Date().getFullYear()} white infogeth. All rights reserved.
                            </p>
                        </div>
                    </div>`
        }
        let sendmail = await transporter.sendMail(mail);
        if (sendmail.messageId) {
            res.status(201).json({ forget: true, message: "otp send successfully", otp: otp })
        }
        else
            res.status(201).json({ forget: false, message: "otp send failed" })
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error });
    }
}

// all fecth admins
exports.fetchAdmins = async (req, res) => {
    try {
        const allAdmins = await adminModel.find({});
        allAdmins ? res.status(200).json({ status: true, message: "all admin fecth", allAdmins: allAdmins })
            : res.status(200).json({ status: false, message: "all admin not fecth" })
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong" })
    }
}

