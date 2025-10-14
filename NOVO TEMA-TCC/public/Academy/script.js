function mostrarSecao(id) {
    document.querySelectorAll(".page").forEach((secao) => {
        secao.style.display = "none";
    });

    const secaoSelecionada = document.getElementById(id);
    if (secaoSelecionada) {
        secaoSelecionada.style.display = "block";
    }

    if (id !== "conteudo") {
        document.getElementById("conteudo").innerHTML = "";
    }
}

function carregarPagina(arquivo) {
    document.querySelectorAll(".page").forEach((secao) => {
        secao.style.display = "none";
    });

    const conteudo = document.getElementById("conteudo");
    conteudo.style.display = "block";

    fetch(arquivo)
        .then((res) => {
            if (!res.ok) throw new Error("Erro ao carregar a página.");
            return res.text();
        })
        .then((html) => {
            conteudo.innerHTML = html;
        })
        .catch((err) => {
            conteudo.innerHTML = "<p>Erro ao carregar a página.</p>";
            console.error(err);
        });
}

const itemsContainer = document.getElementById('tabs-sections'); 

const categoryMap = {
    'html': 'filehtml',
    'css': 'filecss',
    'javascript': 'filejs', 
};

fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('Não foi possível carregar o arquivo data.json. Verifique se ele existe.');
        }
        return response.json();
    })
    .then(itemsData => {
        itemsData.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'itemCard';

            itemCard.innerHTML = `
                <img src="${item.imagem}"/>
                <span class="title">${item.titulo}</span>
                <span class="category">Categoria: ${item.category}</span>
                <a href="${item.link}" target="_blank">Ver</a>
            `;

            const containerId = categoryMap[item.category];

            let targetContainer = null;
            if (containerId) {
                targetContainer = document.getElementById(containerId);
            }

            if (targetContainer) {
                targetContainer.appendChild(itemCard);
            } else {
                console.warn(`Container para a categoria '${item.category}' não encontrado. Anexando ao container principal.`);
                itemsContainer.appendChild(itemCard);
            }
        });
    })
    .catch(error => {
        itemsContainer.innerHTML = `<p class="text-red-600 text-center">${error.message}</p>`;
        console.error('Houve um erro:', error);
    });
