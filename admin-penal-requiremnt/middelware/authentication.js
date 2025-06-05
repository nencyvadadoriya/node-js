const admin = require('../model/adminModel');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// passport
passport.use('local', new localStrategy({
    usernameField: 'email',
    passReqToCallback: true,
}, async function (req, email, password, done) {
    console.log(`Email: ${email}, Password: ${password}`);

    const adminData = await admin.findOne({ email: email });

    if (adminData) {
        if (adminData.password === password) {
            console.log('Login Successfully....');
            return done(null, adminData);
        } else {
            req.session.message = "Incorrect password";
            console.log('Wrong Password....');
            return done(null, false);
        }
    } else {
        req.session.message = "No user with that email";
        console.log('Wrong Email....');
        return done(null, false, { message: 'No user email found' });
    }
}));

// Serialize called
passport.serializeUser(function (admin, done) {
    console.log("Serialize is called....");
    return done(null, admin.id);
});

// Deserialize called
passport.deserializeUser(async function (id, done) {
    console.log("Deserialize is called....");
    const authAdmin = await admin.findById(id);

    if (authAdmin) {
        return done(null, authAdmin);
    } else {
        return done(null, false);
    }
});

// Check Login Middleware
passport.checkAuthentication = function (req, res, next) {
    console.log("Authenticate Middleware is called....");

    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
};

// check losspassword
passport.checkLostPasswordAuthentication = function (req, res, next) {
    console.log("Auth Middleware is called....");

    if (req.isAuthenticated()) {
        res.redirect('/homepage');
    } else {
        next();
    }
};

//currentadmin data
passport.currentAdmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.currentAdmin = req.user;
    }
    return next();
};

module.exports = passport;
