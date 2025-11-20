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
            document.body.style.overflow = "auto";
        }, 500);
    }, 500);
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

            const byCreate = document.createElement('p');
            byCreate.className = 'item-card__by';
            meta.innerHTML = `<div class="item-card__by"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#067c10ff" viewBox="0 0 256 256"><path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82Zm-11.55,39.29c-4.79,5-9.75,10.17-12.38,16.52-2.52,6.1-2.63,13.07-2.73,19.82-.1,7-.21,14.33-3.32,17.43s-10.39,3.22-17.43,3.32c-6.75.1-13.72.21-19.82,2.73-6.35,2.63-11.52,7.59-16.52,12.38S132,224,128,224s-9.15-4.92-14.11-9.69-10.17-9.75-16.52-12.38c-6.1-2.52-13.07-2.63-19.82-2.73-7-.1-14.33-.21-17.43-3.32s-3.22-10.39-3.32-17.43c-.1-6.75-.21-13.72-2.73-19.82-2.63-6.35-7.59-11.52-12.38-16.52S32,132,32,128s4.92-9.15,9.69-14.11,9.75-10.17,12.38-16.52c2.52-6.1,2.63-13.07,2.73-19.82.1-7,.21-14.33,3.32-17.43S70.51,56.9,77.55,56.8c6.75-.1,13.72-.21,19.82-2.73,6.35-2.63,11.52-7.59,16.52-12.38S124,32,128,32s9.15,4.92,14.11,9.69,10.17,9.75,16.52,12.38c6.1,2.52,13.07,2.63,19.82,2.73,7,.1,14.33.21,17.43,3.32s3.22,10.39,3.32,17.43c.1,6.75.21,13.72,2.73,19.82,2.63,6.35,7.59,11.52,12.38,16.52S224,124,224,128,219.08,137.15,214.31,142.11ZM173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z"></path></svg> ${item.by}</div>`;

            const link = document.createElement('a');
            link.className = 'item-card__link';
            link.href = item.link || '#';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = "<span>Ver</span> <i class='bx bx-right-arrow-alt'>";

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
    const body = document.getElementById('body');
    if (modal) {
        body.classList.add('opaco');
        modal.classList.remove('hidden');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button" onclick="fecharModal()" style="cursor: url(./cursors/Link.cur), pointer !important; color: red; font-size: 24px">&times;</span>
                <h2>Olá! Eu sou o Prota!</h2>
                <p>Bem-vindo à nossa Academia de Programação! Aqui, você encontrará uma variedade de cursos e recursos para aprimorar suas habilidades em desenvolvimento web e muito mais. Explore nossas seções de HTML, CSS, JavaScript, e nosso ChatBot, e outras tecnologias. Vamos codar juntos!</p>
                <span>Já conhece nosso site oficial? Lá você consegue aprender, testar e ganhar XP:</span> <a href="https://proggamingpage.web.app" target="_blank" style="color: blue; text-decoration: underline;">proggamingpage.web.app</a>
                <footer>
                    <span><strong>&copy; <span id="anoAtual"></span> Proggaming.</strong> All rights reserved.</span>
                      <div class="direitos"><a href="../Termos_de_uso.pdf" target="_blank">Termos de Uso</a> e <a
                href="../politica_privacidade.pdf" target="_blank">Privacidade.</a></div>
                </footer>
            </div>
        `;
    }
    const elementoAno = document.getElementById("anoAtual");
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    elementoAno.innerHTML = ano;
}

function fecharModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('hidden');
        body.classList.remove('opaco');
        modal.innerHTML = '';
    }
}
