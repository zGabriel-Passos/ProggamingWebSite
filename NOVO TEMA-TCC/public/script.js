const firebaseConfig = {
  apiKey: "AIzaSyClRHfJuTSogkbWLaaUKsSBGN1KiT5xuUc",
  authDomain: "proggamingpage.firebaseapp.com",
  projectId: "proggamingpage",
  storageBucket: "proggamingpage.firebasestorage.app",
  messagingSenderId: "911283259283",
  appId: "1:911283259283:web:0b9be83ed5e07391360a66",
  measurementId: "G-TQP4LNPYQ1"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authButton = document.getElementById("auth-button");
const googleButton = document.getElementById("google-login");
const toggleText = document.getElementById("toggle");
const formTitle = document.getElementById("form-title");
const errorDiv = document.getElementById("error");

let isLogin = true;

toggleText.onclick = () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Cadastrar";
  authButton.textContent = isLogin ? "Entrar" : "Cadastrar";
  toggleText.textContent = isLogin
    ? "Não tem uma conta? Cadastre-se"
    : "Já tem uma conta? Entrar";
  errorDiv.textContent = "";
};

authButton.onclick = async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  errorDiv.textContent = "";

  try {
    if (isLogin) {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        window.location.href = "./TelaPrincipal/";
      } else {
        errorDiv.textContent = "Verifique seu e-mail antes de continuar, cheque o spam do seu email.";
        await auth.signOut();
      }
    } else {
      await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser.sendEmailVerification();
      alert("Conta criada! Verifique seu e-mail, cheque o spam do seu email.");
    }
  } catch (err) {
    errorDiv.textContent = err.message;
  }
};

googleButton.onclick = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    window.location.href = "./TelaPrincipal/";
  } catch (err) {
    errorDiv.textContent = err.message;
  }
};

auth.onAuthStateChanged(user => {
  const currentPage = window.location.pathname;

  if (user && (user.emailVerified || user.providerData[0].providerId === 'google.com')) {
    if (!currentPage.includes("./TelaPrincipal/")) {
      window.location.href = "./TelaPrincipal/";
    }
  } else {
    if (currentPage.includes("./TelaPrincipal/")) {
      window.location.href = "../";
    }
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
const resetPasswordButton = document.getElementById("reset-password");

resetPasswordButton.onclick = async () => {
  const email = emailInput.value;

  if (!email) {
    errorDiv.textContent = "Por favor, digite seu e-mail para redefinir a senha.";
    return;
  }

  try {
    await auth.sendPasswordResetEmail(email);
    alert("E-mail para redefinição de senha enviado. Verifique sua caixa de entrada, cheque o spam do seu email.");
  } catch (err) {
    errorDiv.textContent = err.message;
  }
};

const overlay = document.getElementById('overlay-aviso');
const btnFechar = document.getElementById('btn-fechar');
const intervalo = 5 * 60 * 1000; // 5 minutos em ms
const delayPrimeiraExibicao = 1000; // 10 segundos em ms

function mostrarAviso() {
  overlay.classList.add('mostrar');
}

function esconderAviso() {
  overlay.classList.remove('mostrar');
}

btnFechar.addEventListener('click', () => {
  esconderAviso();
  localStorage.setItem('ultimaExibicao', Date.now());
});

window.onload = () => {
  const ultimaExibicao = localStorage.getItem('ultimaExibicao');
  const agora = Date.now();

  if (!ultimaExibicao || (agora - ultimaExibicao) > intervalo) {
    setTimeout(mostrarAviso, delayPrimeiraExibicao);
  }
};