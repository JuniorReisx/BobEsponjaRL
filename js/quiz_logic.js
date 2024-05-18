import perguntas from './perguntas.js';

let perguntaAtual = 0;
let tempoPorPergunta = 30;
let tempoRestante = tempoPorPergunta;
let intervalId;
let pontuacao = 0;
let perguntasAcertadas = 0;

document.addEventListener('DOMContentLoaded', () => {
    const contagemRegressivaDiv = document.getElementById('contagemRegressiva');
    contagemRegressivaDiv.style.display = 'flex';

    const iniciarContagemBtn = document.getElementById('iniciarContagemBtn'); 
    iniciarContagemBtn.addEventListener('click', iniciarContagemRegressivaManual);
});

function iniciarContagemRegressivaManual() {
    const iniciarContagemBtn = document.getElementById('iniciarContagemBtn');
    iniciarContagemBtn.style.display = 'none';

    iniciarContagemRegressiva();
}

function exibirNivelDaPergunta(pergunta) {
    const elementoNivel = document.getElementById('nivel');

    elementoNivel.innerHTML = '';

    const nivelNome = document.createElement('span');
    nivelNome.className = 'nivel_nome';
    nivelNome.textContent = `Nível: ${pergunta.nivel}`;

    elementoNivel.appendChild(nivelNome);

    if (perguntaAtual <= 4) {
        nivelNome.classList.add('verde');
    } else if (perguntaAtual <= 9) {
        nivelNome.classList.add('amarelo');
    } else if (perguntaAtual <= 14) {
        nivelNome.classList.add('vermelho');
    }
}

function exibirNumeroDaPergunta(perguntaAtual) {
    const elementoNumero = document.getElementById('questao_numero');

    elementoNumero.innerHTML = '';

    const numeroQuestao = document.createElement('span');
    numeroQuestao.className = 'numero_questao';
    numeroQuestao.textContent = `${perguntaAtual + 1} / ${perguntas.length}`;

    elementoNumero.appendChild(numeroQuestao);
}

function exibirPergunta() {
    const { pergunta, alternativas } = perguntas[perguntaAtual];
    document.getElementById("Questoes").textContent = pergunta;

    const alternativasEmbaralhadas = alternativas.sort(() => Math.random() - 0.5);
    const alternativasLista = document.querySelector(".alternativas-lista");

    exibirNivelDaPergunta(perguntas[perguntaAtual]);
    exibirNumeroDaPergunta(perguntaAtual);

    alternativasLista.innerHTML = alternativasEmbaralhadas.map((alternativa, index) => `
        <li class="alternativa">
            <input type="radio" name="opcaoResposta" class="btn-radio" aria-label="Option button" id="opcao${index + 1}" />
            <label for="opcao${index + 1}" class="alternativa-label">
                <div class="alternativa_letra">
                    <img width="30" height="30" src="https://img.icons8.com/color/48/${String.fromCharCode(97 + index)}-cute.png" alt="${String.fromCharCode(97 + index)}-cute"/>
                </div>
                <div class="alternativa_texto">${alternativa}</div>
            </label>
        </li>
    `).join('');

    tempoRestante = tempoPorPergunta;  // Configura o tempoRestante antes de iniciar o contador

    const verificarRespostaBtn = document.getElementById('verificarResposta');
    const pausarRetomarBtn = document.getElementById('pausarQuiz');

    verificarRespostaBtn.addEventListener('click', verificarResposta);
    pausarRetomarBtn.addEventListener('click', pausarRetomarQuiz);

    iniciarContador();
}

function showToast(message) {
    const toastContainer = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);

    setTimeout(() => {
        toast.remove();
    }, 3300);
}

function verificarResposta() {
    const respostaUsuario = document.querySelector('input[name="opcaoResposta"]:checked');

    if (!respostaUsuario) {
        showToast('Por favor, selecione uma alternativa.');
        return;
    }

    const respostaCorreta = perguntas[perguntaAtual].resposta;
    const respostaCorretaUsuario = respostaUsuario.nextElementSibling.querySelector('.alternativa_texto').textContent === respostaCorreta;

    if (respostaCorretaUsuario) {
        const pontosMaximos = 100;
        const pontosPorSegundo = pontosMaximos / tempoPorPergunta;
        const pontuacaoPergunta = Math.max(1, Math.ceil(pontosMaximos - pontosPorSegundo * (tempoPorPergunta - tempoRestante)));
        pontuacao += pontuacaoPergunta;
        
        perguntasAcertadas++;
        
        showToast('Resposta correta!');
        perguntaAtual++;
        
        if (perguntaAtual < perguntas.length) {
            tempoRestante = tempoPorPergunta;
            exibirPergunta();
            iniciarContador();
        } else {
            encerrarQuiz(true);
        }
    } else {
        showToast('Resposta incorreta. Você perdeu!');
        encerrarQuiz(false);
        return;
    }
}

