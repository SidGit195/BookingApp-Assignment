const Booking = require('../models/Booking');
const Activity = require('../models/Activity');

exports.getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({userId: req.user._id});

        res.status(200).json(bookings);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}

exports.bookActivity = async (req, res) => {
    try {
        const { activityId } = req.body;

        const activity = await Activity.findById(activityId);
        if(!activity){
            return res.status(404).json({msg: 'No such activity found'});
        }

        let booking = await Booking.findOne({
            userId: req.user._id,
            activityId
        });

        if(booking){
            return res.status(400).json({msg: 'You already booked this activity'});
        }

        booking = new Booking({userId: req.user.id, activityId});
        await booking.save();

        res.status(201).json({msg: 'Booking Done', booking});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}