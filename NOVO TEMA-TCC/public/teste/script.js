function aplicarCSS() {
    const input = document.getElementById("cssInput").value;
    const wrapper = document.getElementById("playerWrapper");

    // Aplica apenas as propriedades flex no playerWrapper
    wrapper.style.cssText = `display: flex; align-items: stretch; ${input}`;

    // Checagem de posição
    const player = document.getElementById("player");
    const target = document.getElementById("target");

    const playerRect = player.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const feedback = document.getElementById("feedback");

    const closeEnough =
        Math.abs(playerRect.left - targetRect.left) < 5 &&
        Math.abs(playerRect.top - targetRect.top) < 5;

    if (closeEnough) {
        feedback.textContent = "✅ Acertou!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Ainda não está certo...";
        feedback.style.color = "red";
    }
}