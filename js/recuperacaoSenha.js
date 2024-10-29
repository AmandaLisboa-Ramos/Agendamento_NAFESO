document.getElementById("recoverForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const messageDiv = document.getElementById("message");

   if (emailInput.value) {
        setTimeout(() => {
            messageDiv.textContent = "E-mail enviado com sucesso! Verifique sua caixa de entrada para o link de recuperação.";
            emailInput.value = "";
        }, 1000);
    } else {
        messageDiv.textContent = "Por favor, insira um e-mail válido.";
    }
});