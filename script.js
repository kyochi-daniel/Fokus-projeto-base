//Style Mode
const html = document.querySelector("html");

//Botões
const buttonFoco = document.querySelector(".app__card-button--foco");
const buttonCurto = document.querySelector(".app__card-button--curto");
const buttonLongo = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const buttonStartAndStop = document.querySelector("#start-pause");
const mostrarTimer = document.querySelector("#timer");

//Temporizador
const imgButtonPlayAndPause = buttonStartAndStop.querySelector("img");
const txtButtonPlayAndPause = buttonStartAndStop.querySelector("span");
const somPlay = new Audio("/sons/play.wav");
const somPause = new Audio("/sons/pause.mp3");
const somFinalizado = new Audio("/sons/beep.mp3");
somPlay.volume = 0.2;
somPause.volume = 0.2;
somFinalizado.volume = 0.2;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

//Botão audio
const buttonMusic = document.querySelector("#alternar-musica");
const musisca = new Audio("/sons/luna-rise-part-one.mp3");
musisca.loop = true;
//Função para ativar e desativar a música da página!
buttonMusic.addEventListener("change", () => {
  if (musisca.paused) {
    musisca.play();
  } else {
    musisca.pause();
  }
});

//Imagens
const banner = document.querySelector(".app__image");

//Título
const title = document.querySelector(".app__title");

//Função para automatizar a mudanças de dados na tela
function alterarConstexto(contexto) {
  mostrarTempo(contexto);
  botoes.forEach((contexto) => {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      title.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa</strong>`;
      break;
    case "descanso-curto":
      title.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      title.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
  }
}

buttonFoco.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarConstexto("foco");
  buttonFoco.classList.add("active");
});

buttonCurto.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarConstexto("descanso-curto");
  buttonCurto.classList.add("active");
});

buttonLongo.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarConstexto("descanso-longo");
  buttonLongo.classList.add("active");
});
//Função do temporizador
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    somFinalizado.play();
    zerar();
    return;
  }
  --tempoDecorridoEmSegundos;
  mostrarTempo();
};

buttonStartAndStop.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    somPause.play();
    zerar();
    return;
  }

  somPlay.play();
  txtButtonPlayAndPause.textContent = "Pausar";
  imgButtonPlayAndPause.setAttribute("src", "/imagens/pause.png");
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervaloId);
  imgButtonPlayAndPause.setAttribute("src", "/imagens/play_arrow.png");
  txtButtonPlayAndPause.textContent = "Começar";
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  mostrarTimer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
