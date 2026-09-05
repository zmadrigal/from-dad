const waterStory = [
  {
    scene: "question",
    moment: "question",
    chapter: "UNA GRAN PREGUNTA",
    caption: "¿De dónde viene la lluvia? Sigamos el viaje de una pequeña gota de agua.",
    narration: "Hola, exploradora. Soy Isabella, y él es Juno. Hoy tenemos una gran pregunta: ¿de dónde viene la lluvia? Vamos a seguir el viaje de una pequeña gota de agua.",
    audio: "assets/audio-es/01-pregunta.mp3",
  },
  {
    scene: "evaporation",
    moment: "sun",
    chapter: "EL SOL CALIENTA",
    caption: "El Sol calienta el agua de los charcos, los ríos, los lagos y el mar.",
    narration: "Todo comienza cuando el Sol calienta el agua de los charcos, los ríos, los lagos y el mar. El agua no desaparece. Con el calor, empieza a cambiar.",
    audio: "assets/audio-es/02-sol.mp3",
  },
  {
    scene: "evaporation",
    moment: "evaporation",
    chapter: "EVAPORACIÓN",
    caption: "El agua líquida se convierte en vapor invisible y sube por el aire.",
    narration: "Una parte del agua líquida se convierte en un gas invisible llamado vapor de agua. El vapor sube, sube y sube por el aire. A este cambio lo llamamos evaporación.",
    audio: "assets/audio-es/03-evaporacion.mp3",
  },
  {
    scene: "condensation",
    moment: "condensation",
    chapter: "CONDENSACIÓN",
    caption: "En el aire frío, el vapor se convierte en gotitas que forman una nube.",
    narration: "Muy arriba, el aire está más frío. El vapor se enfría y vuelve a convertirse en gotitas de agua. Millones de gotitas juntas forman una nube. Esto se llama condensación.",
    audio: "assets/audio-es/04-condensacion.mp3",
  },
  {
    scene: "rain",
    moment: "rain",
    chapter: "LA LLUVIA CAE",
    caption: "Las gotitas se unen. Cuando pesan demasiado, caen como lluvia.",
    narration: "Dentro de la nube, las gotitas se encuentran y se unen. Cuando se vuelven demasiado pesadas para flotar, caen como lluvia. El agua llena los charcos, los ríos, los lagos y el mar.",
    audio: "assets/audio-es/05-lluvia.mp3",
  },
  {
    scene: "cycle",
    moment: "cycle",
    chapter: "EL CICLO DEL AGUA",
    caption: "El Sol vuelve a calentar el agua y todo el viaje comienza otra vez.",
    narration: "Después, el Sol vuelve a calentar el agua y el viaje comienza otra vez. Sol, vapor, nube y lluvia. El agua viaja una y otra vez. Por eso lo llamamos el ciclo del agua.",
    audio: "assets/audio-es/06-ciclo.mp3",
  },
  {
    scene: "cycle",
    moment: "final",
    chapter: "¡LO DESCUBRIMOS!",
    caption: "La misma agua puede viajar por el cielo, la tierra y el mar.",
    narration: "¡Lo descubrimos! La misma agua puede viajar por el cielo, la tierra y el mar. La próxima vez que llueva, mi amigo y yo recordaremos la gran aventura de cada gota.",
    audio: "assets/audio-es/07-final.mp3",
  },
];

const alphabetLetters = [
  ["A", "a", "árbol", "a"], ["B", "b", "ballena", "b"],
  ["C", "c", "casa", "c"], ["D", "d", "dinosaurio", "d"],
  ["E", "e", "estrella", "e"], ["F", "f", "flor", "f"],
  ["G", "g", "gato", "g"], ["H", "h", "helado", "h"],
  ["I", "i", "isla", "i"], ["J", "j", "jirafa", "j"],
  ["K", "k", "kiwi", "k"], ["L", "l", "luna", "l"],
  ["M", "m", "mariposa", "m"], ["N", "n", "nube", "n"],
  ["Ñ", "ñ", "ñandú", "n-tilde"], ["O", "o", "oso", "o"],
  ["P", "p", "perro", "p"], ["Q", "q", "queso", "q"],
  ["R", "r", "rana", "r"], ["S", "s", "sol", "s"],
  ["T", "t", "tortuga", "t"], ["U", "u", "uvas", "u"],
  ["V", "v", "volcán", "v"], ["W", "w", "wafle", "w"],
  ["X", "x", "xilófono", "x"], ["Y", "y", "yogur", "y"],
  ["Z", "z", "zapato", "z"],
];

