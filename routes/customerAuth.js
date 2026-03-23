const express = require('express');
const router = express.Router();
const customerAuth = require('../middleware/customerAuth');
const { register, login, getProfile } = require('../controllers/customerAuthController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', customerAuth, getProfile);

module.exports = router;