function iniciarContador() {
    clearInterval(intervalId);
    const display = document.querySelector('#timer');
    exibirTempo(display);

    intervalId = setInterval(() => {
        atualizarCorTimer(tempoRestante, display);

        if (tempoRestante <= 0) {
            encerrarQuiz();
        } else {
            tempoRestante--;
            exibirTempo(display);
        }
    }, 1000);
}

function atualizarCorTimer(timer, display) {
    display.classList.remove('vermelho', 'amarelo', 'verde');

    if (timer <= 60 / 6) {
        display.classList.add('vermelho');
    } else if (timer <= 60 / 4) {
        display.classList.add('amarelo');
    } else {
        display.classList.add('verde');
    }
}

function pausarRetomarQuiz() {
    const overlay = document.getElementById('overlay');
    const retomarButton = document.getElementById('retomar');
    const recomeçarButton = document.getElementById('recomeçar');
    const sairButton = document.getElementById('sair');

    if (intervalId) {
        clearInterval(intervalId);
        overlay.style.display = 'flex';
        retomarButton.style.display = 'flex';
        recomeçarButton.style.display = 'flex';
        sairButton.style.display = 'flex';
    } else {
        overlay.style.display = 'none';
        retomarButton.style.display = 'none';
        iniciarContador();
    }
}

function retomarQuiz() {
    const overlay = document.getElementById('overlay');
    const retomarButton = document.getElementById('retomar');

    overlay.style.display = 'none';
    retomarButton.style.display = 'none';
    iniciarContador();
}

window.retomarQuiz = retomarQuiz;

function encerrarQuiz(venceu) {
    clearInterval(intervalId);

    const telaSucesso = document.getElementById('telaSucesso');
    const telaDerrota = document.getElementById('telaDerrota');

    if (venceu) {
        console.log('Parabéns! Você venceu! Pontuação final: ' + pontuacao);
        console.log('Você acertou ' + perguntasAcertadas + ' perguntas.');

        telaSucesso.style.display = 'flex';
        document.getElementById('quantidadePontuacao').innerText = pontuacao;
        document.getElementById('quantidadeAcertos').innerText = perguntasAcertadas;

    } else {
        console.log('Você perdeu. Pontuação final: ' + pontuacao);
        console.log('Você acertou ' + perguntasAcertadas + ' perguntas.');

        telaDerrota.style.display = 'flex';
        document.getElementById('quantidadePontuacao').innerText = pontuacao;
        document.getElementById('quantidadeAcertos').innerText = perguntasAcertadas;
    }

    setTimeout(() => {
        if (venceu) {
            window.location.href = '/index.html';
        } else {
            window.location.href = '/index.html';
        }
    }, 3000);
}

function exibirTempo(display) {
    const minutes = parseInt(tempoRestante / 60, 10);
    const seconds = parseInt(tempoRestante % 60, 10);
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function iniciarContagemRegressiva() {
    const contagemRegressivaSpan = document.getElementById('contagemRegressivaSpan');
    let contagem = 3;

    const intervalIdContagem = setInterval(() => {
        contagemRegressivaSpan.textContent = contagem;

        if (contagem <= 0) {
            clearInterval(intervalIdContagem);
            contagemRegressivaSpan.parentNode.style.display = 'none';
            exibirPergunta();
        }

        if (contagem == 3) {
            get_ready();
        }

        contagem--;
    }, 1000);
}

function recomeçarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    perguntasAcertadas = 0;
    tempoRestante = tempoPorPergunta;
    exibirPergunta();
    iniciarContador();
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

window.recomeçarQuiz = recomeçarQuiz;

function sairQuiz() {
    const confirmacao = confirm('Tem certeza que deseja sair do quiz? Sua pontuação não será salva.');

    if (confirmacao) {
        window.location.href = '/index.html';
    }
}

window.sairQuiz = sairQuiz;

