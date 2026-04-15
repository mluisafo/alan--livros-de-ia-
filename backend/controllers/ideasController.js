const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Ideias pré-definidas para fallback rápido
const ideiasPredefinidas = {
  personagens: [
    { nome: 'Um detetive aposentado', descricao: 'Que volta do retiro para resolver um último mistério' },
    { nome: 'Uma jovem maga', descricao: 'Em um mundo onde a magia é proibida' },
    { nome: 'Um inventor excêntrico', descricao: 'Que cria máquinas com consciência própria' },
    { nome: 'Uma jornalista investigadora', descricao: 'Que descobre uma conspiração global' },
    { nome: 'Um astronauta marciano', descricao: 'Que acorda em um planeta desconhecido' },
    { nome: 'Uma bruxa moderna', descricao: 'Que combina feitiços antigos com tecnologia' },
    { nome: 'Um ex-herói', descricao: 'Que perdeu seus poderes e tenta reconstruir sua vida' },
    { nome: 'Uma inteligência artificial', descricao: 'Que ganha consciência e questiona sua existência' },
  ],
  conflitos: [
    'Uma cidadela sitiada com suprimentos acabando',
    'Dois amigos de infância no lado oposto de uma guerra',
    'Uma maldição que afeta toda uma geração',
    'A descoberta de um segredo familiar que muda tudo',
    'Uma corrida contra o tempo para impedir uma catástrofe',
    'Uma escolha impossível entre salvar um indivíduo ou muitos',
    'Um poder que cresce incontrolavelmente',
    'A traição de alguém que se considerava leal',
  ],
  cenarios: [
    'Uma metrópole futurista flutuante no céu',
    'Um reino medieval submerso sob a água',
    'Uma estação espacial isolada em Marte',
    'Uma floresta encantada que encolhe gradualmente',
    'Uma cidade que existe simultaneamente em dois universos',
    'Um castelo onde o tempo funciona ao contrário',
    'Uma ilha que aparece apenas uma vez a cada séculos anos',
    'Um arquivo secreto que contém todos os segredos da humanidade',
  ],
  temas: [
    'Redenção e segunda chance',
    'O poder da amizade vs. ganância',
    'A busca pela identidade verdadeira',
    'A luta contra um destino preescrito',
    'A descoberta de magia antiga',
    'A sobrevivência em um mundo hostil',
    'O conflito entre dever e desejo',
    'A transformação através do sofrimento',
  ],
  generos: [
    'Fantasia Épica',
    'Ficção Científica Noir',
    'Romance Paranormal',
    'Mistério Psicológico',
    'Aventura Pós-Apocalíptica',
    'Fantasia Urbana',
    'Ficção Científica Utópica',
    'Horror Sobrenatural',
  ],
};

async function generateIdeas(theme = null, quantity = 5) {
  try {
    const prompt = theme
      ? `Gere ${quantity} ideias criativas para escrever uma história de ${theme}. Para cada ideia, inclua:
    
1. Título sugestivo
2. Sinopse curta (2-3 linhas)
3. Personagem principal
4. Conflito principal
5. Cenário

Seja criativo e original!`
      : `Gere ${quantity} ideias criativas e únicas para histórias em diferentes gêneros. Para cada ideia, inclua:

1. Gênero
2. Título sugestivo
3. Sinopse curta (2-3 linhas)
4. Personagem principal
5. Conflito principal
6. Cenário

Misture gêneros inesperadamente. Seja criativo!`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um criador de histórias criativo e imaginativo. Suas ideias são originais, envolventes e inspiradoras. Você ajuda escritores a encontrar a perfeita inspiração para seus livros.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1500,
      temperature: 0.9,
    });

    return {
      success: true,
      ideas: response.choices[0].message.content,
      source: 'ia',
    };
  } catch (error) {
    console.error('Erro ao gerar ideias com IA:', error);
    // Fallback para ideias pré-definidas
    return generateIdeasFallback(quantity);
  }
}

function generateIdeasFallback(quantity = 5) {
  const ideias = [];

  for (let i = 0; i < Math.min(quantity, 5); i++) {
    const personagem = ideiasPredefinidas.personagens[Math.floor(Math.random() * ideiasPredefinidas.personagens.length)];
    const conflito = ideiasPredefinidas.conflitos[Math.floor(Math.random() * ideiasPredefinidas.conflitos.length)];
    const cenario = ideiasPredefinidas.cenarios[Math.floor(Math.random() * ideiasPredefinidas.cenarios.length)];
    const tema = ideiasPredefinidas.temas[Math.floor(Math.random() * ideiasPredefinidas.temas.length)];
    const genero = ideiasPredefinidas.generos[Math.floor(Math.random() * ideiasPredefinidas.generos.length)];

    ideias.push(`
📖 **Ideia ${i + 1}: ${genero}**

**Personagem:** ${personagem.nome} - ${personagem.descricao}

**Conflito:** ${conflito}

**Cenário:** ${cenario}

**Tema Central:** ${tema}

**Sinopse:** Um(a) protagonista se vê forçado(a) a confrontar seus limites quando ${conflito.toLowerCase()}. Preso(a) em ${cenario.toLowerCase()}, ${personagem.nome.toLowerCase()} deve aprender que ${tema.toLowerCase()}.
    `);
  }

  return {
    success: true,
    ideas: ideias.join('\n---\n'),
    source: 'predefinido',
  };
}

async function refineIdea(ideiaDescricao) {
  try {
    const prompt = `Analise e expanda esta ideia de história:

"${ideiaDescricao}"

Forneça:
1. Uma sinopse expandida (parágrafo completo)
2. 3-4 personagens secundários interessantes
3. Uma trama de 3 atos resumida
4. Possíveis subtramas
5. Cenários importantes
6. Temas explorados
7. Ganchos narrativos intrigantes

Seja detalhado e inspirador!`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um escritor experiente que ajuda a desenvolver ideias em histórias completas. Suas análises são profundas e suas sugestões são práticas.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1500,
      temperature: 0.8,
    });

    return {
      success: true,
      refinedIdea: response.choices[0].message.content,
    };
  } catch (error) {
    console.error('Erro ao refinar ideia:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

async function generatePrompt(ideiaDescricao, pages, theme) {
  try {
    const prompt = `Você é um gerador de prompts para IA. Crie um prompt detalhado e assertivo para gerar uma história baseada nesta ideia:

Ideia: ${ideiaDescricao}
Tema: ${theme}
Comprimento: ${pages} páginas (aproximadamente ${pages * 250} palavras)

O prompt deve:
1. Descrever claramente o mundo e os personagens
2. Especificar o tom e estilo desejado
3. Indicar o comprimento esperado
4. Incluir elementos únicos e diferenciais
5. Ser inspirador e detalhado

Retorne apenas o prompt, sem explicações adicionais.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em criar prompts eficazes para gerar histórias de qualidade.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    return {
      success: true,
      prompt: response.choices[0].message.content,
    };
  } catch (error) {
    console.error('Erro ao gerar prompt:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  generateIdeas,
  refineIdea,
  generatePrompt,
  ideiasPredefinidas,
};
