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
