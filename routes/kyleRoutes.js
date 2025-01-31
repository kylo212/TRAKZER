const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/ask-kyle', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/gpt2',
      {
        inputs: message,
        parameters: {
          max_tokens: 50,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data[0] && response.data[0].generated_text) {
      const answer = response.data[0].generated_text.trim();
      res.status(200).json({ response: answer });
    } else {
      res.status(500).json({ message: 'No valid response from Hugging Face model' });
    }
  } catch (error) {
    console.error('Error communicating with Hugging Face:', error);
    res.status(500).json({ message: 'Error communicating with Kyle', error: error.message });
  }
});

module.exports = router;
