const User = require('../models/User');

exports.saveLocation = async (req, res) => {
  const { lat, lng } = req.body;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return res.status(400).json({ message: 'Invalid location data' });
  }

  try {
    const user = await User.findById(req.user);
    user.location = { lat, lng };
    await user.save();
    res.status(200).json({ message: 'Location saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving location', error });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const users = await User.find({ location: { $exists: true } });
    const locations = users.map(user => ({
      lat: user.location.lat,
      lng: user.location.lng,
    }));
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations', error });
  }
};