const letterNames = [
  "a", "be", "ce", "de", "e", "efe", "ge", "hache", "i", "jota", "ka", "ele", "eme",
  "ene", "eñe", "o", "pe", "cu", "erre", "ese", "te", "u", "uve", "doble u", "equis",
  "i griega", "zeta",
];

const alphabetStory = [
  {
    scene: "alphabet",
    moment: "alphabet-intro",
    chapter: "EL ABECEDARIO",
    caption: "Descubriremos las 27 letras en mayúscula y minúscula.",
    narration: "¡Hola, exploradora! Hoy vamos a descubrir el abecedario en español. Veremos cada letra, en mayúscula y en minúscula. Escucha, observa y aprende. ¡Comencemos!",
    audio: "assets/audio-es/alphabet/00-intro.mp3",
    image: "assets/generated/alphabet/cover.webp",
    imageAlt: "Isabella y Juno se preparan para descubrir el abecedario",
    counter: "27 LETRAS",
  },
  ...alphabetLetters.map(([upper, lower, word, slug], index) => ({
    scene: "alphabet",
    moment: "letter",
    chapter: `LETRA ${upper}`,
    caption: `${upper} de ${word}`,
    narration: index === 1
      ? "Esta es la letra B mayúscula, y esta es la letra b minúscula. B de ballena."
      : index === 17
        ? "Esta es la letra Q mayúscula, y esta es la letra q minúscula. Q de queso."
        : `Esta es la ${letterNames[index]} mayúscula, y esta es la ${letterNames[index]} minúscula. ${letterNames[index]} de ${word}.`,
    audio: `assets/audio-es/alphabet/${String(index + 1).padStart(2, "0")}-${slug}.mp3`,
    image: `assets/generated/alphabet/letter-${slug}.webp`,
    imageAlt: `Isabella y Juno descubren ${word}`,
    letter: { upper, lower, word },
    counter: `${index + 1} / 27`,
  })),
  {
    scene: "alphabet",
    moment: "alphabet-final",
    chapter: "¡LAS CONOCEMOS!",
    caption: "Ya reconoces las 27 letras en sus dos formas.",
    narration: "¡Muy bien! Ya conoces las veintisiete letras del abecedario, en mayúscula y en minúscula. Puedes volver a verlas cuando quieras. ¡Hasta la próxima aventura!",
    audio: "assets/audio-es/alphabet/28-final.mp3",
    image: "assets/generated/alphabet/cover.webp",
    imageAlt: "Isabella y Juno celebran el abecedario",
    counter: "27 / 27",
  },
];

