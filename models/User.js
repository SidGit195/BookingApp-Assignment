const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true, 
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// hash the password before save
userSchema.pre('save', async function (next) {
    try {
        if(!this.isModified('password')) return next();                      // if password not modified no need to hash

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error(error.message);
        next(error);
    }
})

module.exports = mongoose.model('User', userSchema);