import { horses, newDraw, validDraw, pick, picksWorkbook } from "./game.js";

const $ = (selector) => document.querySelector(selector);
const key = "la-hacienda-cup-2026-v1";
let draw;
let busy = false;
try {
  const saved = JSON.parse(localStorage.getItem(key));
  if (validDraw(saved)) draw = saved;
} catch {
  /* Start safely if storage is unavailable or corrupt. */
}
draw ??= newDraw();

function save() {
  try {
    localStorage.setItem(key, JSON.stringify(draw));
  } catch {
    $("#storage-warning").hidden = false;
    $("#save-status").textContent = "Not saved — download your picks";
  }
}

function render() {
  $("#doors").replaceChildren(
    ...draw.order.map((number, index) => {
      const opened = Object.hasOwn(draw.picks, index);
      const horse = horses[number - 1];
      const door = document.createElement("button");
      door.className = `stall${opened ? " opened" : ""}`;
      door.dataset.index = index;
      door.style.setProperty("--wood-hue", `${(index % 4) * 3}deg`);
      door.setAttribute(
        "aria-label",
        opened
          ? `Door ${index + 1}: ${horse.name}${draw.picks[index] ? ", picked by " + draw.picks[index] : ""}. View horse`
          : `Open stable door ${index + 1}`,
      );
      door.innerHTML = `<span class="stall-interior"></span><span class="door-half left"></span><span class="door-half right"></span><span class="door-plaque">${String(index + 1).padStart(2, "0")}</span><span class="door-label">LA HACIENDA</span><span class="door-invitation">PICK ME <span>↗</span></span>`;
      if (opened) addHorse(door, horse, draw.picks[index], index);
      door.addEventListener("click", () => openDoor(index, door));
      return door;
    }),
  );
  updateCount();
}

function addHorse(door, horse, player, index) {
  const interior = door.querySelector(".stall-interior");
  interior.innerHTML =
    '<span class="opened-tag"></span><span class="horse-label"><small></small><strong></strong><span></span></span>';
  interior.querySelector(".opened-tag").textContent =
    `DOOR ${String(index + 1).padStart(2, "0")}  ✓`;
  interior.querySelector("small").textContent = `RACE NO. ${horse.number}`;
  interior.querySelector("strong").textContent = horse.name;
  interior.querySelector(".horse-label > span").textContent =
    player || "Yours to cheer";
}

function updateCount() {
  const count = Object.keys(draw.picks).length;
  $("#remaining").textContent = 24 - count;
  $("#picked").textContent = `${count} / 24 picked`;
  $("#download").disabled = count === 0;
  $("#completion").hidden = count !== 24;
  $("#player").disabled = count === 24;
}

async function openDoor(index, door) {
  if (busy) return;
  const horse = horses[draw.order[index] - 1];
  const fresh = pick(draw, index, $("#player").value);
  if (fresh) {
    busy = true;
    save();
    addHorse(door, horse, draw.picks[index], index);
    door.classList.add("opened");
    door.setAttribute(
      "aria-label",
      `Door ${index + 1}: ${horse.name}${draw.picks[index] ? ", picked by " + draw.picks[index] : ""}. View horse`,
    );
    $("#player").value = "";
    updateCount();
    await new Promise((resolve) =>
      setTimeout(
        resolve,
        matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 850,
      ),
    );
    busy = false;
  }
  $("#reveal-name").textContent = horse.name;
  $("#reveal-door").textContent = `DOOR ${String(index + 1).padStart(2, "0")}`;
  $("#reveal-player").textContent = draw.picks[index]
    ? `Running for ${draw.picks[index]}`
    : "Your Melbourne Cup horse";
  $("#reveal-details").replaceChildren(
    ...[
      ["SADDLECLOTH", horse.number],
      ["BARRIER", horse.barrier],
      ["TRAINER", horse.trainer],
      ["JOCKEY", horse.jockey],
    ].map(([label, value]) => {
      const item = document.createElement("div");
      const small = document.createElement("small");
      small.textContent = label;
      const strong = document.createElement("strong");
      strong.textContent = value;
      item.append(small, strong);
      return item;
    }),
  );
  $("#reveal").showModal();
  $("#announcement").textContent =
    `Door ${index + 1} reveals ${horse.name}. ${24 - Object.keys(draw.picks).length} horses remain.`;
  if (fresh) celebrate();
}

function celebrate() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const container = $("#confetti");
  container.replaceChildren(
    ...Array.from({ length: 42 }, () => {
      const piece = document.createElement("i");
      piece.style.cssText = `left:${Math.random() * 100}%;--drift:${(Math.random() - 0.5) * 300}px;--spin:${Math.random() * 900}deg;animation-delay:${Math.random() * 0.5}s;background:${["#e5bd75", "#f8efcf", "#98b9a0"][Math.floor(Math.random() * 3)]}`;
      return piece;
    }),
  );
  setTimeout(() => container.replaceChildren(), 3200);
}

document
  .querySelectorAll("[data-close]")
  .forEach((button) =>
    button.addEventListener("click", () => button.closest("dialog").close()),
  );
document.querySelectorAll("dialog").forEach((dialog) =>
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    }
  }),
);
$("#help").onclick = $("#field").onclick = () => $("#info").showModal();
$("#reset").onclick = () => {
  if (!busy) $("#reset-dialog").showModal();
};
$("#confirm-reset").onclick = () => {
  draw = newDraw();
  save();
  render();
  $("#player").value = "";
  $("#reset-dialog").close();
  $("#announcement").textContent = "New draw. All 24 horses reshuffled.";
};
$("#fullscreen").onclick = async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    $("#announcement").textContent =
      "Full screen is not available in this browser. Try your browser’s full screen control.";
  }
};
document.addEventListener("fullscreenchange", () => {
  $("#fullscreen span").textContent = document.fullscreenElement
    ? "Exit full screen"
    : "Full screen";
});
if (!document.fullscreenEnabled) $("#fullscreen").hidden = true;
$("#download").onclick = async () => {
  const button = $("#download");
  button.disabled = true;
  button.textContent = "Preparing Excel…";
  try {
    const buffer = await picksWorkbook(structuredClone(draw));
    const url = URL.createObjectURL(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "la-hacienda-melbourne-cup-2026.xlsx";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    button.textContent = "↓ Download Excel";
  } catch {
    button.textContent = "↻ Retry Excel download";
    $("#announcement").textContent =
      "The Excel download failed. Your picks are unchanged; please try again.";
  } finally {
    button.disabled = Object.keys(draw.picks).length === 0;
  }
};
save();
render();
