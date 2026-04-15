const express = require('express');
const router = express.Router();
const { generateCover, createSimpleCover } = require('../controllers/coverController');

router.post('/generate', async (req, res) => {
  try {
    const { title, description, theme, author } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: 'Título e descrição são obrigatórios',
      });
    }

    const result = await generateCover(title, description, theme || 'default');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/simple', (req, res) => {
  try {
    const { title, author, theme } = req.body;

    if (!title) {
      return res.status(400).json({
        error: 'Título é obrigatório',
      });
    }

    const buffer = createSimpleCover(title, author, theme || 'default');
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
