const restrict = (req, res, next) => {
    if (req.cookies.admin) {
        return res.redirect('/dashbord'); 
    }
    next();
};


module.exports = restrict;

