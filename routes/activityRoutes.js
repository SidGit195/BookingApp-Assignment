const express = require('express');
const router = express();
const {getActivity, createActivity} = require('../controllers/activityControllers');
const protect = require('../middlewares/authMiddlewares');
const { validateActivity, handleValidationErrors } = require('../utils/validation');

router.post('/', protect, validateActivity, handleValidationErrors, createActivity);

router.get('/:id', protect, getActivity);

module.exports = router;