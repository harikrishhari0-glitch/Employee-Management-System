const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, email, role, firstName, lastName }
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'HR') {
        return res.status(403).json({ success: false, message: 'Access denied: Admin/HR only' });
    }
    next();
};

module.exports = { authMiddleware, adminOnly };
