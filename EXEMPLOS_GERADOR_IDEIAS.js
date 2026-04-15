// Exemplos de Uso - Gerador de Ideias

// ========================================
// 1. GERAR IDEIAS
// ========================================

async function exemplo1_GerarIdeias() {
  const response = await fetch('http://localhost:3000/api/ideas/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      theme: 'Fantasia', // ou null para gêneros aleatórios
      quantity: 5,
    }),
  });

  const resultado = await response.json();
  console.log('💡 Ideias geradas:');
  console.log(resultado.ideas);
  /*
  Saída esperada:
  📖 **Ideia 1: Fantasia Épica**
  
  **Personagem:** Um detetive aposentado - Que volta do retiro para resolver um último mistério
  **Conflito:** Uma cidadela sitiada com suprimentos acabando
  **Cenário:** Uma metrópole futurista flutuante no céu
  **Tema Central:** Redenção e segunda chance
  ...
  */
}

// ========================================
// 2. EXPANDIR IDEIA
// ========================================

async function exemplo2_ExpandirIdeia() {
  const ideaText = `
    Uma jovem com poderes mágicos em um mundo onde a magia é proibida,
    que descobre um segredo familiar que muda tudo.
  `;

  const response = await fetch('http://localhost:3000/api/ideas/refine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idea: ideaText,
    }),
  });

  const resultado = await response.json();
  console.log('📚 Ideia Expandida:');
  console.log(resultado.refinedIdea);
  /*
  Saída esperada:
  SINOPSE EXPANDIDA:
  Em um mundo onde a magia foi banida há séculos, uma jovem descobre
  que possui poderes mágicos dormentes. Quando ela desbloqueia esses
  poderes, descobre um segredo que sua família guardou por gerações...
  
  PERSONAGENS SECUNDÁRIOS:
  1. Mentor Misterioso - Um mago em exílio...
  2. Antagonista - Um caçador de magos...
  3. Aliado de Confiança - Seu melhor amigo que...
  
  TRAMA DE 3 ATOS:
  Ato 1: A Descoberta
  Ato 2: O Conflito
  Ato 3: A Revelação
  ...
  */
}

// ========================================
// 3. FLUXO COMPLETO: IDEIA→HISTÓRIA→PDF
// ========================================

async function exemploFluxoCompleto() {
  console.log('🚀 Fluxo Completo: Ideia → História → PDF\n');

  // Etapa 1: Gerar ideias
  console.log('1️⃣ Gerando ideias...');
  let response = await fetch('http://localhost:3000/api/ideas/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      theme: 'Ficção Científica',
      quantity: 3,
    }),
  });
  let resultado = await response.json();
  const ideia = resultado.ideas;
  console.log('✅ 3 ideias geradas');

  // Etapa 2: Expandir ideia
  console.log('\n2️⃣ Expandindo ideia selecionada...');
  response = await fetch('http://localhost:3000/api/ideas/refine', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea: ideia }),
  });
  resultado = await response.json();
  const ideiaExpandida = resultado.refinedIdea;
  console.log('✅ Ideia expandida com detalhes');

  // Etapa 3: Gerar história
  console.log('\n3️⃣ Gerando história com base na ideia...');
  response = await fetch('http://localhost:3000/api/story/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      description: ideiaExpandida,
      pages: 300,
    }),
  });
  resultado = await response.json();
  const historia = resultado.story;
  console.log('✅ História gerada com sucesso!');

  // Etapa 4: Verificar ortografia
  console.log('\n4️⃣ Verificando ortografia...');
  response = await fetch('http://localhost:3000/api/spellcheck/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: historia }),
  });
  resultado = await response.json();
  const historiaCorigida = resultado.correctedText;
  console.log(`✅ ${resultado.corrections.length} correções aplicadas`);

  // Etapa 5: Gerar capa
  console.log('\n5️⃣ Gerando capa...');
  response = await fetch('http://localhost:3000/api/cover/simple', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Ficção Científica',
      author: 'Seu Nome',
      theme: 'Ficção Científica',
    }),
  });
  console.log('✅ Capa gerada');

  // Etapa 6: Gerar PDF
  console.log('\n6️⃣ Gerando PDF...');
  response = await fetch('http://localhost:3000/api/pdf/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'Ficção Científica',
      author: 'Seu Nome',
      content: historiaCorigida,
      coverImage: null,
    }),
  });
  resultado = await response.json();
  console.log(`✅ PDF gerado: ${resultado.filename}`);

  console.log('\n🎉 Fluxo concluído com sucesso!');
}

// ========================================
// 4. GERAR MÚLTIPLAS IDEIAS E ESCOLHER
// ========================================

async function exemplo4_SelecionarMelhorIdeia() {
  console.log('🎯 Gerando ideias para você escolher a melhor\n');

  // Gerar 10 ideias de diferentes gêneros
  const response = await fetch('http://localhost:3000/api/ideas/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      theme: null, // Mistura de gêneros
      quantity: 10,
    }),
  });

  const resultado = await response.json();
  const ideias = resultado.ideas.split('---');

  console.log(`Geramos ${ideias.length} ideias diferentes para você escolher!\n`);

  // Simular seleção da primeira ideia
  const ideaSelecionada = ideias[0];
  console.log('Ideia selecionada:');
  console.log(ideaSelecionada);

  // Expandir a ideia selecionada
  const refineResponse = await fetch('http://localhost:3000/api/ideas/refine', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea: ideaSelecionada }),
  });

  const refinedResult = await refineResponse.json();
  console.log('\n📚 Ideia Expandida:');
  console.log(refinedResult.refinedIdea);
}

// ========================================
// 5. COMBINAÇÕES CRIATIVAS DE GÊNEROS
// ========================================

async function exemplo5_GenerosEspecificos() {
  console.log('🎨 Obtendo ideias para diferentes gêneros\n');

  const generos = ['Fantasia', 'Romance', 'Mistério', 'Horror', 'Aventura'];

  for (const genero of generos) {
    const response = await fetch('http://localhost:3000/api/ideas/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        theme: genero,
        quantity: 2,
      }),
    });

    const resultado = await response.json();
    console.log(`\n${genero}:`);
    console.log(resultado.ideas);
    console.log('---');
  }
}

// ========================================
// 6. USAR IDEIA COM PROMPT OTIMIZADO
// ========================================

async function exemplo6_PromptOtimizado() {
  console.log('💡 Gerando ideia com prompt otimizado\n');

  // Gerar ideia
  let response = await fetch('http://localhost:3000/api/ideas/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      theme: 'Cyberpunk',
      quantity: 1,
    }),
  });

  let resultado = await response.json();
  const ideia = resultado.ideas;

  // Gerar prompt otimizado
  response = await fetch('http://localhost:3000/api/ideas/prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idea: ideia,
      pages: 300,
      theme: 'Cyberpunk',
    }),
  });

  resultado = await response.json();
  console.log('Ideia Original:');
  console.log(ideia);
  console.log('\nPrompt Otimizado para IA:');
  console.log(resultado.prompt);
}

// ========================================
// CHAMAR EXEMPLOS
// ========================================

// Descomente para executar:
// exemplo1_GerarIdeias();
// exemplo2_ExpandirIdeia();
// exemploFluxoCompleto();
// exemplo4_SelecionarMelhorIdeia();
// exemplo5_GenerosEspecificos();
// exemplo6_PromptOtimizado();
