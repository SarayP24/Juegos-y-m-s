let puntuacion = 0; 
let numIntentos = 6;
let numIntentosOriginales = numIntentos;
let palabraAdivinar = [];
let palabraMostrar = [];
let teclasBloqueadas = [];
let nodoPista = document.querySelector('#pista');
let nodoResultado = document.querySelector('#resultado').firstChild;
let nodoIntentos = document.querySelector('#intentos');
let nodoIntentosOriginales = document.querySelector('#intentosOriginales');
let nodoPuntuacion = document.querySelector('#puntuacionH2');
let nodoBotonReiniciar = document.querySelector('#BotonReiniciar');


/**
 * Función para inciar la partida, usada cuando carga la página y cuando empieza
 * una partida nueva
 */
function iniciarPartida() {
  let posicionAleatoria = Math.floor(Math.random() * listaPalabras.length);

  if (posicionAleatoria % 2 != 0) {
    posicionAleatoria -= 1;
  }

  let palabraAleatoria = listaPalabras[posicionAleatoria];

  let tamanioPalabraAleatoria = palabraAleatoria.length;

  for (let i = 0; i < tamanioPalabraAleatoria; i++) {
    if (!palabraAleatoria.charAt(i).match(/[a-zñA-ZÑ]/)) {
      palabraAdivinar.push(palabraAleatoria.charAt(i));
      palabraMostrar.push(palabraAleatoria.charAt(i));
    } else {
      palabraAdivinar.push(palabraAleatoria.charAt(i).toLowerCase());
      palabraMostrar.push("_");
    }
  }

  nodoPista.textContent = listaPalabras[posicionAleatoria + 1];

  nodoIntentosOriginales.textContent = numIntentosOriginales;

  actualizarDatosPantalla();
}

/**
 * Función para dibujar los cambios en pantalla
 */
function actualizarDatosPantalla() {
  
  nodoResultado.textContent = palabraMostrar.join(' ').toUpperCase();

  nodoIntentos.textContent = numIntentos;

  nodoPuntuacion.textContent = puntuacion + " PUNTOS";
}

/**
 * Función que captura la tecla pulsada mediante el teclado físico,
 * comprueba que no se haya pulsado todavía y se la pasa a la función
 * comprobarTecla
 */
function cogerTecladoFisico(evObject) {
  var capturado = String.fromCharCode(evObject.which);
  if (!teclasBloqueadas.includes("tecla" + capturado)) {
    comprobarTecla(capturado);
  }
}

/**
 * Función para comprobar si la tecla pulsada es correcta
 */
function comprobarTecla(letraUsuario) {
  for (let i = 0; i < palabraAdivinar.length; i++) {
    if (letraUsuario == palabraAdivinar[i]) {
      palabraMostrar[i] = letraUsuario;

      document.getElementById("tecla" + letraUsuario).disabled = true;
      document.getElementById("tecla" + letraUsuario).className = "teclaDeshabilitada";

      teclasBloqueadas.push("tecla" + letraUsuario);
      puntuacion += 25;
    }
  }

  if (!palabraAdivinar.includes(letraUsuario)) {
    if (numIntentos > 0) {
      numIntentos -= 1;
      puntuacion -= 15;
    }

    if (numIntentos == 5) {
      document.getElementById('imagen').src = 'img/svg/cabeza.svg';
    } else if (numIntentos == 4) {
      document.getElementById('imagen').src = 'img/svg/cuerpo.svg';
    } else if (numIntentos == 3) {
      document.getElementById('imagen').src = 'img/svg/brazoIzq.svg';
    } else if (numIntentos == 2) {
      document.getElementById('imagen').src = 'img/svg/brazoDer.svg';
    } else if (numIntentos == 1) {
      document.getElementById('imagen').src = 'img/svg/piernaIzq.svg';
    } else if (numIntentos == 0) {
      document.getElementById('imagen').src = 'img/svg/piernaDer.svg';
    }

    document.getElementById("tecla" + letraUsuario).disabled = true;
    document.getElementById("tecla" + letraUsuario).className = "teclaDeshabilitada";

    teclasBloqueadas.push("tecla" + letraUsuario);
  }

  estadoPartida();
  actualizarDatosPantalla();
}

/**
 * Función para comprobar si ya ha acabado el juego
 */
function estadoPartida() {
  if (!palabraMostrar.includes('_')) {
    bloquearTodasTeclas()

    document.getElementById('imagen').src = 'img/svg/victoria.svg';
    nodoBotonReiniciar.textContent = "Siguiente";
  }

  if (numIntentos == 0) {
    bloquearTodasTeclas()
    palabraMostrar = palabraAdivinar;
    nodoBotonReiniciar.textContent = "Siguiente";
  }
}

/**
 * Función para bloquear todas las teclas del teclado, la usaremos cuando finalice la partida
 */
function bloquearTodasTeclas() {
  let teclas = document.querySelectorAll('button.tecla');

  for (let i = 0; i < teclas.length; i++) {
    teclas[i].disabled = true;
    document.getElementById(teclas[i].id).className = "teclaDeshabilitada";
    teclasBloqueadas.push(teclas[i].id);
  }
}

/**
 * Función para reiniciar la partida sin recargar la web entera y así ahorrar recursos
 */
function reiniciarPartida() {
  palabraAdivinar = [];
  palabraMostrar = [];
  numIntentos = numIntentosOriginales;

  if (nodoBotonReiniciar.textContent == "Reiniciar") {
    puntuacion = 0;
  }

  nodoBotonReiniciar.textContent = "Reiniciar";
  document.getElementById('imagen').src = 'img/svg/horca.svg';

  for (let i = 0; i < teclasBloqueadas.length; i++) {
    document.getElementById(teclasBloqueadas[i]).disabled = false;
    document.getElementById(teclasBloqueadas[i]).className = "tecla";
  }

  teclasBloqueadas = [];

  iniciarPartida();
}


// Al cargar la página hacemos que capture el evento de tecla pulsada
window.onload = function() {
  document.onkeypress = cogerTecladoFisico;
}

// Llamamos a iniciarPartida() para iniciar la partida
iniciarPartida();
