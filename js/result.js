document.addEventListener('DOMContentLoaded', function () {
    let pontuacao = localStorage.getItem('pontuacao') ? parseInt(localStorage.getItem('pontuacao')) : 0;
    let perguntasAcertadas = localStorage.getItem('perguntasAcertadas') ? parseInt(localStorage.getItem('perguntasAcertadas')) : 0;

    // Função para atualizar o número de perguntas acertadas no HTML
    function atualizarQuantidadeAcertos(perguntasAcertadas) {
        const quantidadeAcertosElement = document.getElementById('quantidadeAcertos');
        if (quantidadeAcertosElement) {
            quantidadeAcertosElement.textContent = `${perguntasAcertadas}`;
        }
    }

    function atualizarPontuacao(pontuacao) {
        const quantidadePontuacaoElement = document.getElementById('quantidadePontuacao');
        if (quantidadePontuacaoElement) {
            quantidadePontuacaoElement.textContent = `${pontuacao}`;
        }
    }

    function atualizarProgressoCircular(perguntasAcertadas) {
        const progressValor = document.querySelector('.progress-valor');
        const circularProgress = document.querySelector('.circular-progress');
        let progressStarValor = 0;
        let progressEndValor = perguntasAcertadas > 0 ? (perguntasAcertadas / 15) * 100 : 0;
        let speed = 20;

        if (progressValor && circularProgress) {
            let progress = setInterval(() => {
                progressStarValor++;
                progressValor.textContent = `${progressStarValor}%`;
                circularProgress.style.background = `conic-gradient(#1fa4d7 ${progressStarValor * 3.6}deg, rgba(255, 255, 255, .1) ${progressStarValor * 3.6}deg)`;
                if (progressStarValor >= progressEndValor) {
                    clearInterval(progress);
                }
            }, speed);
        }
    }

    function responderPerguntaCorretamente() {
        perguntasAcertadas++;
        atualizarQuantidadeAcertos(perguntasAcertadas);
        atualizarProgressoCircular(perguntasAcertadas);
    }

    atualizarPontuacao(pontuacao);
    atualizarQuantidadeAcertos(perguntasAcertadas);
    atualizarProgressoCircular(perguntasAcertadas);

    const limparBtn = document.getElementById('limparLocalStorage-btn');
    if (limparBtn) {
        limparBtn.addEventListener('click', () => {
            localStorage.clear();
            console.log('Local Storage limpo!');
            window.location.href = '/index.html';
        });
    }

    window.addEventListener('unload', function () {
        localStorage.clear();
    });

    window.addEventListener('popstate', function (event) {
        localStorage.clear();
    });

    document.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            localStorage.clear();
        });
    });
});
