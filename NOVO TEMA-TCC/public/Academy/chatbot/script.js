const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");

function preencherInput(pergunta) {
    if (input) {
        input.value = pergunta;
    }
}

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
    if (pergunta.includes("o que vou aprender em html") || pergunta.includes("html")) {
        return "Em HTML, você aprenderá a estruturar páginas web usando tags semânticas, como <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>, e a incluir conteúdo essencial como links, textos, e imagens com acessibilidade (o atributo <code>alt</code>).";
    }
    if (pergunta.includes("o que vou aprender em css") || pergunta.includes("css")) {
        return "Em CSS, você dominará o estilo e o design do seu projeto. O curso abrange seletores, cores, tipografia, a criação de layouts responsivos (usando Flexbox) e a personalização da interface.";
    }
    if (pergunta.includes("o que vou aprender em js") || pergunta.includes("o que vou aprender em javascript") || pergunta.includes("js") || pergunta.includes("javascript")) {
        return "Em JavaScript, o foco é na interatividade e lógica: você aprenderá a manipular o DOM, adicionar funcionalidades dinâmicas, validar entradas e implementar sistemas avançados como a gamificação e a ofensiva diária.";
    }
    if (pergunta.includes("objetivo deste tcc") || pergunta.includes("sobre o projeto") || pergunta.includes("tcc")) {
        return "O objetivo principal deste TCC é desenvolver o 'Proggaming', uma plataforma de ensino de programação gamificada. Nosso foco é usar elementos de jogos (XP, níveis, ofensiva) para aumentar a motivação e a retenção do aprendizado de desenvolvimento web.";
    }
    if (pergunta.includes("gamificação") || pergunta.includes("como funciona a gamificação")) {
        return "A gamificação funciona através de XP por fase, níveis de usuário e o sistema de ofensiva diária (streak) que incentiva a consistência. Isso transforma o aprendizado em um jogo, motivando o usuário a progredir.";
    }
    if (pergunta.includes("plataforma") || pergunta.includes("proggaming")) {
        return "Proggaming é uma plataforma web para o aprendizado prático de HTML, CSS e JavaScript, projetada para ser interativa e focada na aplicação imediata dos conceitos através de desafios de codificação.";
    }
    if (pergunta.includes("firebase") || pergunta.includes("banco de dados")) {
        return "Utilizamos o Firebase (Firestore) como banco de dados NoSQL. Ele armazena os dados do usuário, como XP, o progresso em cada fase, o código atual do aluno e o contador da ofensiva diária.";
    }
    if (pergunta.includes("estrutura do código") || pergunta.includes("estrutura do projeto")) {
        return "O projeto é dividido em módulos sequenciais (HTML, CSS, JS). Cada módulo tem fases com sub-níveis, onde o usuário insere o código em um editor e ele é validado por expressões regulares (Regex) em tempo real.";
    }
    if (pergunta.includes("ola") || pergunta.includes("oi") || pergunta.includes("tudo bem")) {
        return "Olá! Sou o assistente do Proggaming. Quer saber sobre HTML, CSS, JavaScript, ou sobre o TCC?";
    }
    if (pergunta.includes("sobre o desenvolvimento") || pergunta.includes("quem desenvolveu")) {
        return "O Proggaming foi desenvolvido por uma equipe de 7 pessoas, com participação ativa de todos. E a ideia comandada por <u>Gabriel Passos</u>. \n <b>Integrantes:</b> Ana Clara, Arthur Pires, Clayton Luan, Eduardo Leite, Gabriel Passos, Rafael Fortes e Igor Alves.";
    }
    if (pergunta.includes("piada")) {
        return "Por que o computador foi ao médico? Porque ele tinha um vírus!";
    }
    if (pergunta.includes("que horas são") || pergunta.includes("horas")) {
        const agora = new Date().toLocaleTimeString();
        return `Agora são ${agora}.`;
    }
    return "Desculpe, não tenho dados suficientes para responder essa pergunta. Tente digitar: 'O que vou aprender em HTML no Proggaming?', 'Qual é o objetivo deste TCC?', ou 'Como funciona a gamificação?'.";
}

document.addEventListener('DOMContentLoaded', () => {
    const sideMenu = document.getElementById('side-menu');
    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const overlay = document.getElementById('menu-overlay');
    const menuLinks = document.querySelectorAll('#side-menu a[data-question]');

    const openMenu = () => {
        sideMenu.classList.add('open');
        overlay.classList.add('show');
    }

    const closeMenu = () => {
        sideMenu.classList.remove('open');
        overlay.classList.remove('show');
    }

    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const question = link.getAttribute('data-question');

            preencherInput(question);
            closeMenu();
            enviar();
        });
    });
});

function carregarTemaSalvo() {
    const temaSalvo = localStorage.getItem('userTheme');
    const body = document.body;

    if (temaSalvo) {
        body.classList.remove('tema-claro', 'tema-escuro');
        body.classList.add(temaSalvo);
        console.log(`Tema carregado do Local Storage: ${temaSalvo}`);
    } else {
        if (!body.classList.contains('tema-claro') && !body.classList.contains('tema-escuro')) {
            body.classList.add('tema-claro');
        }
        console.log("Nenhum tema salvo. Usando o tema padrão.");
    }
}

function trocarTema() {
    const body = document.body;
    let novoTema;

    if (body.classList.contains('tema-claro')) {
        body.classList.remove('tema-claro');
        body.classList.add('tema-escuro');
        novoTema = 'tema-escuro';
        console.log("Tema alterado para Escuro");
    } else {
        body.classList.remove('tema-escuro');
        body.classList.add('tema-claro');
        novoTema = 'tema-claro';
        console.log("Tema alterado para Claro");
    }
    localStorage.setItem('userTheme', novoTema);
}

document.addEventListener('DOMContentLoaded', carregarTemaSalvo);

// function trocarTema() {
//     const body = document.body;

//     if (body.classList.contains('tema-claro')) {
//         body.classList.remove('tema-claro');
//         body.classList.add('tema-escuro');
//         console.log("Tema alterado para Escuro");
//     } else {
//         body.classList.remove('tema-escuro');
//         body.classList.add('tema-claro');
//         console.log("Tema alterado para Claro");
//     }
// }