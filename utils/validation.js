const { body, validationResult } = require('express-validator');

// validation for registration
exports.validateRegister = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Please provide a valid email'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 character long')
];


// validation for user login
exports.validateLogin = [
    body('email').trim().isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

// validation for Activity
exports.validateActivity = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('dateTime').isISO8601().withMessage('Please provide a valid date and time')
];


// middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.error(errors);
        return res.status(400).json({msg: 'Validation Error'});
    }

    next();
};