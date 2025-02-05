const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).send({ message: 'Username already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send({ message: 'Error logging in' });
    }
};

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).send({ message: 'No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).send({ message: 'User not found' });

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid token' });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send({ message: 'User not found' });

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.status(200).send({ message: 'Settings updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating settings' });
    }
};
