const express = require('express');
const router = express.Router();
const { checkSpelling } = require('../controllers/spellCheckController');

router.post('/check', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: 'Texto é obrigatório',
      });
    }

    const result = await checkSpelling(text);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
