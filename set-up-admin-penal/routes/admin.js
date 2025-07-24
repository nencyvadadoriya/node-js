const express = require('express');
const route = express.Router();
const controllers = require('../controllers/adminController');
const adminModel = require('../models/adminModel');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const upload = require('../middelware/adminMulter')

console.log("Routing...");

//==================== login && logout logics =========================
route.get('/', controllers.loginPage);
route.post('/login', controllers.userChecked);
route.get('/logout', controllers.logout);

// ===================== password logics  =========================
route.get('/lostPasswordPage', controllers.lostPasswordPage);
route.post('/verifyOtp', controllers.checkEmail);
route.get('/otpVerifyPage', controllers.otpVerifyPage);
route.post('/checkOtp', controllers.checkOtp);
route.get('/newSetPassword', controllers.newsetpassword);
route.post('/checknewpassword', controllers.checknewpassword);
route.get('/changePassword', controllers.changePassword);
route.post('/changemypassword', controllers.changemypassword); 

//dashbord page
route.get('/dashbord', controllers.DashbordPage);

// =================== admin pages and logic =========================
route.get('/addAdmin', controllers.addAdminPage);
route.get('/viewAdmin', controllers.viewAdminPage);
route.get('/viewProfile', controllers.viewProfile);
route.get('/updateProfile',upload.single('avatar'), controllers.updateProfile);
route.post('/editProfile',upload.single('avatar'),controllers.editProfile);

// ============crud opration=================
route.post('/insert', upload.single('avatar'),controllers.insertAdmin)
route.get('/delete-addmin/:DeleteId', controllers.DeleteAdmin);
route.get('/updateAdmin', upload.single('avatar'), controllers.UpdateAdmin);
route.post('/editAdmin/:editId', upload.single('avatar'), controllers.editAdmin);


// ================ passport logic ========================
passport.use(new passportLocal({
    usernameField: "email"
}, async function (email, password, done) {
    try {
        const adminData = await adminModel.findOne({ email: email });
        if (adminData) {
            if (adminData.password === password) {
                return done(null, adminData);
            } else {
                return done(null, false, { message: "Incorrect password" });
            }
        } else {
            return done(null, false, { message: "No user found" });
        }
    } catch (err) {
        return done(err);
    }
}));

// ================= serializeUser called =================
passport.serializeUser(function (adminData, done) {
    console.log('---------------------');
    console.log('serializeUser is called...');
    console.log('---------------------');
    done(null, adminData.id);
});

// ======================= deserializeUser is called =======================
passport.deserializeUser(async function (id, done) {
    try {
        const authadmin = await adminModel.findById(id);
        if (authadmin) {
            console.log('---------------------');
            console.log('deserializeUser is called...');
            console.log('---------------------');
            done(null, authadmin);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err, false);
    }
});

module.exports =  route ,  passport;