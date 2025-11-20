document.addEventListener("DOMContentLoaded", function () {
    const typingTextElement = document.getElementById("typing-text");
    const texts = ["HTML, CSS e JavaScript.", "com minigames.", "rápido e fácil!!", "disputando por ranking!"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 140;
    let deletingSpeed = 100;
    let delayBetweenTexts = 1000;

    function typeWriter() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
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
});