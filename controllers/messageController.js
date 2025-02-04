const Message = require('../models/Message');

const createMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;

        if (!senderId || !receiverId || !content) {
            return res.status(400).json({ message: 'Sender ID, Receiver ID, and content are required.' });
        }

        const newMessage = new Message({ senderId, receiverId, content });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending message' });
    }
};

const getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.query;

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: 'Both sender ID and receiver ID are required.' });
        }

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
};

module.exports = { createMessage, getMessages };
