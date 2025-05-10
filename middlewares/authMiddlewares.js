const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        // get token from header
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({msg: 'token not found, authorization denied'});
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // FIND User
        const user = await User.findById(decoded.userId).select('-password');
        if(!user){
            res.status(404).json({msg: 'User not found'});
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({msg: 'Token in not valid'});
    }
}
