const jwt = require('jsonwebtoken');
const SECRETKEY = "NOTESAPI";

const isAdmin = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            const decoded = jwt.verify(token, SECRETKEY);
            const role = decoded.role;
            console.log('User Role:', role);
            if (role === 'admin') {
                next();
            } else {
                return res.status(401).json({ message: 'You do not have the required role' });
            }
        } else {
            return res.status(401).json({ message: 'Token is missing in the request headers' });
        }
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(401).json({ message: 'Invalid token or authentication error' });
    }
}

module.exports = isAdmin;
