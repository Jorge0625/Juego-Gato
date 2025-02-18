const fichas = ["O", "X"];
let turno = 1;
let puestas = 0;
let partidaAcabada = false;
let textoVictoria = document.getElementById("textoVictoria");
let botones = Array.from(document.getElementsByTagName("button"));

botones.forEach(x => x.addEventListener("click", ponerFicha));

function ponerFicha(event) {
    let botonPulsado = event.target;
    if (!partidaAcabada && botonPulsado.innerHTML == "") {
        botonPulsado.innerHTML = fichas[turno];
        puestas += 1;

        let estadoPartida = estado();
        if (estadoPartida == 0) {
            cambiarTurno();
            if (puestas < 9) {
                ia();
                estadoPartida = estado();
                puestas += 1;
                cambiarTurno();
            }
        }

        if (estadoPartida == 1) {
            textoVictoria.style.visibility = "visible";
            textoVictoria.innerHTML = "¡El jugador ha ganado!";
            partidaAcabada = true;
        } else if (estadoPartida == -1) {
            textoVictoria.style.visibility = "visible";
            textoVictoria.innerHTML = "¡La IA ha ganado!";
            partidaAcabada = true;
        }
    }
}

function cambiarTurno() {
    turno = (turno === 1) ? 0 : 1;
}

function estado() {
    let posicionVictoria = 0;
    let nEstado = 0;

    function sonIguales(...args) {
        let valores = args.map(X => X.innerHTML);
        if (valores[0] != "" && valores.every((x, i, arr) => x === arr[0])) {
            args.forEach(X => X.setAttribute("class","lineaGanadora"));
            return true;
        }
        return false;
    }

    // 
    if (sonIguales(botones[0], botones[1], botones[2])) {
        posicionVictoria = 1;
    } else if (sonIguales(botones[3], botones[4], botones[5])) {
        posicionVictoria = 2;
    } else if (sonIguales(botones[6], botones[7], botones[8])) {
        posicionVictoria = 3;
    } else if (sonIguales(botones[0], botones[3], botones[6])) {
        posicionVictoria = 4;
    } else if (sonIguales(botones[1], botones[4], botones[7])) {
        posicionVictoria = 5;
    } else if (sonIguales(botones[2], botones[5], botones[8])) {
        posicionVictoria = 6;
    } else if (sonIguales(botones[0], botones[4], botones[8])) {
        posicionVictoria = 7;
    } else if (sonIguales(botones[2], botones[4], botones[6])) {
        posicionVictoria = 8;
    }

    // 
    if (posicionVictoria > 0) {
        nEstado = (turno === 1) ? 1 : -1;
    }

    return nEstado;
}

function ia() {
    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let valores = botones.map(X => X.innerHTML);
    let pos = -1;

    // 
    if (valores[4] == "") {
        pos = 4;
    } else {
        // 
        let n = aleatorio(0, botones.length - 1);
        while (valores[n] != "") {
            n = aleatorio(0, botones.length - 1);
        }
        pos = n;
    }

    // 
    botones[pos].innerHTML = "O";
    return pos;
}

// 
function reiniciarJuego() {
    console.log("Juego reiniciado");
    const botones = document.querySelectorAll('#tablero button');
    // 
    botones.forEach(button => {
        button.textContent = ''; 
        button.disabled = false;
        button.removeAttribute("class","lineaGanadora") 
    });

    // 
    
    puestas = 0;
    turno = 1;
    const textoVictoria = document.getElementById('textoVictoria');
    partidaAcabada = false;
    textoVictoria.style.visibility = 'hidden';
}

