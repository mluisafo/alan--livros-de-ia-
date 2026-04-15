const express = require('express');
const router = express.Router();
const path = require('path');
const { generatePDF } = require('../controllers/pdfController');

router.post('/generate', async (req, res) => {
  try {
    const { title, author, content, coverImage } = req.body;

    if (!title || !author || !content) {
      return res.status(400).json({
        error: 'Título, autor e conteúdo são obrigatórios',
      });
    }

    const timestamp = Date.now();
    const filename = `${title.replace(/\s+/g, '_')}_${timestamp}.pdf`;
    const outputPath = path.join(__dirname, '../outputs', filename);

    const result = await generatePDF(title, author, content, coverImage, outputPath);

    if (result.success) {
      res.json({
        success: true,
        message: 'PDF gerado com sucesso!',
        filename: filename,
        path: outputPath,
      });
    } else {
      res.status(500).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
