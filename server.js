require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes')
const activityRoutes = require('./routes/activityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

connectDB();

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
    res.json({msg: "Welcome to Activity Booking API"});
});


// routes
app.use("/api/auth", authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/bookings', bookingRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({msg: 'Server Error'});
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));