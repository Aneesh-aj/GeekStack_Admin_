const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const cors = require('cors');
require('dotenv').config()

const authRoutes = require('./route/authRoute');
const adminRoute = require("./route/adminRoute")


const app = express();
const port = 3000;

console.log(" port ",process.env.CORS_ORIGIN)

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*", 
    credentials: true 
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



mongoose.connect(process.env.mongodb)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));
console.log(" hdhd")
app.use('/auth', authRoutes);
app.use("/admin", adminRoute)


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
