const express = require('express');
const UserInteraction = require('../models/userInteraction');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/interact', authenticate, async (req, res) => {
  const { postId, interactionType } = req.body;

  if (!postId || !interactionType) {
    return res.status(400).json({ message: 'Post ID and interaction type are required' });
  }

  if (!['like', 'comment', 'share'].includes(interactionType)) {
    return res.status(400).json({ message: 'Invalid interaction type' });
  }

  try {
    const interaction = new UserInteraction({
      userId: req.userId,
      postId,
      interactionType,
    });

    await interaction.save();
    res.status(201).json({ message: 'Interaction recorded successfully', interaction });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record interaction', error });
  }
});

module.exports = router;
