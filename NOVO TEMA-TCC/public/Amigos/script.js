import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
    getFirestore, collection, doc, getDoc, getDocs, query, where, updateDoc,
    onSnapshot, arrayUnion, arrayRemove
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyClRHfJuTSogkbWLaaUKsSBGN1KiT5xuUc",
    authDomain: "proggamingpage.firebaseapp.com",
    projectId: "proggamingpage",
    storageBucket: "proggamingpage.firebasestorage.app",
    messagingSenderId: "911283259283",
    appId: "1:911283259283:web:0b9be83ed5e07391360a66",
    measurementId: "G-TQP4LNPYQ1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const input = document.getElementById('apelidoInput');
const btnPesquisar = document.getElementById('btnPesquisar');
const resultadosDiv = document.getElementById('resultadosPesquisa');
const solicitacoesDiv = document.getElementById('listaSolicitacoes');
const amigosDiv = document.getElementById('listaAmigos');
const meHeader = document.getElementById('meHeader');
const perfilSpan = document.getElementById('perfil');
const welcomeText = document.getElementById("welcome");

let me = null;
let lastSearchTerm = '';

const usersCol = () => collection(db, 'usuarios');
const userRef = (uid) => doc(db, 'usuarios', uid);

async function getUserData(uid) {
    const snap = await getDoc(userRef(uid));
    if (!snap.exists()) return null;
    return { uid, ...snap.data() };
}

async function getManyUsers(uids) {
    if (!uids || uids.length === 0) return [];
    const list = await Promise.all(uids.map(getUserData));
    return list.filter(Boolean);
}

function placeholder(el, msg) {
    el.innerHTML = `<div class="empty">${msg}</div>`;
}

function userLine(u, actionsHTML = '') {
    const xp = typeof u.xp === 'number' ? u.xp : (u.xp?.total ?? 0);
    const avatarSrc = u.avatarUrl || '../assets/avatars/avatar.jpg';
    return `
    <div class="item" data-uid="${u.uid}">
        <img class="user-avatar" src="${avatarSrc}" alt="Avatar">
        <div class="meta">
            <div><strong>${u.apelido ?? '(sem apelido)'}</strong> <span class="badge">XP ${xp}</span></div>
        </div>
        <div class="pill">${actionsHTML}</div>
    </div>`;
}

async function renderSolicitacoes() {
    const rec = me?.solicitacoesRecebidas ?? [];
    if (rec.length === 0) return placeholder(solicitacoesDiv, 'Sem solicitações no momento.');
    const users = await getManyUsers(rec);
    solicitacoesDiv.innerHTML = users.map(u => userLine(u,
        `<button class="ok" data-action="aceitar">Aceitar</button>
        <button class="danger" data-action="rejeitar">Rejeitar</button>`
    )).join('');
}

async function renderAmigos() {
    const list = me?.amigos ?? [];
    if (list.length === 0) return placeholder(amigosDiv, 'Você ainda não adicionou amigos.');
    const users = await getManyUsers(list);
    amigosDiv.innerHTML = users.map(u => userLine(u,
        `<button class="danger" data-action="excluir">Excluir</button>`
    )).join('');
}

async function pesquisar() {
    const term = input.value.trim();
    if (term === '') {
        lastSearchTerm = '';
        return placeholder(resultadosDiv, 'Digite um apelido para pesquisar.');
    }
    lastSearchTerm = term;
    resultadosDiv.innerHTML = '<div class="empty">⏳ Pesquisando…</div>';

    try {
        const q = query(usersCol(), where('apelido', '==', term));
        const qs = await getDocs(q);

        if (qs.empty) {
            return placeholder(resultadosDiv, 'Nenhum usuário encontrado com esse apelido.');
        }

        const results = [];
        qs.forEach(docSnap => { results.push({ uid: docSnap.id, ...docSnap.data() }); });

        resultadosDiv.innerHTML = results.map(u => {
            if (u.uid === me.uid) return userLine(u, '<span class="status">Você</span>');
            const isFriend = (me.amigos ?? []).includes(u.uid);
            const sent = (me.solicitacoesEnviadas ?? []).includes(u.uid);
            const received = (me.solicitacoesRecebidas ?? []).includes(u.uid);

            let actions = '';
            if (isFriend) {
                actions = '<span class="status">✅ Já é seu amigo</span>';
            } else if (received) {
                actions = `<button class="ok" data-action="aceitar">Aceitar</button>
                           <button class="danger" data-action="rejeitar">Rejeitar</button>`;
            } else if (sent) {
                actions = '<span class="status">⏳ Solicitação enviada</span>';
            } else {
                actions = '<button data-action="enviar">Enviar solicitação</button>';
            }
            return userLine(u, actions);
        }).join('');
    } catch (error) {
        console.error("Erro ao pesquisar:", error);
        resultadosDiv.innerHTML = `<div class="empty">❌ Erro ao pesquisar. Tente novamente mais tarde.</div>`;
    }
}

