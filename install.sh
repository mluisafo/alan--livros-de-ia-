#!/bin/bash

# Gerador de Livros com IA - Script de Instalação

echo "📚 Instalando Gerador de Livros com IA..."
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale Node.js 14+."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Instalar dependencies backend
echo "📦 Instalando dependências do backend..."
cd backend
npm install
cd ..
echo "✅ Backend instalado com sucesso!"
echo ""

# Criar arquivo .env
if [ ! -f ".env" ]; then
    echo "⚙️ Criando arquivo .env..."
    cp .env.example .env
    echo "❌ IMPORTANTE: Edite o arquivo .env e adicione sua chave de API do OpenAI!"
    echo "   Você pode obter uma chave em: https://platform.openai.com/api-keys"
else
    echo "✅ Arquivo .env já existe"
fi

echo ""
echo "✅ Instalação concluída!"
echo ""
echo "🚀 Para iniciar o servidor, execute:"
echo "   cd backend"
echo "   npm start"
echo ""
echo "🌐 Depois acesse: http://localhost:3000"
