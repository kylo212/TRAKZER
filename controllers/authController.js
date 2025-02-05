const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.updateSettings = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).send({ message: 'User not found' });

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.status(200).send({ message: 'Settings updated successfully' });
    } catch {
        res.status(500).send({ message: 'Error updating settings' });
    }
};
