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

mostrarSecao("home");
