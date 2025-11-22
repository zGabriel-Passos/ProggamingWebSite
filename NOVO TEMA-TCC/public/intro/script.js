document.addEventListener('DOMContentLoaded', function () {
    const modalForms = document.getElementById("modal-forms");

    if (modalForms) {
        modalForms.innerHTML = `
            <form id="feedback-form">
                <label for="email-user">Email Verídico:</label>
                <input type="email" id="email-user" placeholder="teste@gmail.com" required>
                
                <label for="name-user">Nome:</label>
                <input type="text" id="name-user" placeholder="Gabriel" required>
                
                <label for="msg-user">Mensagem:</label>
                <textarea id="msg-user" placeholder="Dúvida, sugestão?" required></textarea>
                <div id="status" style="font-size: 12px; margin-top: 10px;"></div>
                
                <button id="mandar-msg-user" type="submit">Enviar Mensagem</button>
            </form>
        `;
    }

    const form = document.getElementById('feedback-form');
    const inputEmail = document.getElementById('email-user');
    const inputName = document.getElementById('name-user');
    const textareaMsg = document.getElementById('msg-user');
    const btnEnviar = document.getElementById('mandar-msg-user');
    const statusElement = document.getElementById('status');

    async function saveMessage(email, name, message) {
        if (!db) {
            statusElement.innerHTML = "Erro: O banco de dados não está disponível.";
            return;
        }

        statusElement.innerHTML = 'Enviando...';
        try {
            const docRef = await db.collection("mensagens").add({
                email: email,
                name: name,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log("Mensagem salva com sucesso! ID: ", docRef.id);
            statusElement.innerHTML = "Mensagem enviada! Responderemos pelo o email.";

            inputEmail.value = '';
            inputName.value = '';
            textareaMsg.value = '';

        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
            statusElement.innerHTML = "Ocorreu um erro ao tentar enviar a mensagem. Verifique a conexão.";
        }
    }

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.reportValidity()) {
                statusElement.innerHTML = "Por favor, corrija os campos destacados.";
                return;
            }

            const email = inputEmail.value.trim();
            const name = inputName.value.trim();
            const message = textareaMsg.value.trim();

            if (email === '' || name === '' || message === '') {
                statusElement.innerHTML = "Por favor, preencha todos os campos antes.";
                return;
            }

            saveMessage(email, name, message);
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    function modalChat() {
        const btnChat = document.getElementById('btn-chat');
        const modalChat = document.getElementById('modal-chat');
        const main = document.getElementById('main');

        if (btnChat && modalChat) {
            btnChat.addEventListener("click", function () {
                const isModalOpen = modalChat.classList.toggle("active");

                btnChat.classList.toggle("modal-open");

                if (isModalOpen) {
                    btnChat.innerHTML = "<i class='bx bx-x'></i>";
                    main.classList.add('body-efeito')
                } else {
                    btnChat.innerHTML = "<i class='bx bxs-message-square-detail'></i>";
                    main.classList.remove('body-efeito')
                }
            });
        }
    }
    modalChat();
});

document.addEventListener("DOMContentLoaded", function () {
    const typingTextElement = document.getElementById("typing-text");
    const texts = ["HTML, CSS e JavaScript.", "com minigames.", "rápido e fácil!!", "disputando por ranking!"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let deletingSpeed = 100;
    let delayBetweenTexts = 1000;

    function typeWriter() {
        const currentText = texts[textIndex];
        if (typingTextElement) {
            if (isDeleting) {
                typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            } else {
                typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            }
        }
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        let speed = isDeleting ? deletingSpeed : typingSpeed;
        if (!isDeleting && charIndex === currentText.length) {
            speed = delayBetweenTexts;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex++;
            if (textIndex === texts.length) {
                textIndex = 0;
            }
            speed = typingSpeed;
        }
        setTimeout(typeWriter, speed);
    }
    typeWriter();

    const typingTextarea = document.getElementById("typing-textarea");
    const textareaTexts = ["O que vou aprender?", "Como funciona a gamificação?", "O que é o Proggaming?", "Quem desenvolveu o Proggaming?"];
    let textareaTextIndex = 0;
    let textareaCharIndex = 0;
    let textareaIsDeleting = false;
    let textareaTypingSpeed = 80;
    let textareaDeletingSpeed = 40;
    let textareaDelayBetweenTexts = 900;

    function typeWriterTextarea() {
        const currentText = textareaTexts[textareaTextIndex];
        if (typingTextarea) {
            if (textareaIsDeleting) {
                typingTextarea.value = currentText.substring(0, textareaCharIndex - 1);
            } else {
                typingTextarea.value = currentText.substring(0, textareaCharIndex + 1);
            }
        }
        if (textareaIsDeleting) {
            textareaCharIndex--;
        } else {
            textareaCharIndex++;
        }
        let speed = textareaIsDeleting ? textareaDeletingSpeed : textareaTypingSpeed;
        if (!textareaIsDeleting && textareaCharIndex === currentText.length) {
            speed = textareaDelayBetweenTexts;
            textareaIsDeleting = true;
        } else if (textareaIsDeleting && textareaCharIndex === 0) {
            textareaIsDeleting = false;
            textareaTextIndex++;
            if (textareaTextIndex === textareaTexts.length) {
                textareaTextIndex = 0;
            }
            speed = textareaTypingSpeed;
        }
        setTimeout(typeWriterTextarea, speed);
    }
    typeWriterTextarea();
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];
    const galleryImages = document.querySelectorAll(".imagens img");

    let currentZoom = 1;
    const zoomStep = 0.1;

    let isDragging = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;


    function applyTransform() {
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
    }

    function resetImageState() {
        currentZoom = 1;
        translateX = 0;
        translateY = 0;
        applyTransform();
        modalImg.classList.remove('draggable');
    }

    galleryImages.forEach(img => {
        img.onclick = function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            resetImageState();
        }
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
    }

    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    modalImg.addEventListener('wheel', (event) => {
        event.preventDefault();

        const oldZoom = currentZoom;

        if (event.deltaY < 0) {
            currentZoom = Math.min(5, currentZoom + zoomStep);
        } else {
            currentZoom = Math.max(1, currentZoom - zoomStep);
        }

        if (currentZoom === 1) {
            resetImageState();
        } else {
            if (oldZoom !== currentZoom) {
                const scaleFactor = currentZoom / oldZoom;
                const rect = modalImg.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;

                translateX -= (scaleFactor - 1) * (mouseX - rect.width / 2);
                translateY -= (scaleFactor - 1) * (mouseY - rect.height / 2);
            }

            modalImg.classList.add('draggable');
            applyTransform();
        }
    });

    modalImg.addEventListener('mousedown', (event) => {
        if (currentZoom > 1) {
            isDragging = true;
            startX = event.clientX - translateX;
            startY = event.clientY - translateY;
            event.preventDefault();
        }
    });

    document.addEventListener('mousemove', (event) => {
        if (!isDragging) return;

        translateX = event.clientX - startX;
        translateY = event.clientY - startY;

        applyTransform();
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mouseleave', () => {
        isDragging = false;
    });
});
