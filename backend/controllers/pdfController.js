const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

async function generatePDF(title, author, content, coverImage, outputPath) {
  try {
    // Criar diretório de saída se não existir
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Criar documento PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: 40,
    });

    // Pipe para arquivo
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Página de capa
    if (coverImage) {
      doc.image(coverImage, 0, 0, { width: 595, height: 842 });
      doc.addPage();
    }

    // Página de título
    doc.fontSize(28).font('Helvetica-Bold').text(title, { align: 'center', marginTop: 200 });
    doc.moveDown(2);
    doc.fontSize(16).font('Helvetica').text(`por ${author}`, { align: 'center' });
    doc.addPage();

    // Conteúdo do livro
    doc.fontSize(12).font('Helvetica').text(content, {
      align: 'justify',
      lineGap: 5,
    });

    // Finalizar PDF
    doc.end();

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        resolve({
          success: true,
          message: 'PDF gerado com sucesso!',
          path: outputPath,
          size: fs.statSync(outputPath).size,
        });
      });

      stream.on('error', reject);
      doc.on('error', reject);
    });
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  generatePDF,
};
