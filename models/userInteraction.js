const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  interactionType: { type: String, enum: ['like', 'comment', 'share'], required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserInteraction = mongoose.model('UserInteraction', userInteractionSchema);

module.exports = UserInteraction;
