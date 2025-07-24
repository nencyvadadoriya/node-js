const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    let token = req.header("Authorization");
    if (!token) {
        res.status(401).json({ status: false, error: "Auth is required" });
    }

    try {
        token = token.slice(7, token.length);
        let decode = jwt.verify(token, process.env.SCERET);
        req.user = decode;
        next();
    } catch (e) {
        res.status(401).json({ status: false, error: "Token is invalid" });
    }
};

module.exports = auth; 