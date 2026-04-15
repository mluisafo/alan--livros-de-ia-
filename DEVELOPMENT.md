# Gerador de Livros com IA - Guia de Desenvolvimento

## Stack Tecnológico

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5 + CSS3 + JavaScript (Vanilla)
- **Banco de Dados**: Nenhum (aplicação stateless)
- **IA**: OpenAI API (GPT-3.5/4 + DALL-E)
- **Corretor**: LanguageTool API (gratuita)
- **PDF**: PDFKit
- **Imagem**: Canvas

## Arquitetura

```
Frontend (Cliente)
    ↓
API REST (Express)
    ├→ Story Controller (OpenAI GPT)
    ├→ SpellCheck Controller (LanguageTool API)
    ├→ Cover Controller (OpenAI DALL-E ou Canvas)
    └→ PDF Controller (PDFKit)
```

## Scripts Disponíveis

```bash
# Desenvolvimento
cd backend
npm run dev

# Produção
npm start

# Instalar dependências
npm install
```

## Variáveis de Ambiente

```
OPENAI_API_KEY=sk-...          # Chave da API OpenAI
PORT=3000                       # Porta do servidor
NODE_ENV=development            # Ambiente
```

## Endpoints da API

### Story
- `POST /api/story/generate` - Gera história

### Spell Check
- `POST /api/spellcheck/check` - Verifica ortografia

### Cover
- `POST /api/cover/generate` - Gera capa com IA
- `POST /api/cover/simple` - Gera capa simples

### PDF
- `POST /api/pdf/generate` - Gera PDF do livro

## TODO - Melhorias Futuras

- [ ] Banco de dados para salvar histórias
- [ ] Autenticação de usuários
- [ ] Edição colaborativa em tempo real
- [ ] Integração com mais modelos de IA
- [ ] Suporte para mais idiomas
- [ ] Gerador de múltiplas capas
- [ ] Download de vários formatos (EPUB, Mobi)
- [ ] Sistema de templates de capas
- [ ] Gerador de sinopse automática

## Limites

- Máximo 400 páginas por livro
- Limite de requisições simultâneas: 10
- Timeout de requisições: 60s

## Performance

- Tempo médio de geração de história: 2-5 minutos
- Tempo médio de geração de capa: 30-60 segundos
- Tempo médio de geração de PDF: 5-10 segundos

## Troubleshooting

### Erro de CORS
Certifique-se de que o frontend está acessando pelo mesmo domínio.

### Erro de PDFKit
Você pode precisar instalar dependências adicionais no Linux:
```bash
apt-get install build-essential python3
```

### Erro de Canvas
Para sistemas Linux, instale:
```bash
apt-get install libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++
```

## Deployment

### Heroku
```bash
git init
heroku login
heroku create seu-app-nome
git push heroku main
```

### DigitalOcean/AWS/GCP
Use Docker com docker-compose.yml fornecido
