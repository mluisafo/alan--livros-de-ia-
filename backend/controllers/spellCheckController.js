const axios = require('axios');

async function checkSpelling(text) {
  try {
    // Usando LanguageTool API (gratuita e em português)
    const response = await axios.post('https://api.languagetool.org/v2/check', null, {
      params: {
        text: text,
        language: 'pt-BR',
      },
    });

    const corrections = response.data.matches.map((match) => ({
      offset: match.offset,
      length: match.length,
      message: match.message,
      replacement: match.replacements.length > 0 ? match.replacements[0].value : null,
      rule: match.rule.id,
    }));

    return {
      success: true,
      originalText: text,
      corrections: corrections,
      correctedText: applyCorrectionsSmart(text, corrections),
    };
  } catch (error) {
    console.error('Erro ao verificar ortografia:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

function applyCorrectionsSmart(text, corrections) {
  let corrected = text;
  
  // Ordenar correções em ordem reversa para não afetar os índices
  const sortedCorrections = corrections.sort((a, b) => b.offset - a.offset);

  sortedCorrections.forEach((correction) => {
    if (correction.replacement) {
      const before = corrected.substring(0, correction.offset);
      const after = corrected.substring(correction.offset + correction.length);
      corrected = before + correction.replacement + after;
    }
  });

  return corrected;
}

module.exports = {
  checkSpelling,
};
