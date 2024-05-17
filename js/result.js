
let pontuacao = localStorage.getItem('pontuacao') ? parseInt(localStorage.getItem('pontuacao')) : 0;
let perguntasAcertadas = localStorage.getItem('perguntasAcertadas') ? parseInt(localStorage.getItem('perguntasAcertadas')) : 0;

// Função para atualizar o número de perguntas acertadas no HTML
function atualizarQuantidadeAcertos(perguntasAcertadas) {
    // Seleciona o elemento com o id "quantidadeAcertos"
    const quantidadeAcertosElement = document.getElementById('quantidadeAcertos');
    // Atualiza o conteúdo desse elemento com o número de perguntas acertadas
    quantidadeAcertosElement.textContent = `${perguntasAcertadas}`;
}

function atualizarPontuacao(pontuacao) {
    // Seleciona o elemento com o id "quantidadeAcertos"
    const quantidadePontuacaoElement = document.getElementById('quantidadePontuacao');
    // Atualiza o conteúdo desse elemento com o número de perguntas acertadas
    quantidadePontuacaoElement.textContent = `${pontuacao}`;
}

// Função para atualizar a porcentagem de progresso no medidor circular
function atualizarProgressoCircular(perguntasAcertadas) {
    const progressValor = document.querySelector('.progress-valor');
    const circularProgress = document.querySelector('.circular-progress');
    let progressStarValor = 0;
    //let progressEndValor = 100;
    let progressEndValor = perguntasAcertadas > 0 ? (perguntasAcertadas / 15) * 100 : 0; // 15 é o total de perguntas
    let speed = 20;
    let progress = setInterval(() => {
        progressStarValor++;
        progressValor.textContent = `${progressStarValor}%`;
        circularProgress.style.background = `conic-gradient(#1fa4d7 ${progressStarValor * 3.6}deg, rgba(255, 255, 255, .1) ${progressStarValor * 3.6}deg)`;
        if (progressStarValor >= progressEndValor) { // Alterado para >=
            clearInterval(progress);
        }
    }, speed);
}

function responderPerguntaCorretamente() {
    perguntasAcertadas++; // Aumenta o número de perguntas acertadas
    atualizarQuantidadeAcertos(perguntasAcertadas); // Atualiza o HTML com o novo número de perguntas acertadas
    atualizarProgressoCircular(perguntasAcertadas); // Atualiza o progresso circular
}

atualizarPontuacao(pontuacao);
// Chamada da função para atualizar o número de perguntas acertadas no HTML
atualizarQuantidadeAcertos(perguntasAcertadas);
// Chamada da função para atualizar o progresso circular
atualizarProgressoCircular(perguntasAcertadas);
document.getElementById('limparLocalStorage-btn').addEventListener('click', function() {
    // Limpar o Local Storage
    localStorage.clear();
    console.log('Local Storage limpo!');
    window.location.href = '/index.html';
});


window.addEventListener('unload', function() {
    localStorage.clear();
});


window.addEventListener('popstate', function(event) {
    localStorage.clear();
});
// Função para limpar o localStorage ao clicar em um link para outra página
document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        localStorage.clear();
    });
});