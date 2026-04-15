const express = require('express');
const router = express.Router();
const { generateStory } = require('../controllers/storyController');

router.post('/generate', async (req, res) => {
  try {
    const { description, pages } = req.body;

    if (!description || !pages) {
      return res.status(400).json({
        error: 'Descrição e número de páginas são obrigatórios',
      });
    }

    if (pages < 200 || pages > 400) {
      return res.status(400).json({
        error: 'O livro deve ter entre 200 e 400 páginas',
      });
    }

    const result = await generateStory(description, pages);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
