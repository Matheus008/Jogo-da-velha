const cells = document.querySelectorAll('[data-celula]');
const board = document.getElementById('board');
const turnoJogador = document.getElementById('turnoJogador');
const button = document.getElementById('reiniciar');
const player1XouO = document.getElementById('player1');
const player2XouO = document.getElementById('player2');
const placarPlayer1 = document.getElementById('placarPlayer1');
const placarPlayer2 = document.getElementById('placarPlayer2');
const X_PLAYER = 'X';
const O_PLAYER = 'O';
let turno;
let PLAYER_X_ou_O;
let PLAYER_1 = 0;
let PLAYER_2 = 0;

const COMBINACAO_GANHAR = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

iniciaJogo();

button.addEventListener('click', iniciaJogo);

function iniciaJogo() {
    turno = false;
    cells.forEach(cell => {
        cell.classList.remove(X_PLAYER);
        cell.classList.remove(O_PLAYER);
        cell.classList.remove("ganhador");
        cell.classList.remove("bloqueio");
        cell.textContent = " "
        cell.removeEventListener('click', manipularClick);
        cell.addEventListener('click', manipularClick, { once: true });
        
    });
    trocaDeLado();
    player1XouO.textContent = PLAYER_X_ou_O ? X_PLAYER : O_PLAYER;
    player2XouO.textContent = PLAYER_X_ou_O ? O_PLAYER : X_PLAYER;
    placarPlayer1.textContent = PLAYER_1;
    placarPlayer2.textContent = PLAYER_2;
    marcarNoTabuleiro();
}

function manipularClick(e) {
    const cell = e.target;
    const jogadorAtual = turno ? O_PLAYER : X_PLAYER;
    lugarMarcado(cell, jogadorAtual);
    cell.classList.add("bloqueio");
    cell.textContent = jogadorAtual;
    if (verificaVencedor(jogadorAtual)) {
        combinacaoVencedora(jogadorAtual);
        cells.forEach(cell =>{
            cell.classList.add("bloqueio");
        });

        if(PLAYER_X_ou_O && !turno) {
            ++PLAYER_1;
        }else if(!PLAYER_X_ou_O && !turno) {
            ++PLAYER_2;
        }else if(!PLAYER_X_ou_O && turno) {
            ++PLAYER_1;
        }else {
            ++PLAYER_2;
        }
    } else if (verificaEmpate()) {
        //fimDeJogo(true);
    } else {
        trocarTurno();
        marcarNoTabuleiro();
    }
}

function lugarMarcado(cell, jogadorAtual) {
    cell.classList.add(jogadorAtual);
}

function combinacaoVencedora(jogadorAtual) {
    const combinacaoGanhadora = COMBINACAO_GANHAR.find(combinacao => {
        return combinacao.every(index => {
            return cells[index].classList.contains(jogadorAtual);
        });
    });

    eventoDelay(cells[combinacaoGanhadora[0]], 1000);
    eventoDelay(cells[combinacaoGanhadora[1]], 2000);
    eventoDelay(cells[combinacaoGanhadora[2]], 3000);

}

function verificaVencedor(jogadorAtual) {
    return COMBINACAO_GANHAR.some(combinacao => {
        return combinacao.every(index => {
            return cells[index].classList.contains(jogadorAtual);
        });
    });
}

function trocarTurno() {
    turno = !turno;
}

function trocaDeLado() {
    PLAYER_X_ou_O = !PLAYER_X_ou_O;
}

function marcarNoTabuleiro() {
    board.classList.remove(O_PLAYER);
    board.classList.remove(X_PLAYER);
    if (turno) {
        board.classList.add(O_PLAYER);
        turnoJogador.textContent = O_PLAYER
    } else {
        board.classList.add(X_PLAYER);
        turnoJogador.textContent = X_PLAYER
    }
}

function verificaEmpate() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_PLAYER) || cell.classList.contains(O_PLAYER);
    });
}

function fimDeJogo(verificaEmpate) {
    if (verificaEmpate) {
        alert();
    } else {
        alert(eventoDelay(`${turno ? "O" : "X"}`, 5000));
    }
}

function eventoDelay(e, tempoDemora) {
    setTimeout(() => {
            e.classList.add("ganhador")
    }, tempoDemora);
    
}