function mostrarSecao(id) {
    document.querySelectorAll('.page').forEach(secao => secao.classList.remove('active'));

    const secaoSelecionada = document.getElementById(id);
    if (secaoSelecionada) secaoSelecionada.classList.add('active');

    if (id !== 'conteudo') {
        const conteudoEl = document.getElementById('conteudo');
        if (conteudoEl) conteudoEl.innerHTML = '';
    }
}

function carregarPagina(arquivo) {
    document.querySelectorAll('.page').forEach(secao => secao.classList.remove('active'));
    const conteudo = document.getElementById('conteudo');
    if (conteudo) conteudo.classList.add('active');

    fetch(arquivo)
        .then((res) => {
            if (!res.ok) throw new Error("Erro ao carregar a página.");
            return res.text();
        })
        .then((html) => {
            if (conteudo) conteudo.innerHTML = html;
        })
        .catch((err) => {
            if (conteudo) conteudo.innerHTML = "<p>Erro ao carregar a página.</p>";
            console.error(err);
        });
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.body.classList.add("loaded");
        setTimeout(() => {
            document.body.style.overflow = "auto"; // libera rolagem após o overlay sumir
        }, 300);
    }, 300);
});

const itemsContainer = document.querySelector('.tabs-sections');

const categoryMap = {
    'html': 'filehtml',
    'css': 'filecss',
    'js': 'filejs',
    'python': 'moretech',
    'outros': 'moretech'
};

function getOrCreateGrid(sectionEl) {
    if (!sectionEl) return null;
    let grid = sectionEl.querySelector('.items-grid');
    if (!grid) {
        grid = document.createElement('div');
        grid.className = 'items-grid';
        sectionEl.appendChild(grid);
    }
    return grid;
}

fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível carregar o arquivo data.json. Verifique se ele existe.');
        }
        return response.json();
    })
    .then(itemsData => {
        // limpa grids existentes
        Object.values(categoryMap).forEach(id => {
            const sec = document.getElementById(id);
            if (sec) {
                const existing = sec.querySelector('.items-grid');
                if (existing) existing.innerHTML = '';
            }
        });

        itemsData.forEach(item => {
            const card = document.createElement('article');
            card.className = 'item-card';
            // suporta tanto item.titulo (pt-BR) quanto item.title (en)
            const itemTitle = (item.titulo || item.title || '').toString();
            if (itemTitle) card.setAttribute('data-title', itemTitle);
            if (item.category) card.setAttribute('data-category', item.category);

            const img = document.createElement('img');
            img.className = 'item-card__img';
            img.src = item.imagem || '';
            img.alt = itemTitle || 'imagem';

            const body = document.createElement('div');
            body.className = 'item-card__body';

            const title = document.createElement('h3');
            title.className = 'item-card__title';
            title.textContent = itemTitle || '';

            const meta = document.createElement('p');
            meta.className = 'item-card__meta';
            meta.textContent = item.category ? `Categoria: ${item.category}` : '';

            const link = document.createElement('a');
            link.className = 'item-card__link';
            link.href = item.link || '#';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = 'Ver';

            body.appendChild(title);
            body.appendChild(meta);
            body.appendChild(link);

            card.appendChild(img);
            card.appendChild(body);

            const containerId = categoryMap[item.category];
            let targetSection = null;
            if (containerId) targetSection = document.getElementById(containerId);

            if (targetSection) {
                const grid = getOrCreateGrid(targetSection);
                grid.appendChild(card);
            } else {
                console.warn(`Container para a categoria '${item.category}' não encontrado. Anexando ao container principal.`);
                const fallbackGrid = getOrCreateGrid(itemsContainer);
                if (fallbackGrid) fallbackGrid.appendChild(card);
                else itemsContainer.appendChild(card);
            }
        });
    })
    .catch(error => {
        if (itemsContainer) itemsContainer.innerHTML = `<p class="text-error">${error.message}</p>`;
        console.error('Houve um erro:', error);
    });


function abrirModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button" onclick="fecharModal()" style="cursor: pointer; color: red;">&times;</span>
                <h2>Olá! Eu sou o Prota!</h2>
                <p>Bem-vindo à nossa Academia de Programação! Aqui, você encontrará uma variedade de cursos e recursos para aprimorar suas habilidades em desenvolvimento web e muito mais. Explore nossas seções de HTML, CSS, JavaScript, e outras tecnologias. Vamos codar juntos!</p>
                <span>Já conhece nosso site oficial? Lá você consegue aprender, testar e ganhar xp.</span> <a href="https://proggamingpage.web.app" target="_blank" style="color: blue; text-decoration: underline;">proggaming.com.br</a>
            </div>
        `;
    }
}

function fecharModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.innerHTML = '';
    }
}