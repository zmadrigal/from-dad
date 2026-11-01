// Final acceptances: VRC, 31 October 2026. Recheck the linked source for late scratchings.
export const horses = [
  ["Sons And Lovers", 3, "Joseph O’Brien", "Dylan Browne McMonagle"],
  ["Trustyourinstinct", 18, "Joseph O’Brien", "James McDonald"],
  ["Knight’s Choice", 2, "John Symons & Sheila Laxon", "Robbie Dolan"],
  ["Middle Earth", 1, "Ciaron Maher", "Mark Zahra"],
  ["Vauban", 22, "Gai Waterhouse & Adrian Bott", "Jordan Childs"],
  ["Enfjaar", 8, "Roger Varian", "Ray Dawson"],
  ["Royal Supremacy", 21, "Ciaron Maher", "Ben Allen"],
  ["Wine Dark Sea", 23, "Harry Charlton", "Damian Lane"],
  ["Asterix", 6, "Chris Waller", "Jye McNeil"],
  ["Goodie Two Shoes", 19, "Joseph O’Brien", "Wayne Lordan"],
  ["Juja Kibo", 14, "Ciaron Maher", "Sam Clipperton"],
  ["Hopewell Rock", 15, "George Boughey", "Zac Lloyd"],
  ["Onesmoothoperator", 13, "Tim Fitzsimmons", "Declan Bates"],
  ["Soul Of Spain", 5, "Chris Waller", "Tommy Berry"],
  ["Zahrann", 11, "Ciaron Maher", "Ben Melham"],
  ["So You Are", 7, "Bjorn Baker", "Rachel King"],
  ["Future History", 12, "Gregory Hickman", "Jamie Melham"],
  ["James J Braddock", 24, "Joseph O’Brien", "Craig Williams"],
  ["Kizlyar", 20, "Joseph O’Brien", "Beau Mertens"],
  ["Point Of Law", 9, "Ciaron Maher", "Ethan Brown"],
  ["Strictly Business", 4, "Thomas Carberry", "Dean Yendall"],
  ["Mr Monaco", 16, "Ciaron Maher", "Jabez Johnstone"],
  ["Zakouma", 10, "Grahame Begg", "William Pike"],
  ["Shockletz", 17, "Ciaron Maher", "To be confirmed"],
].map(([name, barrier, trainer, jockey], index) => ({
  number: index + 1,
  name,
  barrier,
  trainer,
  jockey,
}));

export function newDraw() {
  const order = horses.map((h) => h.number);
  // Rejection sampling avoids modulo bias; Fisher–Yates gives each permutation equal odds.
  for (let i = order.length - 1; i > 0; i--) {
    const limit = Math.floor(2 ** 32 / (i + 1)) * (i + 1);
    let value;
    do {
      value = crypto.getRandomValues(new Uint32Array(1))[0];
    } while (value >= limit);
    const j = value % (i + 1);
    [order[i], order[j]] = [order[j], order[i]];
  }
  return { version: 1, order, picks: {} };
}

export function validDraw(value) {
  return (
    value?.version === 1 &&
    Array.isArray(value.order) &&
    value.order.length === 24 &&
    new Set(value.order).size === 24 &&
    value.order.every((n) => Number.isInteger(n) && n >= 1 && n <= 24) &&
    value.picks !== null &&
    typeof value.picks === "object" &&
    !Array.isArray(value.picks) &&
    Object.entries(value.picks).every(
      ([key, name]) =>
        /^(?:[0-9]|1[0-9]|2[0-3])$/.test(key) &&
        typeof name === "string" &&
        name.length <= 60,
    )
  );
}

export function pick(draw, index, player) {
  if (
    !Number.isInteger(index) ||
    index < 0 ||
    index >= 24 ||
    Object.hasOwn(draw.picks, index)
  )
    return false;
  draw.picks[index] = player.trim().slice(0, 60);
  return true;
}

export async function picksWorkbook(draw) {
  // Load the locally bundled writer only when a workbook is requested.
  await import("./assets/vendor/exceljs.min.js");
  const workbook = new globalThis.ExcelJS.Workbook();
  workbook.creator = "La Hacienda — CB NSW 30 CBD & East";
  workbook.title = "Melbourne Cup 2026 — Office draw";
  const sheet = workbook.addWorksheet("Your picks", {
    views: [{ state: "frozen", ySplit: 1 }],
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
    },
  });
  sheet.columns = [
    { header: "Door", width: 10 },
    { header: "Player", width: 32 },
    { header: "Horse", width: 26 },
    { header: "Saddlecloth", width: 15 },
    { header: "Barrier", width: 12 },
    { header: "Trainer", width: 34 },
    { header: "Jockey", width: 30 },
  ];
  for (const [index, player] of Object.entries(draw.picks)) {
    const horse = horses[draw.order[index] - 1];
    // String cells, never formulas: player-supplied text is safe even starting with '='.
    sheet.addRow([
      Number(index) + 1,
      player || "Unassigned",
      horse.name,
      horse.number,
      horse.barrier,
      horse.trainer,
      horse.jockey,
    ]);
  }
  sheet.autoFilter = { from: "A1", to: `G${sheet.rowCount}` };
  sheet.eachRow((row, number) => {
    row.height = number === 1 ? 30 : 27;
    row.eachCell((cell) => {
      cell.font = {
        name: "Calibri",
        size: 11,
        bold: number === 1,
        color: { argb: number === 1 ? "FFF4EAD6" : "FF19372D" },
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb:
            number === 1
              ? "FF19372D"
              : number % 2 === 0
                ? "FFF4EFE3"
                : "FFFFFFFF",
        },
      };
      cell.alignment = { vertical: "middle", wrapText: true };
    });
  });
  return workbook.xlsx.writeBuffer();
}