async function enviarSolicitacao(destUid) {
    if (destUid === me.uid) return;
    const parentEl = document.querySelector(`.item[data-uid="${destUid}"]`);
    if (parentEl) parentEl.classList.add('sending');

    try {
        await Promise.all([
            updateDoc(userRef(me.uid), { solicitacoesEnviadas: arrayUnion(destUid) }),
            updateDoc(userRef(destUid), { solicitacoesRecebidas: arrayUnion(me.uid) })
        ]);
        console.log("Solicitação enviada com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar a solicitação:", error);
    }

    if (parentEl) parentEl.classList.remove('sending');
}

async function aceitarSolicitacao(fromUid) {
    const parentEl = document.querySelector(`.item[data-uid="${fromUid}"]`);
    if (parentEl) parentEl.classList.add('sending');

    await Promise.all([
        updateDoc(userRef(me.uid), {
            solicitacoesRecebidas: arrayRemove(fromUid),
            amigos: arrayUnion(fromUid)
        }),
        updateDoc(userRef(fromUid), {
            solicitacoesEnviadas: arrayRemove(me.uid),
            amigos: arrayUnion(me.uid)
        })
    ]);
    if (parentEl) parentEl.classList.remove('sending');
}

async function rejeitarSolicitacao(fromUid) {
    const parentEl = document.querySelector(`.item[data-uid="${fromUid}"]`);
    if (parentEl) parentEl.classList.add('sending');

    await Promise.all([
        updateDoc(userRef(me.uid), { solicitacoesRecebidas: arrayRemove(fromUid) }),
        updateDoc(userRef(fromUid), { solicitacoesEnviadas: arrayRemove(me.uid) })
    ]);
    if (parentEl) parentEl.classList.remove('sending');
}

async function excluirAmigo(friendUid) {
    const parentEl = document.querySelector(`.item[data-uid="${friendUid}"]`);
    if (parentEl) parentEl.classList.add('sending');

    try {
        await Promise.all([
            updateDoc(userRef(me.uid), { amigos: arrayRemove(friendUid) }),
            updateDoc(userRef(friendUid), { amigos: arrayRemove(me.uid) })
        ]);
        console.log("Amigo excluído com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir amigo:", error);
    }

    if (parentEl) parentEl.classList.remove('sending');
}

solicitacoesDiv.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const parent = e.target.closest('.item');
    const uid = parent?.dataset?.uid;
    if (!uid) return;
    if (btn.dataset.action === 'aceitar') await aceitarSolicitacao(uid);
    if (btn.dataset.action === 'rejeitar') await rejeitarSolicitacao(uid);
});

resultadosDiv.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const parent = e.target.closest('.item');
    const uid = parent?.dataset?.uid;
    if (!uid) return;
    const action = btn.dataset.action;
    if (action === 'enviar') await enviarSolicitacao(uid);
    if (action === 'aceitar') await aceitarSolicitacao(uid);
    if (action === 'rejeitar') await rejeitarSolicitacao(uid);
});

amigosDiv.addEventListener('click', async (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const parent = e.target.closest('.item');
    const uid = parent?.dataset?.uid;
    if (!uid) return;
    if (btn.dataset.action === 'excluir') {
        const confirmacao = confirm("Tem certeza que deseja remover este amigo?");
        if (confirmacao) {
            await excluirAmigo(uid);
        }
    }
});

btnPesquisar.addEventListener('click', pesquisar);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') pesquisar(); });

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "../index.html";
        return;
    }

    onSnapshot(userRef(user.uid), async (snap) => {
        if (!snap.exists()) {
            await updateDoc(userRef(user.uid), {
                apelido: user.email.split('@')[0],
                avatarUrl: '../assets/avatars/avatar.jpg',
                xp: 0
            });
            onSnapshot(userRef(user.uid), (newSnap) => {
                if (newSnap.exists()) {
                    me = { uid: user.uid, ...newSnap.data() };
                    updateUI();
                }
            });
            return;
        }

        me = { uid: user.uid, ...snap.data() };
        updateUI();
    });
});

function updateUI() {
    meHeader.textContent = `Logado como: ${me.email}`;
    perfilSpan.innerText = me.apelido || me.email.split('@')[0];
    welcomeText.textContent = `Olá, ${me.email} 👋`;

    renderSolicitacoes();
    renderAmigos();
    if (lastSearchTerm) {
        pesquisar();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.body.classList.add("loaded");
        setTimeout(() => {
            document.body.style.overflow = "auto";
        }, 300);
    }, 300);
});