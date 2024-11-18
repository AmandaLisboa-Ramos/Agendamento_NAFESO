document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const feedback = document.getElementById('feedback').value;
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = '';

    if (!name || !feedback) {
        errorMsg.textContent = 'Por favor, preencha todos os campos!';
        return;
    }
    const newReview = document.createElement('div');
    newReview.classList.add('review');
    newReview.innerHTML = `<h3>${name}</h3><p>"${feedback}"</p>`;
    document.getElementById('reviews').appendChild(newReview);
    document.getElementById('name').value = '';
    document.getElementById('feedback').value = '';

    alert('Feedback enviado com sucesso!');
});