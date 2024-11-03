const jwt = require('jsonwebtoken');
const config = require('../config');

function generateAccessToken(userId) {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '15m' }); 
}

module.exports = (req, res, next) => {
    const accessToken = req.headers.authorization;
    const refreshToken = req.headers['x-refresh-token'];
    console.log( accessToken , refreshToken)
    console.log(req.cookies)

    if (!accessToken) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(accessToken, config.jwtSecret, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError' && refreshToken) {
                jwt.verify(refreshToken, config.refreshSecret, (err, decodedRefresh) => {
                    if (err) {
                        return res.status(401).json({ error: 'Refresh token is not valid' });
                    }
                    const newAccessToken = generateAccessToken(decodedRefresh.userId);
                    res.setHeader('x-new-access-token', newAccessToken); 

                    req.userId = decodedRefresh.userId;
                    next();
                });
            } else {
                return res.status(401).json({ error: 'Token is not valid' });
            }
        } else {
            req.userId = decoded.userId;
            next();
        }
    });
};
