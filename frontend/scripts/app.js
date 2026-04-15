// Estado da aplicação
let appState = {
    title: '',
    author: '',
    description: '',
    pages: 300,
    theme: '',
    story: '',
    correctedStory: '',
    coverImage: null,
    coverDescription: '',
    selectedIdea: null,
    refinedIdea: null,
};

// Update idea quantity display
document.getElementById('ideaQuantity').addEventListener('input', (e) => {
    document.getElementById('ideaQuantityDisplay').textContent = `${e.target.value} ideias`;
});

// Update pages display
document.getElementById('pages').addEventListener('input', (e) => {
    document.getElementById('pagesDisplay').textContent = `${e.target.value} páginas`;
    appState.pages = parseInt(e.target.value);
});

// Form submission
document.getElementById('descriptionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    appState.title = document.getElementById('title').value;
    appState.author = document.getElementById('author').value;
    appState.description = document.getElementById('description').value;
    appState.theme = document.getElementById('theme').value;
    appState.pages = parseInt(document.getElementById('pages').value);

    updateSummary();
    goToStep(2);
});

// Tab navigation
document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        goToStep(parseInt(tabName.replace('step', '')));
    });
});

function goToStep(stepNumber) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach((content) => {
        content.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn').forEach((btn) => {
        btn.classList.remove('active');
    });

    // Show selected tab
    const tabId = `step${stepNumber}`;
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
}

async function generateStory() {
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.textContent = 'Gerando...';

    document.getElementById('generationStatus').style.display = 'block';

    try {
        const response = await fetch('/api/story/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: appState.description,
                pages: appState.pages,
            }),
        });

        const data = await response.json();

        if (data.success) {
            appState.story = data.story;
            appState.correctedStory = data.story;

            document.getElementById('storyTitle').textContent = appState.title;
            document.getElementById('storyAuthor').textContent = appState.author;
            document.getElementById('storyContent').innerHTML = `<p>${appState.story.replace(/\n/g, '</p><p>')}</p>`;
            document.getElementById('editableContent').value = appState.story;

            document.getElementById('generationStatus').style.display = 'none';
            document.getElementById('storyPreview').style.display = 'block';
        } else {
            alert('Erro ao gerar história: ' + data.error);
            document.getElementById('generationStatus').style.display = 'none';
        }
    } catch (error) {
        alert('Erro ao gerar história: ' + error.message);
        document.getElementById('generationStatus').style.display = 'none';
    } finally {
        btn.disabled = false;
        btn.textContent = 'Gerar História';
    }
}

async function checkSpelling() {
    const btn = document.getElementById('spellCheckBtn');
    btn.disabled = true;
    btn.textContent = 'Verificando...';

    document.getElementById('spellCheckStatus').style.display = 'block';

    try {
        const text = document.getElementById('editableContent').value;
        const response = await fetch('/api/spellcheck/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();

        if (data.success) {
            if (data.corrections.length === 0) {
                alert('Nenhum erro ortográfico encontrado! ✓');
                document.getElementById('spellCheckStatus').style.display = 'none';
            } else {
                displayCorrections(data.corrections);
                appState.correctedStory = data.correctedText;
            }
        } else {
            alert('Erro ao verificar ortografia: ' + data.error);
        }

        document.getElementById('spellCheckStatus').style.display = 'none';
    } catch (error) {
        alert('Erro ao verificar ortografia: ' + error.message);
        document.getElementById('spellCheckStatus').style.display = 'none';
    } finally {
        btn.disabled = false;
        btn.textContent = '🔤 Verificar Ortografia';
    }
}

function displayCorrections(corrections) {
    let html = '';
    corrections.slice(0, 20).forEach((correction, index) => {
        html += `
            <div class="correction-item">
                <p><strong>Erro ${index + 1}:</strong> ${correction.message}</p>
                <p>Sugestão: <strong>${correction.replacement || 'N/A'}</strong></p>
            </div>
        `;
    });

    if (corrections.length > 20) {
        html += `<p><em>+ ${corrections.length - 20} outros erros encontrados</em></p>`;
    }

    document.getElementById('correctionsList').innerHTML = html;
    document.getElementById('corrections').style.display = 'block';
}

function applyCorrestions() {
    document.getElementById('editableContent').value = appState.correctedStory;
    appState.story = appState.correctedStory;
    document.getElementById('corrections').style.display = 'none';
    alert('Correções aplicadas! ✓');
}

function ignoreCorrestions() {
    document.getElementById('corrections').style.display = 'none';
    appState.correctedStory = document.getElementById('editableContent').value;
}

async function generateCover() {
    const btn = document.getElementById('generateCoverBtn');
    btn.disabled = true;
    btn.textContent = 'Gerando...';

    document.getElementById('coverStatus').style.display = 'block';

    try {
        const response = await fetch('/api/cover/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: appState.title,
                description: appState.description,
                theme: appState.theme,
                author: appState.author,
            }),
        });

        const data = await response.json();

        if (data.success) {
            appState.coverDescription = data.coverDescription;
            if (data.imageUrl) {
                appState.coverImage = data.imageUrl;
                document.getElementById('coverImage').src = data.imageUrl;
            }
            document.getElementById('coverDescription').textContent = data.coverDescription;
            document.getElementById('coverStatus').style.display = 'none';
            document.getElementById('coverPreview').style.display = 'block';
        } else {
            alert('Erro ao gerar capa: ' + data.error);
            generateSimpleCover();
        }
    } catch (error) {
        alert('Erro ao gerar capa: ' + error.message);
        generateSimpleCover();
    } finally {
        btn.disabled = false;
        btn.textContent = '🎨 Gerar Capa com IA';
    }
}

