const form = document.getElementById('form-agendamento');
const agendamentosLista = document.getElementById('agendamentos-lista');
const agendamentos = [];
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const dataHora = document.getElementById('data-hora').value;
    const descricao = document.getElementById('descricao').value;
    const novoAgendamento = { dataHora, descricao };
    agendamentos.push(novoAgendamento);
    exibirAgendamentos();
    form.reset();
});
function exibirAgendamentos() {
    agendamentosLista.innerHTML = '';
    agendamentos.forEach(function(agendamento) {
        const div = document.createElement('div');
        div.classList.add('agendamento-item');
        div.innerHTML = `
            <div class="container_Agendamento">
                <strong>Data e Hora:</strong> ${new Date(agendamento.dataHora).toLocaleString()} <br>
                <strong>Descrição:</strong> ${agendamento.descricao}
            </div>`;
        agendamentosLista.appendChild(div);
    });
}