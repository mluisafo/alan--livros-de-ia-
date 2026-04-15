// Exemplos de como usar a API do Gerador de Livros

// 1. GERAR HISTÓRIA
async function exemploGerarHistoria() {
  const response = await fetch('http://localhost:3000/api/story/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: 'Uma aventura épica em um mundo mágico com dragões e heróis lendários',
      pages: 300,
    }),
  });

  const resultado = await response.json();
  console.log('📖 História gerada:', resultado.story);
}

// 2. VERIFICAR ORTOGRAFIA
async function exemploVerificarOrtografia() {
  const response = await fetch('http://localhost:3000/api/spellcheck/check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: 'Este eh um testo com erros ortograficos para corrigir.',
    }),
  });

  const resultado = await response.json();
  console.log('✏️ Correções:', resultado.corrections);
  console.log('📝 Texto corrigido:', resultado.correctedText);
}

// 3. GERAR CAPA COM IA
async function exemploGerarCapaIA() {
  const response = await fetch('http://localhost:3000/api/cover/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'O Mistério da Floresta Escura',
      description: 'Uma história de mistério e suspense',
      theme: 'mystery',
      author: 'João Silva',
    }),
  });

  const resultado = await response.json();
  console.log('🎨 Descrição da capa:', resultado.coverDescription);
  console.log('🖼️ URL da imagem:', resultado.imageUrl);
}

// 4. GERAR CAPA SIMPLES
async function exemploGerarCapaSimples() {
  const response = await fetch('http://localhost:3000/api/cover/simple', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'O Mistério da Floresta Escura',
      author: 'João Silva',
      theme: 'mystery',
    }),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const img = document.getElementById('cover-image');
  img.src = url;
}

// 5. GERAR PDF
async function exemploGerarPDF() {
  const response = await fetch('http://localhost:3000/api/pdf/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'O Mistério da Floresta Escura',
      author: 'João Silva',
      content: 'Capítulo 1: A Descoberta\n\nUma noite escura...',
      coverImage: null, // ou URL da imagem
    }),
  });

  const resultado = await response.json();
  if (resultado.success) {
    console.log('✅ PDF gerado:', resultado.filename);
    // Download automático
    window.location.href = `/downloads/${resultado.filename}`;
  }
}

// 6. FLUXO COMPLETO
async function fluxoCompleto() {
  try {
    console.log('🚀 Iniciando fluxo completo...\n');

    // Etapa 1: Gerar história
    console.log('📖 Etapa 1: Gerando história...');
    let response = await fetch('http://localhost:3000/api/story/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: 'Uma fantasia épica com magos e guerreiros',
        pages: 250,
      }),
    });
    let resultado = await response.json();
    if (!resultado.success) throw new Error(resultado.error);
    const historia = resultado.story;
    console.log('✅ História gerada com sucesso!');

    // Etapa 2: Verificar ortografia
    console.log('📝 Etapa 2: Verificando ortografia...');
    response = await fetch('http://localhost:3000/api/spellcheck/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: historia }),
    });
    resultado = await response.json();
    const textoCorigido = resultado.correctedText;
    console.log(`✅ ${resultado.corrections.length} correções aplicadas!`);

    // Etapa 3: Gerar capa
    console.log('🎨 Etapa 3: Gerando capa...');
    response = await fetch('http://localhost:3000/api/cover/simple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Fantasia Épica',
        author: 'Seu Nome',
        theme: 'fantasy',
      }),
    });
    const capaBlob = await response.blob();
    console.log('✅ Capa gerada com sucesso!');

    // Etapa 4: Gerar PDF
    console.log('📥 Etapa 4: Gerando PDF...');
    response = await fetch('http://localhost:3000/api/pdf/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Fantasia Épica',
        author: 'Seu Nome',
        content: textoCorigido,
        coverImage: null,
      }),
    });
    resultado = await response.json();
    console.log(`✅ PDF gerado: ${resultado.filename}`);
    console.log('\n🎉 Processo concluído com sucesso!');
    console.log(`📥 Baixe em: /downloads/${resultado.filename}`);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

// USAGE: fluxoCompleto();
