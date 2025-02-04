const Message = require('../models/Message');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
    try {
        const { recipientId, content } = req.body;
        const senderId = req.user.id;

        if (!content) return res.status(400).json({ message: 'Message content is required' });

        const recipient = await User.findById(recipientId);
        if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

        const message = new Message({
            sender: senderId,
            recipient: recipientId,
            content,
            dateSent: new Date(),
        });

        await message.save();

        res.status(201).json({ message: 'Message sent successfully', message });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const userId = req.user.id;
        const { chatPartnerId } = req.query;

        const messages = await Message.find({
            $or: [
                { sender: userId, recipient: chatPartnerId },
                { sender: chatPartnerId, recipient: userId },
            ],
        }).sort({ dateSent: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user.id;

        const message = await Message.findById(messageId);
        if (!message) return res.status(404).json({ message: 'Message not found' });

        if (message.sender.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own messages' });
        }

        await message.remove();

        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
