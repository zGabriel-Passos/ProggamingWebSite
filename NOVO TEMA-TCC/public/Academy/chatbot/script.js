const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviar();
});

function enviar() {
    const texto = input.value.trim();
    if (!texto) return;

    adicionarMensagem("user", texto);
    input.value = "";

    setTimeout(() => {
        const resposta = gerarResposta(texto.toLowerCase());
        adicionarMensagem("gpt", resposta);
    }, 800);
}

function adicionarMensagem(tipo, texto) {
    const div = document.createElement("div");
    div.className = `mensagem ${tipo}`;
    div.innerHTML = `<p>${texto}</p>`;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function gerarResposta(pergunta) {
    if (pergunta.includes("campeão") && pergunta.includes("brasileiro") && pergunta.includes("2022")) {
        return "Como sou um modelo de linguagem treinado até setembro de 2021, não tenho informações sobre eventos que ocorrerão no futuro após essa data.";
    }
    if (pergunta.includes("google bard")) {
        return "Sim, o Google Bard é um modelo de IA do Google voltado para geração de conteúdo textual, como poemas e respostas.";
    }
    if (pergunta.includes("que horas são") || pergunta.includes("horas")) {
        const agora = new Date().toLocaleTimeString();
        return `Agora são ${agora}.`;
    }
    if (pergunta.includes("piada")) {
        return "Por que o computador foi ao médico? Porque ele tinha um vírus!";
    }
    if (pergunta.includes("seu nome")) {
        return "Sou o ChatGPT, versão simulada de 2022.";
    }
    if (pergunta.includes("capital da frança")) {
        return "A capital da França é Paris.";
    }
    if (pergunta.includes("segunda guerra")) {
        return "A Segunda Guerra Mundial ocorreu entre 1939 e 1945.";
    }
    if (pergunta.includes("criou o facebook") || pergunta.includes("fundador do facebook")) {
        return "O Facebook foi criado por Mark Zuckerberg em 2004.";
    }
    if (pergunta.includes("tem sentimentos") || pergunta.includes("você sente")) {
        return "Não, sou apenas um programa de computador e não possuo sentimentos.";
    }
    if (pergunta.includes("maior planeta")) {
        return "O maior planeta do sistema solar é Júpiter.";
    }
    if (pergunta.includes("sentido da vida")) {
        return "Essa é uma pergunta filosófica profunda. Muitos diriam que o sentido da vida é 42 😉.";
    }
    if (pergunta.includes("inteligência artificial")) {
        return "Inteligência Artificial é o campo da ciência da computação que se dedica a criar sistemas capazes de simular a inteligência humana.";
    }
    if (pergunta.includes("ano você foi criado") || pergunta.includes("quando você foi criado")) {
        return "Fui lançado pela OpenAI em 2020 com atualizações até 2021.";
    }
    if (pergunta.includes("quantos continentes")) {
        return "Existem 7 continentes: África, América, Antártica, Ásia, Europa, Oceania e América do Sul.";
    }
    if (pergunta.includes("qual sua linguagem") || pergunta.includes("em que linguagem")) {
        return "Sou treinado com diversas linguagens, mas meu núcleo é baseado em processamento de linguagem natural com tecnologia de aprendizado profundo.";
    }

    return "Desculpe, não tenho dados suficientes para responder essa pergunta. Tente perguntar algo como nos exemplos acima.";
}
