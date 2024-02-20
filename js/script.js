const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const myModal = document.querySelector('.modal');
const pontuacao = document.getElementById('pontuacao');
const PontuacaoM = document.getElementById('pontuacao-Moeda');
const start = document.getElementById('Start');
const Moeda = document.getElementById('Moeda');
const placarM = document.getElementById('Moeda');
const game = document.querySelector('.game-board')
const learn = document.querySelector('learn-more')

// Variáveis de jogo
let Pontu = 0;
let PontuM = 0;
let isJumping = false;


function MarioClick() {
  jump(); // Chama a função jump() quando o botão Learn More é clicado
}

// Função para realizar o pulo do Mari
function jump() {
  if (!isJumping) {
    isJumping = true;
    mario.classList.add("jump");
    setTimeout(() => {
      mario.classList.remove("jump");
      isJumping = false;
    }, 500);
  }
}

// Adiciona evento de salto ao pressionar uma tecla
document.addEventListener("keydown", jump);

// Loop principal do jogo
const loop = setInterval(() => {
  // Obtém as posições do cano, do Mario e da moeda
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");
  const MoedaPosition = Moeda.offsetLeft;
  const MoedaPlacar = placarM.offsetLeft;

  if (Pontu === 300){
    Moeda.style.animation = "Moeda-animation 1.5s infinite linear"; 
    Moeda.style.display = "block";
  }else if (MoedaPosition <= 120 && MoedaPosition > 0 && marioPosition < 80) {
    // Cria um elemento de áudio
    const audioElement = document.createElement("audio");
    audioElement.autoplay = true;

    // Adiciona a fonte de áudio ao elemento de áudio
    const sourceElement = document.createElement("source");
    sourceElement.src = "./Audio/Mario-Big-Coin.mp3";
    sourceElement.type = "audio/mpeg";
    audioElement.appendChild(sourceElement);

    // Adiciona o elemento de áudio ao jogo
    game.appendChild(audioElement);
    Moeda.style.display = "none"
  }

  

 // Avalia a condição e atribui true ou false a uma variável
let conditionResult;
if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    conditionResult = true;
} else {
    conditionResult = false;
}

// Use a variável conditionResult no switch case
switch (conditionResult) {
    case true:
        // Desativa a animação do cano
        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        // Ajusta a posição e aparência do Mario
        mario.style.bottom = `${pipePosition}px`;
        mario.src = "./imagem/game-over.png";
        mario.style.width = "75px";
        mario.style.marginLeft = "50px";

        // Cria um elemento de áudio
        const audioElement = document.createElement("audio");
        audioElement.autoplay = true;

        // Adiciona a fonte de áudio ao elemento de áudio
        const sourceElement = document.createElement("source");
        sourceElement.src = "./Audio/mario-game-over.mp3";
        sourceElement.type = "audio/mpeg";
        audioElement.appendChild(sourceElement);

        // Adiciona o elemento de áudio ao jogo
        game.appendChild(audioElement);

        // Exibe o modal de game over
        myModal.style.display = 'block';

        // Mantém a animação de pulo do Mario
        mario.classList.add("jump");

        // Interrompe o loop principal
        clearInterval(loop);
        break;

  
        default:
          if (Pontu >= 300 && Pontu % 300 === 0) {
              Moeda.style.animation = "Moeda-animation 1.5s infinite linear";
              Moeda.style.display = "block";
          } else if (MoedaPosition <= 120 && MoedaPosition > 0 && marioPosition < 80) {
              const audioElement = document.createElement("audio");
              audioElement.autoplay = true;
  
              const sourceElement = document.createElement("source");
              sourceElement.src = "./Audio/Mario-Big-Coin.mp3";
              sourceElement.type = "audio/mpeg";
              audioElement.appendChild(sourceElement);
  
              game.appendChild(audioElement);
              Moeda.style.display = "none";
              PontuM++;
              PontuacaoM.textContent = PontuM;
          }
  
        
        
          
}
  // Atualiza a pontuação
  Pontu++;
  pontuacao.textContent = Pontu;
}, 10);

// Atualiza a página ao clicar no botão de reinício
document.addEventListener("DOMContentLoaded", function () {
  const refreshBtn = document.getElementById('refresh');

  refreshBtn.addEventListener("click", function () {
    // Recarrega a página manualmente
    window.location.reload();
  });
});