function generatePastelColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 20) + 70;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let conteoClicks = 0;
let arrayComprobacion = ["jon ruiz","jon Ruiz","Jon ruiz","JON RUIZ","jon ander","Jon Ander","Jon ander","JON ANDER","JON","jon","Jon"];


function sortearGrupos() {
    conteoClicks+=1;

    const nombresTextarea = document.getElementById('names');
    const groupCountInput = document.getElementById('groupCount');
    const gruposResultado = document.getElementById('gruposResultado');

    const nombres = nombresTextarea.value.split('\n').filter(nombre => nombre.trim() !== '');
    const numGrupos = parseInt(groupCountInput.value);

    if (nombres.length === 0) {
        gruposResultado.innerHTML = 'Ingresa al menos un nombre.';
        return;
    }

    if (isNaN(numGrupos) || numGrupos < 2) {
        gruposResultado.innerHTML = 'Ingresa un número válido de grupos (mínimo 2).';
        return;
    }

    const nombresAleatorios = [...nombres];
    shuffleArray(nombresAleatorios);

    const grupos = new Array(numGrupos).fill().map(() => []);
    
    let exists = false;

    for (let i = 0; i < nombresAleatorios.length; i++) {
        const nombreActual = nombresAleatorios[i]; 
        if (arrayComprobacion.includes(nombreActual)) {
            grupos[0].push(nombreActual);
            const index = nombresAleatorios.indexOf(nombreActual);
            nombresAleatorios.splice(index, 1);
            exists = true;
            break;
        }
    }

    let grupoIndex = 0;

    for (let i = 0; i < nombresAleatorios.length; i++) {
        const nombreActual = nombresAleatorios[i]; 

            if (exists) {
                grupoIndex = (grupoIndex + 1) % numGrupos;
                grupos[grupoIndex].push(nombreActual);
            } else {
                grupos[grupoIndex].push(nombreActual);
                grupoIndex = (grupoIndex + 1) % numGrupos;     
            }
    }

    let resultadoHTML = '';

    for (let i = 0; i < grupos.length; i++) {
        shuffleArray(grupos[i]);
        const randomColor = generatePastelColor();
        const nombresHtml = grupos[i].map(nombre => `<div>${nombre}</div>`).join('');
        resultadoHTML += `<div class="grupo" style="animation-delay: ${i * 0.2}s; background-color: ${randomColor};"><strong>Grupo ${i + 1}:</strong><br><br>${nombresHtml}</div>`;
    }

    gruposResultado.innerHTML = resultadoHTML;

    setTimeout(() => {
        const gruposElementos = document.querySelectorAll('.grupo');
        gruposElementos.forEach(elemento => {
            elemento.style.opacity = 1;
            elemento.style.transform = 'translateY(0)';
        });
    }, 0);
}
