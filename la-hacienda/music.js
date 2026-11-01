const tracks = [
  ["Funky Chunk", "funky-chunk.mp3"],
  ["Funkorama", "funkorama.mp3"],
  ["Bossa Antigua", "bossa-antigua.mp3"],
];
const audio = document.querySelector("#background-music");
const button = document.querySelector("#sound");
const volume = document.querySelector("#volume");
let index = 0;
let requested = false;
let unavailable = false;
audio.volume = Number(volume.value) / 100;

volume.addEventListener("input", () => {
  audio.volume = Number(volume.value) / 100;
  const value = `${volume.value}%`;
  document.querySelector("#volume-value").value = value;
  volume.setAttribute("aria-valuetext", value);
});

function update() {
  button.setAttribute("aria-pressed", String(!audio.paused));
  button.querySelector("span").textContent = unavailable
    ? "Retry sound"
    : audio.paused
      ? "Sound off"
      : "Sound on";
  button.title = `${tracks[index][0]} · Kevin MacLeod · Playlist repeats`;
}

function failed() {
  if (!requested) return;
  requested = false;
  unavailable = true;
  audio.pause();
  update();
  document.querySelector("#announcement").textContent =
    "Music could not load. Try Sound again, or use the Spotify playlist. Your picks are unchanged.";
}

async function play() {
  requested = true;
  unavailable = false;
  if (!audio.getAttribute("src") || audio.error) {
    audio.src = `assets/music/${tracks[index][1]}`;
  }
  try {
    await audio.play();
  } catch (error) {
    // A pause or track switch can cancel a pending play without being a failure.
    if (error.name !== "AbortError") failed();
  }
}

function pause() {
  requested = false;
  audio.pause();
  update();
}

button.addEventListener("click", () => (requested ? pause() : play()));
document.querySelector("#spotify").addEventListener("click", pause);
audio.addEventListener("play", update);
audio.addEventListener("pause", update);
audio.addEventListener("error", failed);
audio.addEventListener("ended", () => {
  if (!requested) return;
  index = (index + 1) % tracks.length;
  audio.src = `assets/music/${tracks[index][1]}`;
  play();
});
