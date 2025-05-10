const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log('mongodb is connected successfully');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;