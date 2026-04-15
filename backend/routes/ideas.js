const express = require('express');
const router = express.Router();
const { generateIdeas, refineIdea, generatePrompt } = require('../controllers/ideasController');

router.post('/generate', async (req, res) => {
  try {
    const { theme, quantity } = req.body;

    const result = await generateIdeas(theme, quantity || 5);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/refine', async (req, res) => {
  try {
    const { idea } = req.body;

    if (!idea) {
      return res.status(400).json({
        error: 'Ideia é obrigatória',
      });
    }

    const result = await refineIdea(idea);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/prompt', async (req, res) => {
  try {
    const { idea, pages, theme } = req.body;

    if (!idea) {
      return res.status(400).json({
        error: 'Ideia é obrigatória',
      });
    }

    const result = await generatePrompt(idea, pages || 300, theme || 'Gênero aberto');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