const seasonsStory = [
  {
    scene: "seasons",
    moment: "seasons-intro",
    chapter: "LAS CUATRO ESTACIONES",
    caption: "Primavera, verano, otoño e invierno traen cambios maravillosos.",
    narration: "¡Hola, exploradora! Soy Isabella, y él es Juno. Durante el año, el clima va cambiando. Hay cuatro estaciones: primavera, verano, otoño e invierno. Cada una trae cambios maravillosos. ¡Vamos a descubrir cómo cuidarnos!",
    audio: "assets/audio-es/seasons/00-intro.mp3",
    image: "assets/generated/seasons/cover.webp",
    imageAlt: "Isabella y Juno rodeados por las cuatro estaciones",
  },
  {
    scene: "seasons",
    moment: "seasons-earth",
    chapter: "¿POR QUÉ CAMBIAN?",
    caption: "La Tierra está inclinada y recibe distinta luz durante su viaje alrededor del Sol.",
    narration: "La Tierra viaja alrededor del Sol y está un poquito inclinada. Durante el viaje, cada lugar recibe diferentes cantidades de luz y calor. Por eso cambian las estaciones, y no llegan al mismo tiempo a todos los países.",
    audio: "assets/audio-es/seasons/01-earth.mp3",
    image: "assets/generated/seasons/earth.webp",
    imageAlt: "Isabella y Juno observan un modelo de la Tierra inclinada alrededor del Sol",
  },
  {
    scene: "seasons",
    moment: "seasons-spring",
    chapter: "PRIMAVERA Y POLEN",
    caption: "Si el polen causa picazón, no te frotes los ojos: lávate y avisa a un adulto.",
    narration: "En primavera suele hacer más calor y muchas plantas florecen. Las flores sueltan polen, un polvo diminuto que ayuda a formar nuevas plantas. A algunas personas les causa estornudos, picazón en la nariz o en los ojos. No te frotes los ojos. Al volver a casa, lávate las manos y la cara, y avisa a un adulto si te molesta.",
    audio: "assets/audio-es/seasons/02-spring.mp3",
    image: "assets/generated/seasons/spring.webp",
    imageAlt: "Isabella se lava la cara y las manos después de jugar entre flores de primavera",
  },
  {
    scene: "seasons",
    moment: "seasons-summer",
    chapter: "VERANO Y SOL",
    caption: "Protector solar, sombrero, sombra y agua nos cuidan del calor.",
    narration: "En verano los días pueden ser más calurosos y el Sol más fuerte. Antes de salir, pide a un adulto que te ponga protector solar. Usa sombrero, busca sombra y toma agua aunque no tengas sed. Nuestro perrito también necesita sombra y agua fresca. Nunca dejamos a una persona ni a una mascota dentro de un auto estacionado.",
    audio: "assets/audio-es/seasons/03-summer.mp3",
    image: "assets/generated/seasons/summer.webp",
    imageAlt: "Isabella y Juno descansan bajo la sombra con sombrero, protector solar y agua",
  },
  {
    scene: "seasons",
    moment: "seasons-autumn",
    chapter: "OTOÑO Y AIRE FRESCO",
    caption: "Usa ropa en capas y camina con cuidado cerca de hojas mojadas.",
    narration: "En otoño muchos días se vuelven frescos y algunas hojas cambian de color y caen. Ponte ropa en capas y una chaqueta que puedas quitar si sientes calor. Las hojas mojadas pueden resbalar, así que camina despacio. Como oscurece más temprano, quédate cerca del adulto que te acompaña.",
    audio: "assets/audio-es/seasons/04-autumn.mp3",
    image: "assets/generated/seasons/autumn.webp",
    imageAlt: "Isabella y Juno caminan por el lado seco de un sendero con hojas de otoño",
  },
  {
    scene: "seasons",
    moment: "seasons-winter",
    chapter: "INVIERNO Y FRÍO",
    caption: "Abrigo, gorro, bufanda, guantes y botas ayudan a conservar el calor.",
    narration: "En invierno puede hacer mucho frío. Vístete en capas, con abrigo, gorro, bufanda, guantes y botas. Mantente seca, porque la ropa mojada enfría el cuerpo. Si tienes mucho frío o te mojas, entra a un lugar cálido y avisa a un adulto. Los perritos pequeños también pueden necesitar su abrigo.",
    audio: "assets/audio-es/seasons/05-winter.mp3",
    image: "assets/generated/seasons/winter.webp",
    imageAlt: "Isabella y Juno llevan ropa abrigada y seca para salir en invierno",
  },
  {
    scene: "seasons",
    moment: "seasons-ready",
    chapter: "ANTES DE SALIR",
    caption: "Mira el tiempo, elige la ropa correcta, lleva agua y escucha a tu cuerpo.",
    narration: "El clima puede cambiar en cualquier estación. Antes de salir, mira el tiempo con un adulto. Así podrán elegir la ropa correcta y llevar agua. Escucha a tu cuerpo: si tienes demasiado calor, frío, picazón o mareo, detente y cuéntaselo a un adulto.",
    audio: "assets/audio-es/seasons/06-ready.mp3",
    image: "assets/generated/seasons/ready.webp",
    imageAlt: "Isabella y Juno revisan el tiempo y eligen ropa adecuada antes de salir",
  },
  {
    scene: "seasons",
    moment: "seasons-final",
    chapter: "¡LISTOS TODO EL AÑO!",
    caption: "Observar el clima nos ayuda a disfrutar cada estación con seguridad.",
    narration: "¡Lo descubrimos! En primavera nos cuidamos del polen. En verano, del Sol y el calor. En otoño, del aire fresco y las hojas mojadas. En invierno, del frío y la humedad. Observar el clima nos ayuda a disfrutar cada estación de forma segura. ¡Hasta la próxima aventura!",
    audio: "assets/audio-es/seasons/07-final.mp3",
    image: "assets/generated/seasons/cover.webp",
    imageAlt: "Isabella y Juno celebran lo aprendido sobre las cuatro estaciones",
  },
];

