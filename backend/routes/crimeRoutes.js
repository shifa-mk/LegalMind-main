const express = require('express');
const router = express.Router();
const { getCrimeStats } = require('../controllers/crime.controller');

router.get('/stats', getCrimeStats);

module.exports = router;
