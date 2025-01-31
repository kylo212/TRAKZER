const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const authenticate = require('../middleware/authenticate');

router.post('/save-location', authenticate, locationController.saveLocation);
router.get('/get-locations', authenticate, locationController.getLocations);

module.exports = router;
