const jwt = require('jsonwebtoken');
const Admin = require('../model/adminModel');
const config = require('../config');
const bcrypt = require('bcryptjs'); 

async function register(req, res) {
    try {
        const { email, password } = req.body;

        const newPassword = await bcrypt.hash(password, 10);

        const user = new Admin({ email, password: newPassword, role: { value: 1, admin: "superAdmin" } });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error); 
        res.status(400).json({ error: 'User registration failed' });
    }
}


function generateAccessToken(adminId) {
    console.log(" here")
    return jwt.sign({ admin: adminId }, config.jwtSecret, { expiresIn: config.jwtExpiration });
}

function generateRefreshToken(adminId) {
    console.log(" here")
    return jwt.sign({ admin: adminId }, config.refreshSecret, { expiresIn: config.refreshExpiration }); // e.g., 7d
}

async function login(req, res) {
    try {
        
        console.log("Request received: ", req.body, req.params, req.query);
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        console.log(admin);

        if (!admin || !(await admin.comparePassword(password))) {
            console.log( " invalid credential")
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const accessToken = generateAccessToken(admin._id);
        const refreshToken = generateRefreshToken(admin._id);

        console.log("Tokens generated: ", { accessToken, refreshToken });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure:false, 
            sameSite: 'Strict',
            
            
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure:false, 
            sameSite: 'Strict',
        });


        res.json({
            accessToken,
            refreshToken,
            id: admin._id,
            role: admin.role,
            email: admin.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
}


module.exports = { login, register };
