const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                res.status(403).json({ error: 'Invalid token' });
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Token not provided' });
    }
}
module.exports={
    auth
}