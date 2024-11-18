const formCadastro = document.getElementById('formCadastro');
formCadastro.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Cadastro realizado com sucesso!');
    window.location.href = './index.html'
});
