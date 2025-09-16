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
  // Oculta todas as outras seções
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

function trocarTemaComBotao() {
  const isEscuro = document.body.classList.toggle("tema-escuro");
  localStorage.setItem("tema", isEscuro ? "escuro" : "claro");

  const botao = document.getElementById("botaoTema");
  botao.textContent = isEscuro ? "️" : "";
}

window.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema");
  const isEscuro = temaSalvo === "escuro";

  document.body.classList.toggle("tema-escuro", isEscuro);

  const botao = document.getElementById("botaoTema");
  if (botao) {
    botao.textContent = isEscuro ? "" : "";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("loaded");
    setTimeout(() => {
      document.body.style.overflow = "auto"; // libera rolagem após o overlay sumir
    }, 300);
  }, 300);
});

function toggleInfo() {
  var infoDiv = document.getElementById("popupInfo");
  if (infoDiv.style.display === "none" || infoDiv.style.display === "") {
    infoDiv.style.display = "flex";
  } else {
    infoDiv.style.display = "none";
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popupInfo.style.display = "none";
    }
  });
}
let eventoInstalacao;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  eventoInstalacao = e;
  document.getElementById("btnInstalar").style.display = "inline-block";
});

document.getElementById("btnInstalar").addEventListener("click", () => {
  if (eventoInstalacao) {
    eventoInstalacao.prompt();
    eventoInstalacao.userChoice.then(choice => {
      if (choice.outcome === "accepted") {
        console.log("Usuário aceitou instalar");
      } else {
        console.log("Usuário cancelou a instalação");
      }
      eventoInstalacao = null;
    });
  }
});