const episodes = {
  water: {
    label: "CIENCIA PARA CURIOSOS · 2 MIN",
    story: waterStory,
    finishEyebrow: "¡LO DESCUBRIMOS!",
    finishTitle: "El agua viaja una y otra vez.",
    finishSummary: "Sol → vapor → nube → lluvia",
  },
  alphabet: {
    label: "LETRAS EN ESPAÑOL · 4 MIN",
    story: alphabetStory,
    finishEyebrow: "¡MUY BIEN!",
    finishTitle: "Ya conoces el abecedario.",
    finishSummary: "27 letras · mayúsculas y minúsculas",
  },
  seasons: {
    label: "SALUD Y NATURALEZA · 3 MIN",
    story: seasonsStory,
    finishEyebrow: "¡LISTOS TODO EL AÑO!",
    finishTitle: "Sabemos cuidarnos en cada estación.",
    finishSummary: "Primavera · verano · otoño · invierno",
  },
};

const elements = {
  scenes: [...document.querySelectorAll(".scene")],
  episodeLibrary: document.querySelector("#episodeLibrary"),
  episodeCards: [...document.querySelectorAll("[data-episode]")],
  finishScreen: document.querySelector("#finishScreen"),
  replayButton: document.querySelector("#replayButton"),
  episodesButton: document.querySelector("#episodesButton"),
  homeButton: document.querySelector("#homeButton"),
  pauseButton: document.querySelector("#pauseButton"),
  episodeLabel: document.querySelector("#episodeLabel"),
  chapter: document.querySelector("#chapter"),
  caption: document.querySelector("#caption"),
  stepCount: document.querySelector("#stepCount"),
  progressBar: document.querySelector("#progressBar"),
  alphabetImage: document.querySelector("#alphabetImage"),
  seasonsImage: document.querySelector("#seasonsImage"),
  letterPanel: document.querySelector("#letterPanel"),
  uppercaseLetter: document.querySelector("#uppercaseLetter"),
  lowercaseLetter: document.querySelector("#lowercaseLetter"),
  exampleWord: document.querySelector("#exampleWord"),
  finishEyebrow: document.querySelector("#finishEyebrow"),
  finishTitle: document.querySelector("#finishTitle"),
  finishSummary: document.querySelector("#finishSummary"),
};

let activeEpisode;
let stepIndex = 0;
let paused = false;
let runId = 0;
let activeAudio;
let fallbackTimer;

function activateScene(name) {
  elements.scenes.forEach(scene => scene.classList.toggle("active", scene.dataset.scene === name));
}

function scoreSpanishVoice(voice) {
  let score = 0;
  if (/camila/i.test(voice.name)) score += 40;
  if (/^es-(MX|US|419|PE)/i.test(voice.lang)) score += 30;
  else if (/^es-(CO|AR|CL)/i.test(voice.lang)) score += 22;
  else if (/^es/i.test(voice.lang)) score += 10;
  if (/premium|enhanced|neural|natural|dalia|paulina|sabina/i.test(voice.name)) score += 20;
  return score;
}

function stopNarration() {
  window.clearTimeout(fallbackTimer);
  window.speechSynthesis?.cancel();
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
  document.body.classList.remove("narrating");
}

function playAudio(path, currentRun) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(path);
    activeAudio = audio;
    audio.preload = "auto";
    audio.onplaying = () => document.body.classList.add("narrating");
    audio.onended = () => {
      document.body.classList.remove("narrating");
      if (currentRun === runId) resolve();
    };
    audio.onerror = () => reject(new Error("Audio no disponible"));
    audio.play().catch(reject);
  });
}

function speakFallback(text, currentRun) {
  return new Promise(resolve => {
    const finish = () => {
      window.clearTimeout(fallbackTimer);
      document.body.classList.remove("narrating");
      if (currentRun === runId) resolve();
    };
    fallbackTimer = window.setTimeout(finish, Math.max(5200, text.split(/\s+/).length * 420));
    if (!("speechSynthesis" in window)) return;

    const voices = [...window.speechSynthesis.getVoices()].sort((a, b) => scoreSpanishVoice(b) - scoreSpanishVoice(a));
    const pronunciationText = text.replaceAll("Isabella", "Isabela").replaceAll("Juno", "Dshuno");
    const utterance = new SpeechSynthesisUtterance(pronunciationText);
    utterance.lang = "es-419";
    utterance.voice = voices[0] ?? null;
    utterance.rate = 0.9;
    utterance.pitch = 1.03;
    utterance.onstart = () => document.body.classList.add("narrating");
    utterance.onend = finish;
    utterance.onerror = finish;
    window.speechSynthesis.speak(utterance);
  });
}

