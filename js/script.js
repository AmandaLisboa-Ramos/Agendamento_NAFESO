document.getElementById("loginButton").addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();


   if (username === "" || password === "") {
         alert("Por favor, preencha todos os campos antes de continuar.");
   } else {
       window.location.href = "./agendamento.html";
    }
});
