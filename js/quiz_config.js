const audioMusicaQuiz = new Audio('/assets/music/mcbob.mp3');
audioMusicaQuiz.loop = true;

const get_ready_audio = new Audio('/assets/music/get_ready_1-104602.mp3');
const next_level_audio = new Audio('/assets/music/new-level-142995.mp3');
const fail_level_audio = new Audio('/assets/music/fail-144746.mp3');
const happy_pop_audio = new Audio('/assets/music/happy-pop-2-185287.mp3');

let isMusicPlaying = false;
let isEfeitosPlaying = false;

function playMusic() {
    if (!isMusicPlaying) {
        audioMusicaQuiz.play()
            .then(() => {
                isMusicPlaying = true;
                console.log('Música reproduzindo.');
            })
            .catch(error => {
                console.error('Erro ao reproduzir música:', error.message);
            });
    }
}

function stopEfeitos() {
    get_ready_audio.pause();
    get_ready_audio.currentTime = 0;

    next_level_audio.pause();
    next_level_audio.currentTime = 0;

    happy_pop_audio.pause();
    happy_pop_audio.currentTime = 0;

    isEfeitosPlaying = false;
    console.log('Efeitos parados.');
}

function get_ready() {
    console.log('Tocando efeito get_ready...');
    stopEfeitos();

    get_ready_audio.play()
        .then(() => {
            isEfeitosPlaying = true;
            console.log('Efeito get_ready reproduzindo.');
        })
        .catch(error => {
            console.error('Erro ao reproduzir efeito sonoro 1:', error.message);
        });
}

function next_level() {
    console.log('Tocando efeito next_level...');
    stopEfeitos();

    next_level_audio.play()
        .then(() => {
            isEfeitosPlaying = true;
            console.log('Efeito next_level reproduzindo.');
        })
        .catch(error => {
            console.error('Erro ao reproduzir efeito sonoro 2:', error.message);
        });
}

function fail_level() {
    console.log('Tocando efeito fail_level...');
    stopEfeitos();

    fail_level_audio.play()
        .then(() => {
            isEfeitosPlaying = true;
            console.log('Efeito fail_level reproduzindo.');
        })
        .catch(error => {
            console.error('Erro ao reproduzir efeito sonoro 2:', error.message);
        });
}


function happy_pop() {
    console.log('Tocando efeito happy_pop...');
    if (!isEfeitosPlaying) {
        happy_pop_audio.currentTime = 0;
        happy_pop_audio.play()
            .then(() => {
                console.log('Efeito happy_pop reproduzindo.');
            })
            .catch(error => {
                console.error('Erro ao reproduzir efeito sonoro 3:', error.message);
            });
    } else {
        happy_pop_audio.currentTime = 0;
        happy_pop_audio.play()
            .then(() => {
                console.log('Efeito happy_pop reproduzindo.');
            })
            .catch(error => {
                console.error('Erro ao reproduzir efeito sonoro 3:', error.message);
            });
    }
}

function toggleMute(tipo) {
    console.log(`Toggling mute para ${tipo}...`);
    if (tipo === 'musica') {
        audioMusicaQuiz.muted = !audioMusicaQuiz.muted;
        if (audioMusicaQuiz.muted) {
            stopEfeitos();
        }
    } else if (tipo === 'efeitos') {
        get_ready_audio.muted = !get_ready_audio.muted;
        next_level_audio.muted = !next_level_audio.muted;
        happy_pop_audio.muted = !happy_pop_audio.muted;
        if (audioMusicaQuiz.muted) {
            stopEfeitos();
        }
    }
}

document.addEventListener('click', playMusic);
document.addEventListener('click', happy_pop);

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        playMusic();
    }, 1000);
});
