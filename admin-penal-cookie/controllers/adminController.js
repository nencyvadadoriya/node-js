const admin = require('../models/adminModel');
const nodemailer = require('nodemailer');
const fs = require('fs');

// login page
const loginPage = (req, res) => {
    try {
        if (req.cookies.admin === undefined) {
            const success = req.flash('success');
            const error = req.flash('error');
            res.render('login', { success, error });
        } else {
            res.redirect('/dashboard');
        }
    } catch (error) {
        res.send(`<h2> Something went wrong: ${error.message} </h2>`);
    }
};

// logout
const logout = (req, res) => {
    res.clearCookie('admin');
    res.redirect('/');
};


// ====================== password logic=======================================

// lost password
const lostPasswordPage = (req, res) => {
    const success = req.flash('success');
    const error = req.flash('error');
    res.render('admin/lostPasswordPage', { success, error });
};

//veryfiy otp
const otpVerifyPage = (req, res) => {
    const success = req.flash('success');
    const error = req.flash('error');
    res.render('admin/otpVerifyPage', { success, error });
};

//check email
const checkEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const data = await admin.findOne({ email });
        const otp = Math.floor(100000 + Math.random() * 900000);
        if (data) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "vadadoriyanency8@gmail.com",
                    pass: "gujjjyghriupzodb",
                },
            });

            const mailOptions = {
                from: '"Admin Panel" vadadoriyanency8@gmail.com',
                to: email,
                subject: "OTP for Password Reset",
                html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 500px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px;">
            <h2 style="color: #333333;">Password Recovery OTP</h2>
            <p style="color: #555555;">Dear user,</p>
            <p style="color: #555555;">
              We received a request to reset your password. Please use the following One-Time Password (OTP) to proceed:
            </p>
            <div style="background-color: #f0f8ff; border: 2px dashed #007bff; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; color: #007bff; margin: 20px 0; border-radius: 5px;">
              ${otp}
            </div>
            <p style="color: #555555;"> Do not share it with anyone.</p>
            <p style="color: #555555;">If you did not request this, please ignore this email.</p>
            <p style="color: #777777; font-size: 14px; margin-top: 30px;">— Nency vadadoriya</p>
          </div>
        </div>
      `
            };

            await transporter.sendMail(mailOptions);

            res.cookie("otp", otp);
            res.cookie("email", email);
            req.flash("success", "OTP sent successfully to your email.");
            res.redirect("/otpVerifyPage");
        } else {
            req.flash("error", "Email ID is not found.");
            res.redirect("/lostPasswordPage");
        }
    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong.");
        res.redirect("/lostPasswordPage");
    }
};

const checkOtp = (req, res) => {
    const userOtp = req.body.otp;
    const storedOtp = req.cookies.otp;
    if (userOtp == storedOtp) {
        res.redirect("/newSetPassword");
    } else {
        req.flash("error", "Invalid OTP");
        res.redirect("/otpVerifyPage");
    }
};

// Show set new password page
const newsetpassword = (req, res) => {
    const success = req.flash('success');
    const error = req.flash('error');
    res.render('admin/newSetPassword', { success, error });
};

// Check  new password
const checknewpassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    const email = req.cookies.email;

    if (!email) {
        req.flash('error', 'Session expired. Please try again.');
        return res.redirect('/newSetPassword');
    }

    if (newPassword !== confirmPassword) {
        req.flash('error', 'Passwords do not match.');
        return res.redirect('/newSetPassword');
    }

    try {
        const user = await admin.findOne({ email });
        if (!user) {
            req.flash('error', 'User not found.');
            return res.redirect('/newSetPassword');
        }

        await admin.findByIdAndUpdate(user._id, { password: newPassword });
        res.clearCookie('email');
        res.clearCookie('otp');
        req.flash('success', 'Password changed successfully. Please login.');
        return res.redirect('/'); 
    } catch (err) {
        req.flash('error', 'Something went wrong. Please try again.');
        return res.redirect('/newSetPassword');
    }
};


// user checked
const userChecked = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await admin.findOne({ email: email });
        if (user) {
            if (user.password == password) {
                console.log("Login Successfully...");

                res.cookie('admin', user);
                res.cookie('loginSuccess', 'true', { maxAge: 60000 });

                res.redirect('/dashbord');
            } else {
                console.log("Password not matched.");
                res.redirect('/');
            }
        } else {
            console.log("Email not matched");
            res.redirect('/');
        }
    } catch (e) {
        res.send(`<p> Not Found : ${e} </p>`);
    }
};

// change password
const changePassword = (req, res) => {
    try {
        const currentAdmin = req.cookies.admin;
        if (currentAdmin != undefined) {
            res.render('admin/changepassword', { currentAdmin });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
}

// change my password
const changemypassword = async (req, res) => {
    console.log(req.body);
    try {
        const { oldpassword, newpassword, confimpassword } = req.body;
        const adminData = req.cookies.admin;

        if (oldpassword === adminData.password) {
            if (newpassword !== adminData.password) {
                if (newpassword === confimpassword) {
                    try {
                        const isUpdate = await admin.findByIdAndUpdate(adminData._id, { password: newpassword });
                        if (isUpdate) {
                            console.log("Password updated...", isUpdate);
                            res.clearCookie('admin');
                            res.redirect('/');
                        } else {
                            console.log("Password not updated");
                            res.redirect('/changepassword');
                        }
                    } catch (e) {
                        res.send(`<h2> Not Found : ${e} </h2>`);
                    }
                } else {
                    res.redirect('/changepassword');
                }
            } else {
                res.redirect('/changepassword');
            }
        } else {
            console.log("Password is incorrect");
            res.redirect('/changepassword');
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
}


// =============== admin profile logic =======================================
// View Profile 
const viewProfile = (req, res) => {
    try {
        const currentAdmin = req.cookies.admin;
        if (currentAdmin != undefined) {
            res.render('admin/profile', { currentAdmin });
        } else {
            res.redirect('/');
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
}

//update profile logic
const updateProfile = async (req, res) => {
    try {
        const currentAdmin = req.cookies.admin;
        res.render('admin/updateprofile', { currentAdmin });
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
};

//edit profile logic
const editProfile = async (req, res) => {
    const currentAdmin = req.cookies.admin;
    const id = currentAdmin._id;
    console.log("Id", id);
    console.log("Profile Page", req.body);
    try {
        const updatedAdmin = await admin.findByIdAndUpdate(id, req.body);
        console.log("Updated Data : ", updatedAdmin);
        if (updatedAdmin) {
            res.cookie('admin', updatedAdmin);
            res.redirect('/dashbord');
        } else {
            res.redirect('/updateprofile');
        }
    } catch (error) {
        res.send(`<h2> Not found: ${error} </h2>`);
    }
};

//===================views all pages ================================


// dashboard page
const DashbordPage = (req, res) => {
    try {
        if (!req.cookies.admin) {
            res.redirect('/')
        };
        const currentAdmin = req.cookies.admin;
        const loginSuccess = req.cookies.loginSuccess;
        res.clearCookie('loginSuccess');
        res.render('dashbord', { currentAdmin, loginSuccess });
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
};

// add admin page
const addAdminPage = (req, res) => {
    try {
        if (req.cookies.admin == undefined) {
            res.redirect('/');
        } else {
            const currentAdmin = req.cookies.admin;
            const adminSuccess = req.cookies.adminSuccess;
            res.clearCookie('adminSuccess');
            res.render('admin/addAdmin', { currentAdmin, adminSuccess });
        }
    } catch (error) {
        res.send(`<h2> Not found : ${error.message} </h2>`);
    }
};

// view admin table
const viewAdminPage = async (req, res) => {
    try {

        let records = await admin.find({});
        const currentAdmin = req.cookies.admin;
        records = records.filter((data) => data.id != currentAdmin._id);
        if (req.cookies.admin == undefined) {
            return res.render('login');
        }
        res.render('admin/viewAdminPage', { records, currentAdmin });
    } catch (error) {
        res.send(`<h2> Not found : ${error} </h2>`);
    }
};

//==============================   crud opretion logic  =================================

// insert admin
const insertAdmin = async (req, res) => {
    try {
        req.body.avatar = req.file.path;
        const insert = await admin.create(req.body);
        if (insert) {
            console.log('admin data inserted..')
        }
        else {
            console.log('admin data not inserted..')
        }
        res.cookie('adminSuccess', true);
        res.redirect('/addAdmin');
    } catch (error) {
        res.send(`<h2> not found : ${error} </h2>`);
    }
};

// delete admin
const DeleteAdmin = async (req, res) => {
    const DeleteId = req.params.DeleteId;
    try {
        const data = await admin.findByIdAndDelete(DeleteId);
        if (data && data.avatar) {
            fs.unlinkSync(data.avatar);
        }
        res.redirect('/viewAdmin');
    } catch (error) {
        res.send(`<h2> not found : ${error} </h2>`);
    }
};

// update admin form
const UpdateAdmin = async (req, res) => {
    const UpdateId = req.query.id;
    try {
        const data = await admin.findById(UpdateId);
        if (data) {
            const currentAdmin = req.cookies.admin;
            res.render('admin/updateadmin', { data, currentAdmin });
        } else {
            res.redirect('/viewAdmin');
        }
    } catch (error) {
        res.send(`<h2> Not found: ${error} </h2>`);
    }
};

// edit admin post
const editAdmin = async (req, res) => {
    const editId = req.params.editId;
    try {
        const data = await admin.findById(editId);

        if (req.file) {
            if (data.avatar)
                fs.unlinkSync(data.avatar);
            req.body.avatar = req.file.path;
        } else {
            req.body.avatar = data.avatar;
        }

        await admin.findByIdAndUpdate(editId, req.body);
        res.redirect('/viewAdmin');
    } catch (error) {
        res.send(`<h2> Not found: ${error} </h2>`);
    }
};

module.exports = {
    loginPage,
    logout,
    userChecked,
    lostPasswordPage,
    checkEmail,
    otpVerifyPage,
    checkOtp,
    newsetpassword,
    checknewpassword,
    changePassword,
    changemypassword,
    viewProfile,
    updateProfile,
    editProfile,
    DashbordPage,
    addAdminPage,
    viewAdminPage,
    insertAdmin,
    DeleteAdmin,
    UpdateAdmin,
    editAdmin,
};