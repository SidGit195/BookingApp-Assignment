const express = require('express');
const router = express();
const protect = require('../middlewares/authMiddlewares');
const {getMyBookings, bookActivity} = require('../controllers/bookingControllers');

router.get("/me", protect, getMyBookings);

router.post("/", protect, bookActivity);

module.exports = router;