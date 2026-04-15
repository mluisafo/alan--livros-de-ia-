# 📚 Gerador de Livros com IA

Um software completo para criar histórias completas usando IA, com correção ortográfica automática, geração de capas e exportação para PDF.

## 🚀 Características

✅ **Geração de Histórias com IA** - Crie histórias completas baseadas em descrições  
✅ **Gerador de Ideias Criativas** - Receba sugestões de histórias únicas e inspiradoras  
✅ **Expansão de Ideias** - Develop suas ideias com detalhes de personagens, trama e cenários
✅ **Correção Ortográfica Automática** - Verifica e corrige erros de português  
✅ **Gerador de Capas Inteligentes** - Cria capas coerentes com o tema do livro  
✅ **Exportação para PDF** - Salve seu livro completo em PDF profissional  
✅ **Interface Intuitiva** - Navegação por abas com 6 etapas simples  
✅ **Customização Completa** - Edite o texto livremente antes de exportar  

## 📋 Requisitos

- Node.js 14+ 
- npm ou yarn
- Chave de API do OpenAI (para geração de histórias e capas)

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/alan--livros-de-ia-.git
cd alan--livros-de-ia-
```

### 2. Instale as dependências do backend
```bash
cd backend
npm install
cd ..
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave de API do OpenAI:
```
OPENAI_API_KEY=sk-seu_token_aqui
PORT=3000
NODE_ENV=development
```

**Como obter a chave de API do OpenAI:**
1. Acesse [OpenAI API](https://platform.openai.com/api-keys)
2. Faça login ou crie uma conta
3. Crie uma nova chave de API
4. Cole a chave no arquivo `.env`

## 🎯 Como usar

### 1. Inicie o servidor
```bash
cd backend
npm start
```

O servidor iniciará em `http://localhost:3000`

### 2. Acesse a aplicação
Abra seu navegador e acesse:
```
http://localhost:3000
```

### 3. Siga os 6 passos:

#### Passo 0: Gerador de Ideias ✨
- Escolha um gênero ou deixe em branco
- Gere de 3 a 10 ideias criativas
- Expanda ideias para mais detalhes
- Use a ideia para criar sua história

#### Passo 1: Descreva sua História
- Título do livro
- Seu nome (autor)
- Gênero/Tema (Fantasia, Romance, Mistério, etc)
- Descrição detalhada da história
- Número de páginas (200-400)

#### Passo 2: Gere a História
- Clique em "Gerar História"
- Aguarde a IA gerar a narrativa completa

#### Passo 3: Corrija e Refine
- Use "Verificar Ortografia" para correções automáticas
- Edite manualmente o texto se desejar

#### Passo 4: Gere a Capa
- Escolha entre capa com IA (DALL-E) ou capa simples
- A capa será gerada automaticamente

#### Passo 5: Exporte como PDF
- Revise o resumo do livro
- Clique em "Gerar e Fazer Download do PDF"
- Seu livro será baixado automaticamente

## 📁 Estrutura do Projeto

```
alan--livros-de-ia-/
├── backend/
│   ├── controllers/          # Lógica da aplicação
│   │   ├── ideasController.js      # Gerador de ideias (NOVO!)
│   │   ├── storyController.js      # Geração de histórias
│   │   ├── spellCheckController.js # Correção ortográfica
│   │   ├── coverController.js      # Geração de capas
│   │   └── pdfController.js        # Exportação para PDF
│   ├── routes/               # Rotas da API
│   │   ├── ideas.js                # Rotas de ideias (NOVO!)
│   │   ├── story.js
│   │   ├── spellcheck.js
│   │   ├── cover.js
│   │   └── pdf.js
│   ├── utils/                # Funções utilitárias
│   ├── server.js             # Servidor principal
│   └── package.json          # Dependências
├── frontend/
│   ├── index.html            # Interface principal
│   ├── styles/
│   │   └── style.css         # Estilos
│   └── scripts/
│       └── app.js            # Lógica frontend
├── .env.example              # Variáveis de ambiente
├── GUIA_GERADOR_IDEIAS.md   # Guia do gerador de ideias (NOVO!)
└── README.md
```

## 🔌 API Endpoints

### Ideas API (NOVO!)
```
POST /api/ideas/generate
{
  "theme": "Fantasia" ou null,
  "quantity": 5
}

POST /api/ideas/refine
{
  "idea": "Descrição da ideia"
}

POST /api/ideas/prompt
{
  "idea": "Descrição da ideia",
  "pages": 300,
  "theme": "Fantasia"
}
```

### Story API
```
POST /api/story/generate
{
  "description": "Descrição da história",
  "pages": 300
}
```

### Spell Check API
```
POST /api/spellcheck/check
{
  "text": "Texto a ser corrigido"
}
```

### Cover API
```
POST /api/cover/generate
{
  "title": "Título do livro",
  "description": "Descrição",
  "theme": "fantasy",
  "author": "Nome do autor"
}

POST /api/cover/simple
{
  "title": "Título do livro",
  "author": "Nome do autor",
  "theme": "fantasy"
}
```

### PDF API
```
POST /api/pdf/generate
{
  "title": "Título do livro",
  "author": "Nome do autor",
  "content": "Conteúdo do livro",
  "coverImage": "URL ou base64 da imagem"
}
```

## ⚙️ Configuração Avançada

### Usar modelo GPT-4 (para histórias melhores)
Edite `backend/controllers/storyController.js` e altere:
```javascript
model: 'gpt-4' // ao invés de 'gpt-3.5-turbo'
```

### Alterar limite de páginas
Edite `backend/routes/story.js`:
```javascript
if (pages < 150 || pages > 500) { // Altere os limites
  return res.status(400).json({
    error: 'O livro deve ter entre 150 e 500 páginas',
  });
}
```

### Adicionar mais idiomas
Edite `backend/controllers/spellCheckController.js` e altere:
```javascript
language: 'pt-BR' // altere para seu idioma
```

## 🐛 Solução de Problemas

### "Erro: OPENAI_API_KEY não encontrada"
- Verifique se o arquivo `.env` existe
- Certifique-se de que sua chave de API está correta
- Reinicie o servidor após editar `.env`

### "Erro ao gerar história"
- Verifique se sua chave de API tem créditos suficientes
- Use `gpt-3.5-turbo` para menores custos
- Verifique a conexão com a internet

### "Capa não está gerando"
- DALL-E requer créditos adicionais na OpenAI
- Use a opção "Capa Simples" como fallback
- Verifique as limitações da sua conta OpenAI

### "PDF não está gerando"
- Verifique se o conteúdo não está vazio
- Certifique-se de que há espaço em disco
- Verifique permissões de arquivo na pasta `outputs/`

## 📊 Custos Estimados

- **Geração de História**: ~$0.02 - $0.10 por livro (GPT-3.5-turbo)
- **Correção Ortográfica**: Gratuita (LanguageTool API)
- **Geração de Capa com IA**: ~$0.04 - $0.30 por livro (DALL-E)
- **PDF**: Gratuito

## 🔐 Segurança

- Nunca compartilhe sua chave de API
- Use `.env` para armazenar chaves secretas
- Implemente autenticação para ambiente de produção

## 📝 Licença

Este projeto está sob licença MIT. Veja LICENSE para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📧 Suporte

Se tiver dúvidas, abra uma issue no GitHub ou entre em contato.

---

**Desenvolvido com ❤️ para criadores de histórias**