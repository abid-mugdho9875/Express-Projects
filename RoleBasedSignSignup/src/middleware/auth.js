const jwt = require('jsonwebtoken');
const SECRETKEY = "NOTESAPI";

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRETKEY);
            req.userId = user.id;
            next();
        } else {
            return res.status(401).json({ message: 'Token is missing in the request headers' });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(401).json({ message: 'Invalid token or authentication error' });
    }
}

module.exports = auth;