async function generateSimpleCover() {
    const btn = document.getElementById('simpleCoverBtn');
    btn.disabled = true;
    btn.textContent = 'Gerando...';

    try {
        const response = await fetch('/api/cover/simple', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: appState.title,
                author: appState.author,
                theme: appState.theme,
            }),
        });

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        appState.coverImage = url;

        document.getElementById('coverImage').src = url;
        document.getElementById('coverDescription').textContent = 'Capa gerada com sucesso!';
        document.getElementById('coverPreview').style.display = 'block';
    } catch (error) {
        alert('Erro ao gerar capa simples: ' + error.message);
    } finally {
        btn.disabled = false;
        btn.textContent = '📕 Capa Simples';
    }
}

async function exportToPDF() {
    const btn = document.getElementById('exportPdfBtn');
    btn.disabled = true;
    btn.textContent = 'Gerando PDF...';

    document.getElementById('exportStatus').style.display = 'block';

    try {
        // Atualizar conteúdo do story com edição manual
        appState.story = document.getElementById('editableContent').value;

        const response = await fetch('/api/pdf/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: appState.title,
                author: appState.author,
                content: appState.story,
                coverImage: appState.coverImage,
            }),
        });

        const data = await response.json();

        if (data.success) {
            // Download do PDF
            const link = document.getElementById('downloadLink');
            link.href = `/downloads/${data.filename}`;
            link.textContent = `Baixar: ${appState.title}.pdf`;

            document.getElementById('exportStatus').style.display = 'none';
            document.getElementById('exportSuccess').style.display = 'block';
        } else {
            alert('Erro ao gerar PDF: ' + data.error);
            document.getElementById('exportStatus').style.display = 'none';
        }
    } catch (error) {
        alert('Erro ao gerar PDF: ' + error.message);
        document.getElementById('exportStatus').style.display = 'none';
    } finally {
        btn.disabled = false;
        btn.textContent = '📥 Gerar e Fazer Download do PDF';
    }
}

function updateSummary() {
    document.getElementById('summaryTitle').textContent = appState.title;
    document.getElementById('summaryAuthor').textContent = appState.author;
    document.getElementById('summaryTheme').textContent = appState.theme;
    document.getElementById('summaryPages').textContent = appState.pages;
}

// ========== FUNÇÕES DE IDEIAS ==========

async function generateIdeas() {
    const btn = document.getElementById('generateIdeasBtn');
    btn.disabled = true;
    btn.textContent = 'Gerando...';

    const theme = document.getElementById('ideaTheme').value;
    const quantity = parseInt(document.getElementById('ideaQuantity').value);

    document.getElementById('ideasStatus').style.display = 'block';

    try {
        const response = await fetch('/api/ideas/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                theme: theme || null,
                quantity: quantity,
            }),
        });

        const data = await response.json();

        if (data.success) {
            appState.selectedIdea = data.ideas;
            document.getElementById('ideasContent').innerHTML = `<p>${data.ideas.replace(/\n/g, '</p><p>')}</p>`;
            document.getElementById('ideasStatus').style.display = 'none';
            document.getElementById('ideasResult').style.display = 'block';
        } else {
            alert('Erro ao gerar ideias: ' + data.error);
            document.getElementById('ideasStatus').style.display = 'none';
        }
    } catch (error) {
        alert('Erro ao gerar ideias: ' + error.message);
        document.getElementById('ideasStatus').style.display = 'none';
    } finally {
        btn.disabled = false;
        btn.textContent = '✨ Gerar Ideias';
    }
}

async function refineSelectedIdea() {
    if (!appState.selectedIdea) {
        alert('Selecione uma ideia primeiro');
        return;
    }

    const idea = appState.selectedIdea;
    
    document.getElementById('ideasResult').style.display = 'none';
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.innerHTML = `
        <div class="spinner"></div>
        <p>Expandindo a ideia...</p>
        <small>Gerando mais detalhes e personagens</small>
    `;
    document.getElementById('refinedIdea').innerHTML = '<h3>📚 Ideia Expandida</h3>' + loadingDiv.outerHTML;
    document.getElementById('refinedIdea').style.display = 'block';

    try {
        const response = await fetch('/api/ideas/refine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idea }),
        });

        const data = await response.json();

        if (data.success) {
            appState.refinedIdea = data.refinedIdea;
            document.getElementById('refinedIdeaContent').innerHTML = `<p>${data.refinedIdea.replace(/\n/g, '</p><p>')}</p>`;
        } else {
            alert('Erro ao expandir ideia: ' + data.error);
        }
    } catch (error) {
        alert('Erro ao expandir ideia: ' + error.message);
    }
}

function useIdeaForStory() {
    if (!appState.selectedIdea) {
        alert('Selecione uma ideia primeiro');
        return;
    }

    // Preencher a descrição com a ideia
    document.getElementById('description').value = appState.selectedIdea;
    document.getElementById('title').value = 'Nova História';
    
    goToStep(1);
}

function useRefinedIdea() {
    if (!appState.refinedIdea) {
        alert('Expanda uma ideia primeiro');
        return;
    }

    // Preencher a descrição com a ideia expandida
    document.getElementById('description').value = appState.refinedIdea;
    document.getElementById('title').value = 'Nova História';
    
    goToStep(1);
}

function closeRefinedIdea() {
    document.getElementById('refinedIdea').style.display = 'none';
    document.getElementById('ideasResult').style.display = 'block';
}
