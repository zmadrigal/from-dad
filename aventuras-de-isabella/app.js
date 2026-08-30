const story = [
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

const elements = {
  scenes: [...document.querySelectorAll(".scene")],
  startScreen: document.querySelector("#startScreen"),
  finishScreen: document.querySelector("#finishScreen"),
  startButton: document.querySelector("#startButton"),
  replayButton: document.querySelector("#replayButton"),
  pauseButton: document.querySelector("#pauseButton"),
  chapter: document.querySelector("#chapter"),
  caption: document.querySelector("#caption"),
  stepCount: document.querySelector("#stepCount"),
  progressBar: document.querySelector("#progressBar"),
};

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
    utterance.lang = "es-MX";
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

async function playStep() {
  if (paused || stepIndex >= story.length) return;
  const currentRun = ++runId;
  const step = story[stepIndex];

  activateScene(step.scene);
  document.body.dataset.moment = step.moment;
  elements.chapter.textContent = step.chapter;
  elements.caption.textContent = step.caption;
  elements.stepCount.textContent = `${stepIndex + 1} / ${story.length}`;
  elements.progressBar.style.width = `${((stepIndex + 1) / story.length) * 100}%`;

  await narrate(step, currentRun);
  if (paused || currentRun !== runId) return;
  await new Promise(resolve => window.setTimeout(resolve, 650));
  if (paused || currentRun !== runId) return;

  stepIndex += 1;
  if (stepIndex < story.length) playStep();
  else finishStory();
}

function startStory() {
  stopNarration();
  stepIndex = 0;
  paused = false;
  elements.startScreen.hidden = true;
  elements.finishScreen.hidden = true;
  elements.pauseButton.hidden = false;
  elements.pauseButton.textContent = "Ⅱ";
  elements.pauseButton.setAttribute("aria-label", "Pausar historia");
  playStep();
}

function finishStory() {
  runId += 1;
  stopNarration();
  elements.pauseButton.hidden = true;
  elements.finishScreen.hidden = false;
  elements.replayButton.focus({ preventScroll: true });
}

function togglePause() {
  paused = !paused;
  runId += 1;
  stopNarration();
  elements.pauseButton.textContent = paused ? "▶" : "Ⅱ";
  elements.pauseButton.setAttribute("aria-label", paused ? "Continuar historia" : "Pausar historia");
  if (!paused) playStep();
}

elements.startButton.addEventListener("click", startStory);
elements.replayButton.addEventListener("click", startStory);
elements.pauseButton.addEventListener("click", togglePause);

document.addEventListener("visibilitychange", () => {
  if (document.hidden && !paused && elements.startScreen.hidden && elements.finishScreen.hidden) togglePause();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
