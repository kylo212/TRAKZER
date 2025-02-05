const User = require('../models/User');

exports.updateSettings = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username) {
            req.user.username = username;
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.user.password = hashedPassword;
        }

        await req.user.save();
        res.status(200).send({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating settings' });
    }
};