async function narrate(step, currentRun) {
  try {
    await playAudio(step.audio, currentRun);
  } catch {
    activeAudio = null;
    if (currentRun === runId) await speakFallback(step.narration, currentRun);
  }
}

function renderStep(step, storyLength) {
  activateScene(step.scene);
  document.body.dataset.moment = step.moment;
  elements.chapter.textContent = step.chapter;
  elements.caption.textContent = step.caption;
  elements.stepCount.textContent = step.counter ?? `${stepIndex + 1} / ${storyLength}`;
  elements.progressBar.style.width = `${((stepIndex + 1) / storyLength) * 100}%`;

  if (step.scene === "alphabet") {
    elements.alphabetImage.src = step.image;
    elements.alphabetImage.alt = step.imageAlt;
    elements.letterPanel.hidden = !step.letter;
    if (step.letter) {
      elements.uppercaseLetter.textContent = step.letter.upper;
      elements.lowercaseLetter.textContent = step.letter.lower;
      elements.exampleWord.textContent = step.letter.word;
    }
  } else {
    elements.letterPanel.hidden = true;
    if (step.scene === "seasons") {
      elements.seasonsImage.src = step.image;
      elements.seasonsImage.alt = step.imageAlt;
    }
  }
}

async function playStep() {
  const story = episodes[activeEpisode].story;
  if (paused || stepIndex >= story.length) return;
  const currentRun = ++runId;
  const step = story[stepIndex];
  renderStep(step, story.length);

  await narrate(step, currentRun);
  if (paused || currentRun !== runId) return;
  await new Promise(resolve => window.setTimeout(resolve, 650));
  if (paused || currentRun !== runId) return;

  stepIndex += 1;
  if (stepIndex < story.length) playStep();
  else finishStory();
}

function startEpisode(episodeId) {
  stopNarration();
  activeEpisode = episodeId;
  stepIndex = 0;
  paused = false;
  elements.episodeLibrary.hidden = true;
  elements.finishScreen.hidden = true;
  elements.episodeLabel.textContent = episodes[episodeId].label;
  elements.pauseButton.textContent = "Ⅱ";
  elements.pauseButton.setAttribute("aria-label", "Pausar historia");
  document.body.dataset.view = "playing";
  playStep();
}

function finishStory() {
  const episode = episodes[activeEpisode];
  runId += 1;
  stopNarration();
  document.body.dataset.view = "finished";
  elements.finishEyebrow.textContent = episode.finishEyebrow;
  elements.finishTitle.textContent = episode.finishTitle;
  elements.finishSummary.textContent = episode.finishSummary;
  elements.finishScreen.hidden = false;
  elements.replayButton.focus({ preventScroll: true });
}

function showLibrary() {
  runId += 1;
  stopNarration();
  paused = false;
  document.body.dataset.view = "library";
  document.body.dataset.moment = "none";
  elements.finishScreen.hidden = true;
  elements.episodeLibrary.hidden = false;
  elements.scenes.forEach(scene => scene.classList.remove("active"));
  elements.episodeCards[0].focus({ preventScroll: true });
}

function togglePause() {
  paused = !paused;
  runId += 1;
  stopNarration();
  elements.pauseButton.textContent = paused ? "▶" : "Ⅱ";
  elements.pauseButton.setAttribute("aria-label", paused ? "Continuar historia" : "Pausar historia");
  if (!paused) playStep();
}

elements.episodeCards.forEach(card => card.addEventListener("click", () => startEpisode(card.dataset.episode)));
elements.replayButton.addEventListener("click", () => startEpisode(activeEpisode));
elements.episodesButton.addEventListener("click", showLibrary);
elements.homeButton.addEventListener("click", showLibrary);
elements.pauseButton.addEventListener("click", togglePause);

document.addEventListener("visibilitychange", () => {
  if (document.hidden && !paused && document.body.dataset.view === "playing") togglePause();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
