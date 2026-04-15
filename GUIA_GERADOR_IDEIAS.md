# 📚 README - Gerador de Livros com IA

Um software completo para criar histórias completas usando IA, com correção ortográfica automática, geração de capas e exportação para PDF.

## 🚀 Novas Funcionalidades Adicionadas

### ✨ Gerador de Ideias Criativas
- **Sugestões de Histórias**: Gere ideias únicas e criativas em segundos
- **Expansão de Ideias**: Expanda ideias para obter mais detalhes sobre personagens, trama e cenários
- **Múltiplos Gêneros**: Receba ideias de diferentes gêneros simultane amente
- **Integração Direta**: Use a ideia gerada diretamente para criar sua história

---

## 🎯 Como Usar o Gerador de Ideias

### Passo 1: Acesse o Gerador
1. Inicie o servidor: `npm start` (no diretório `backend/`)
2. Abra [http://localhost:3000](http://localhost:3000)
3. Você verá a aba **💡 Ideias** como primeira opção

### Passo 2: Configure suas Preferências
- **Gênero/Tema**: Escolha um gênero específico ou deixe em branco para ser surpreendido
- **Quantidade de Ideias**: Use o controle deslizante para escolher entre 3 e 10 ideias

### Passo 3: Gere Ideias
- Clique em **✨ Gerar Ideias**
- Aguarde a IA criar ideias criativas (30-60 segundos)

### Passo 4: Interaja com as Ideias
Você tem 3 opções:

#### 🎯 Expandir Ideia Selecionada
- Clique em "🎯 Expandir Ideia Selecionada"
- Receba uma análise detalhada com:
  - Sinopse expandida
  - Personagens secundários
  - Trama de 3 atos
  - Subtramas possíveis
  - Cenários importantes
  - Temas explorados
  - Ganchos narrativos

#### ✍️ Usar essa Ideia para Escrever
- Clique em "✍️ Usar essa Ideia para Escrever"
- A ideia será automaticamente copiada para o campo de descrição
- Você será levado ao Passo 1 (Descreva sua História)

#### 🔄 Gerar Mais Ideias
- Clique em "🔄 Gerar Mais Ideias"
- Uma nova rodada de ideias será gerada

---

## 🎨 Características do Gerador de Ideias

### Ideias Pré-definidas (Fallback)
Se a conexão com OpenAI falhar, o sistema usará 40+ ideias pré-definidas que combinam:
- 8 personagens únicos
- 8 conflitos envolventes
- 8 cenários fantásticos
- 8 temas profundos
- 8 gêneros variados

### Criatividade com IA
Quando a IA está funcionando, você recebe:
- **Ideias Originais**: Geradas especialmente para você
- **Criatividade Máxima**: Configuração de temperatura em 0.9
- **Gêneros Misturados**: Combinações inesperadas de temas

---

## 📖 Fluxo Completo Recomendado

### Para Iniciantes (Sem Ideias)
1. 💡 **Gerador de Ideias** - Encontre inspiração
2. 🎯 **Expandir Ideia** - Entenda melhor o conceito
3. ✍️ **Descreva sua História** - Customize a ideia
4. 2️⃣ **Gere a História** - Deixe a IA criar
5. 3️⃣ **Corrija e Refine** - Melhore o texto
6. 4️⃣ **Capa do Livro** - Crie uma capa bonita
7. 5️⃣ **Exportar PDF** - Salve seu livro

### Para Autores Experientes (Com Ideias)
1. ➡️ Pule direto para o Passo 1
2. Insira sua ideia original
3. Siga normalmente os passos restantes

---

## 🔌 API do Gerador de Ideias

### Gerar Ideias
```
POST /api/ideas/generate
{
  "theme": "Fantasia" ou null,
  "quantity": 5
}

Resposta:
{
  "success": true,
  "ideas": "Ideia 1: ...\nIdeia 2: ...",
  "source": "ia" ou "predefinido"
}
```

### Expandir Ideia
```
POST /api/ideas/refine
{
  "idea": "Descrição da ideia"
}

Resposta:
{
  "success": true,
  "refinedIdea": "Análise detalhada da ideia..."
}
```

### Gerar Prompt Otimizado (Uso Avançado)
```
POST /api/ideas/prompt
{
  "idea": "Descrição da ideia",
  "pages": 300,
  "theme": "Fantasia"
}

Resposta:
{
  "success": true,
  "prompt": "Prompt otimizado para gerar história..."
}
```

---

## 💡 Dicas e Truques

### Para Melhores Ideias:
1. **Seja Específico**: Se você gosta de romance paranormal, escolha "Romance Paranormal"
2. **Quantidades Variadas**: Teste com 3 ideias para ver rapidamente, ou 10 para mais opções
3. **Expanda Ideias**: Sempre expanda a ideia antes de usá-la - adiciona muito mais detalhe
4. **Refine Múltiplas Vezes**: Você pode expandir quantas ideias quiser

### Combinações Recomendadas:
- " Ficção Científica + Romance" - Histórias futuristas com amor
- "Mistério + Horror" - Suspense psicológico
- "Fantasia + Drama" - Histórias épicas com emoção

### Para Escritores Bloqueados:
1. Gere 10 ideias em "Qualquer gênero"
2. Expanda 3 delas
3. Escolha a que mais o inspirou
4. Use diretamente para escrever

---

## 🐛 Solução de Problemas

### "Ideias não estão gerando"
- Verifique se a chave de API do OpenAI está configurada
- Tente usar o gerador de ideias pré-definidas como fallback

### "Ideias parecem muito básicas"
- Isso acontece quando está usando o fallback pré-definido
- Verifique sua conexão com a internet
- Confirme que a variável OPENAI_API_KEY está correta

### "Demora muito para gerar"
- Ideias podem levar 30-60 segundos para serem geradas
- A IA está criar ideias originais para você
- Isso é normal, especialmente com quantidade alta (8-10 ideias)

---

## 📊 Exemplos de Ideias Geradas

### Fantasia
```
📖 Ideia 1: Fantasia Épica

Personagem: Uma jovem maga em um mundo onde a magia é proibida

Conflito: A descoberta de um segredo familiar que muda tudo

Cenário: Uma metrópole futurista flutuante no céu

Tema Central: A busca pela identidade verdadeira
```

### Ficção Científica
```
📖 Ideia 2: Ficção Científica Noir

Personagem: Um astronauta marciano que acorda em um planeta desconhecido

Conflito: Uma corrida contra o tempo para impedir uma catástrofe

Cenário: Uma estação espacial isolada em Marte

Tema Central: A luta contra um destino preescrito
```

---

## 🎓 Próximos Passos

Após usar o Gerador de Ideias:
1. **Customize**: Edite a descrição no Passo 1 com seus próprios detalhes
2. **Expanda**: Use o prompt gerado como base para explorar mais
3. **Crie**: Deixe a IA gerar sua história completa
4. **Refine**: Corrija e melhore o texto
5. **Compartilhe**: Exporte para PDF e compartilhe sua obra!

---

**Desenvolvido com ❤️ para criadores de histórias**
