const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateStory(description, pages) {
  try {
    // Converter páginas para palavras aproximadas (cada página ≈ 250 palavras)
    const estimatedWords = pages * 250;
    
    const prompt = `Você é um escritor criativo de ficção. Gere uma história completa e envolvente baseada na seguinte descrição:

Descrição: ${description}

Requisitos:
- A história deve ter aproximadamente ${estimatedWords} palavras (equivalente a ${pages} páginas)
- Deve ter uma narrativa clara com introdução, desenvolvimento e conclusão
- Use uma linguagem rica e descritiva
- Crie personagens bem definidos
- Divida em capítulos quando apropriado

Gere agora a história completa:`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um escritor profissional de livros. Seu objetivo é criar histórias envolventes e bem estruturadas em português.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: Math.ceil(estimatedWords / 0.75), // Aproximação tokens/palavras
      temperature: 0.7,
    });

    return {
      success: true,
      story: response.choices[0].message.content,
      tokenUsage: response.usage,
    };
  } catch (error) {
    console.error('Erro ao gerar história:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  generateStory,
};
