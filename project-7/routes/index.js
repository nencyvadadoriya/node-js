const express = require('express');
const route = express.Router();
const controllers = require('../controller/adminController');
const upload = require('../middelware/adminMulter');

const passport = require('../middelware/authentication')

console.log("Routing...");

//==================== login && logout logics =========================
route.get('/',passport.checkLostPasswordAuthentication,  controllers.loginPage);
route.post('/login', passport.authenticate('local', { failureRedirect: '/' }), controllers.userChecked);
route.get('/logout', controllers.logout);

// ===================== password logics  =========================
route.get('/lostPasswordPage',  passport.checkLostPasswordAuthentication,  controllers.lostPasswordPage);
route.post('/verifyOtp',  controllers.checkEmail);
route.get('/otpVerifyPage', passport.checkLostPasswordAuthentication,  controllers.otpVerifyPage);
route.post('/checkOtp',  controllers.checkOtp);
route.get('/newSetPassword',passport.checkLostPasswordAuthentication,  controllers.newsetpassword);
route.post('/checknewpassword',  controllers.checknewpassword);

// ============= change password admin =========================
route.get('/changePassword', passport.checkAuthentication, controllers.changePassword);
route.post('/changemypassword', controllers.changemypassword); 

//dashbord page
route.get('/homepage',passport.checkAuthentication, controllers.homepage);

// =================== admin pages and logic =========================
route.get('/addAdmin',passport.checkAuthentication, controllers.addAdminPage);
route.get('/viewAdmin',passport.checkAuthentication, controllers.viewAdminPage);
route.get('/viewProfile', passport.checkAuthentication, controllers.viewProfile);
route.get('/updateProfile',passport.checkAuthentication, upload.single('image'), controllers.updateProfile);
route.post('/editProfile',upload.single('image'),controllers.editProfile);

// ============crud opration=================
route.post('/insert', upload.single('image'),controllers.insertAdmin)
route.get('/delete-addmin/:DeleteId',passport.checkAuthentication, controllers.DeleteAdmin);
route.get('/updateAdmin', passport.checkAuthentication, controllers.UpdateAdmin);
route.post('/editAdmin/:editId', upload.single('image'), controllers.editAdmin);

module.exports =  route ,  passport;