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
    narration: index === 17
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
