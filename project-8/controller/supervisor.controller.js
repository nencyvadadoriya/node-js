const supervisor = require("../models/supervisor.model");
const hostes = require('../models/hostess.model');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// supervisor register
exports.registerSupervisor = async (req, res) => {
    try {
        if (await supervisor.findOne({ username: req.body.username }))
            res.status(201).json({ register: false, message: "username  is allredy exits.." })

        if (await supervisor.findOne({ email: req.body.email }))
            return res.status(201).json({ register: false, message: "email  is allredy exits.." })
        req.body.password = await bcrypt.hash(req.body.password, 7);
        const insertsupervisor = await supervisor.create(req.body);
        if (insertsupervisor) {
            res.status(201).json({ status: true, message: " supervisor register successfullyy.." })
        }
        else
            res.status(201).json({ status: false, message: " supervisor register failed.." })
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error })
    }
}

//login supervisor
exports.superviserLogin = async (req, res) => {
    try {
        const userData = await supervisor.findOne({ username: req.body.username });
        if (userData) {
            if (await bcrypt.compare(req.body.password, userData.password)) {
                const token = jwt.sign({ adminData: userData }, process.env.SCERET);
                res.status(201).json({ status: true, message: "login sucessfully..", token: token })
            } else {
                res.status(201).json({ status: false, message: "password  not found.." })
            }
        } else {
            const adminEmail = await supervisor.findOne({ email: req.body.email });
            if (adminEmail) {
                if (await bcrypt.compare(req.body.password, adminEmail.password)) {
                    const token = jwt.sign({ adminData: adminEmail }, process.env.SCERET);
                    res.status(201).json({ status: true, message: "login sucessfully..", token: token })
                } else {
                    res.status(201).json({ status: false, message: "password  not found.." })
                }
            } else {
                res.status(201).json({ status: false, message: "username or email is not found.." })
            }
        }
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error })
    }
}

// supervisor profile
exports.supervisorProfile = (req, res) => {
    try {
        res.status(200).json({ message: "supervicer profile is here", profile: req.user })
    } catch (error) {
        res.status(400).json({ message: "somthing went wrong..", error });
    }
}

//update profile
exports.updateProfile = async (req, res) => {
    try {
        const supervisorId = req.params.id;
        const updateData = req.body;
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 7);
        }
        const updatedSupervisor = await supervisor.findByIdAndUpdate(supervisorId, updateData);

        if (updatedSupervisor) {
            res.status(200).json({
                status: true, message: "supervisor profile updated successfully", updatedData: updatedSupervisor
            });
        } else {
            res.status(404).json({ status: false, message: "supervisor not found" });
        }
    } catch (error) {
        res.status(400).json({ status: false, message: "something went wrong", error: error });
    }
};

//forget password for supervisor
exports.forgetPassword = async (req, res) => {
    try {
        const adminData = await supervisor.findOne({ email: req.body.email });
        if (!adminData)
            return res.status(201).json({ forget: false, message: "Email is invalid" });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await supervisor.findByIdAndUpdate(adminData._id, {
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
            to: adminData.email,
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
        res.status(400).json({ message: "Something went wrong", error });
    }
};

// password reset 
exports.resetPassword = async (req, res) => {
    try {
        const { email, new_password } = req.body;
        const user = await supervisor.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(new_password, 7);
        await supervisor.updateOne({ email, password: hashedPassword });

        res.status(200).json({ status: true, msg: "password reset successful" });
    } catch (err) {
        res.status(400).json({ status: false, msg: "something went wrong", error: err });
    }
};

// update status supervisor
exports.updateStatus = async (req, res) => {
    try {
        const supervisorData = await supervisor.findById(req.body.id);

        if (!supervisorData) {
            res.status(200).json({ status: false, msg: "supervisor not found" });
        }
        supervisorData.status = !supervisorData.status;
        const updateStatus = await supervisor.findByIdAndUpdate(req.body.id, {
            status: supervisorData.status
        });
        updateStatus
            ? res
                .status(200)
                .json({ status: true, msg: "supervisor Status is changed..." })
            : res
                .status(200)
                .json({ status: false, msg: "supervisor Status is not changed..." });
    } catch (e) {
        res.status(400).json({ msg: "Something went wrong...", error: e });
    }
};

//allHostes
exports.allHostes = async (req, res) => {
    try {
        const all = await hostes.find({});
        res.json({ message: "Aall hostess", data: all });
    } catch (err) {
        res.status(400).json({ message: "failed to fetch Hostess" });
    }
}

// create new hostess
exports.createHostess = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 7);
        req.body.password = hashedPassword;
        const hostess = await hostes.create(req.body);
        res.status(201).json({ success: true, data: hostess });
    } catch (err) {
        res.status(400).json({ success: false, message: 'hostess create failed' });
    }
};

