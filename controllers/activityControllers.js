const Activity = require('../models/Activity');

exports.getActivity = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);

        if(!activity){
            return res.status(404).json({msg: 'No such Activity found'});
        }

        res.status(200).json(activity);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}

exports.createActivity = async (req, res) => {
    try {
        const {title, description, location, dateTime} = req.body;

        const activity = new Activity({title, description, location, dateTime});
        await activity.save();

        res.status(201).json({msg: 'Activity created successfully', activity});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}