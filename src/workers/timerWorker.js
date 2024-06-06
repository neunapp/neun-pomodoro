// src/workers/timerWorker.js
let timerId;
let seconds = 0;

onmessage = function (e) {
  const { command, data } = e.data
  if (command === 'initialTime') {
    seconds = data;
  }
  if (command === 'start') {
    if (!timerId) {
      timerId = setInterval(() => {
        seconds -= 1; // Disminuye el tiempo en 1 segundo
        postMessage(seconds);

        // Comprueba si el tiempo restante es igual a cero
        if (seconds <= 0) {
          clearInterval(timerId);
          timerId = null;
          // Envía un mensaje al hilo principal para indicar que el tiempo ha llegado a cero
          postMessage({ command: 'timeUp' });
        }
      }, 1000);
    }
  } else if (command === 'stop') {
    clearInterval(timerId);
    timerId = null;
  } else if (command === 'reset') {
    clearInterval(timerId);
    seconds = data;
    postMessage(seconds);
  }
};