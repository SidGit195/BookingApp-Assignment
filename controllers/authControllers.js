const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const {name, email, phone, password} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'user already exist'});
        }

        user = new User({name, email, phone, password});
        await user.save();

        res.status(201).json({msg: 'User created successfully'});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({msg: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({msg: 'Invalid credentials'});
        }

        const token = await jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({msg: 'login successfull', token});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server Error'});
    }
}