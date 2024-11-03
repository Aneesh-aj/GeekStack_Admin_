require('dotenv').config();
module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    refreshSecret: process.env.REFRESH_SECRET,
    jwtExpiration: '15m',
    refreshExpiration: '7d',
};
