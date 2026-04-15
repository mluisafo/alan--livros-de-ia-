const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateCover(title, description, theme) {
  try {
    const prompt = `Gere uma descrição detalhada para uma capa de livro com os seguintes parâmetros:
    
Título: ${title}
Descrição: ${description}
Tema/Gênero: ${theme}

Descreva em detalhes:
1. Cores dominantes
2. Imagens/elementos visuais principais
3. Posicionamento do texto
4. Estilo artístico
5. Mood/atmosfera

A descrição será usada como prompt para gerar uma imagem. Seja bem específico.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um designer de capas de livros experiente. Crie descrições visuais detalhadas para capas.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    const coverDescription = response.choices[0].message.content;

    // Tentar usar DALL-E para gerar imagem (requer créditos)
    let imageUrl = null;
    try {
      const imagePrompt = `Professional book cover design for "${title}". Theme: ${theme}. Description: ${coverDescription}. High quality, polished, professional design.`;
      
      const imageResponse = await openai.images.generate({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1536', // Proporção de capa de livro
        quality: 'hd',
      });

      imageUrl = imageResponse.data[0].url;
    } catch (imageError) {
      console.warn('Não foi possível gerar imagem com DALL-E:', imageError.message);
    }

    return {
      success: true,
      coverDescription: coverDescription,
      imageUrl: imageUrl,
      message: imageUrl 
        ? 'Capa gerada com sucesso!' 
        : 'Descrição da capa gerada. Para gerar a imagem, configure a API DALL-E.',
    };
  } catch (error) {
    console.error('Erro ao gerar capa:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Função auxiliar para criar capa simples em canvas (fallback)
function createSimpleCover(title, author, theme) {
  const { createCanvas } = require('canvas');
  
  const canvas = createCanvas(1024, 1536);
  const ctx = canvas.getContext('2d');

  // Cores baseadas no tema
  const colors = {
    fantasy: { bg: '#1a1a2e', text: '#eee' },
    romance: { bg: '#ffc0cb', text: '#8b0000' },
    mystery: { bg: '#2d2d2d', text: '#fff' },
    scifi: { bg: '#0a0e27', text: '#00ff9f' },
    default: { bg: '#3498db', text: '#fff' },
  };

  const color = colors[theme.toLowerCase()] || colors.default;

  // Fundo
  ctx.fillStyle = color.bg;
  ctx.fillRect(0, 0, 1024, 1536);

  // Texto
  ctx.fillStyle = color.text;
  ctx.textAlign = 'center';

  // Título
  ctx.font = 'bold 60px Arial';
  ctx.fillText(title, 512, 400);

  // Autor
  ctx.font = '30px Arial';
  ctx.fillText(author || 'Autor Desconhecido', 512, 500);

  // Tema
  ctx.font = 'italic 25px Arial';
  ctx.fillText(theme, 512, 1400);

  return canvas.toBuffer('image/png');
}

module.exports = {
  generateCover,
  createSimpleCover,
};
