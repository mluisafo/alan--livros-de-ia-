const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));

// Criar diretório de outputs se não existir
const fs = require('fs');
const outputDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Importar rotas
const storyRoutes = require('./routes/story');
const spellCheckRoutes = require('./routes/spellcheck');
const coverRoutes = require('./routes/cover');
const pdfRoutes = require('./routes/pdf');
const ideasRoutes = require('./routes/ideas');
const { start } = require('repl');

// Usar rotas
app.use('/api/story', storyRoutes);
app.use('/api/spellcheck', spellCheckRoutes);
app.use('/api/cover', coverRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/ideas', ideasRoutes);

// Servir PDFs gerados
app.use('/downloads', express.static(path.join(__dirname, 'outputs')));

// Rota padrão
app.get('/', (req, res) => {npm start
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiKey: process.env.OPENAI_API_KEY ? 'configured' : 'not configured',
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
    status: err.status || 500,
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path,
  });
});

// Validar API Key
if (!process.env.OPENAI_API_KEY) {
  console.warn('⚠️ AVISO: OPENAI_API_KEY não está definida');
  console.warn('   Os recursos de IA não funcionarão sem ela.');
  console.warn('   Configure a chave em .env');
}

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║   📚 Gerador de Livros com IA         ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);
  console.log(`📖 Acesse: http://localhost:${PORT}`);
  console.log(`📊 Status: http://localhost:${PORT}/health`);
  console.log('');
  console.log(`🔑 API Key: ${process.env.OPENAI_API_KEY ? '✅ Configurada' : '❌ Não configurada'}`);
  console.log('');
});

module.exports = app;
