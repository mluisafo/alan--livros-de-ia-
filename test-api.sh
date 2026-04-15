#!/bin/bash

# Script para testar a API

API_URL="http://localhost:3000"

echo "🧪 Testando Gerador de Livros com IA"
echo ""

# Test 1: Health check
echo "1️⃣ Teste de Health Check..."
curl -s $API_URL/health | jq .
echo ""

# Test 2: Gerar história (requer API key válida)
echo "2️⃣ Teste de Geração de História..."
curl -s -X POST $API_URL/api/story/generate \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Uma história sobre um jovem explorador que descobre um tesouro escondido em uma floresta misteriosa.",
    "pages": 250
  }' | jq .

echo ""
echo "✅ Testes concluídos!"
