import { test } from "node:test";
import assert from "node:assert/strict";
import ExcelJS from "exceljs";
import { horses, newDraw, validDraw, pick, picksWorkbook } from "./game.js";

test("each draw contains the full field exactly once and survives saving", () => {
  const orders = new Set();
  for (let i = 0; i < 100; i++) {
    const draw = newDraw();
    assert.equal(validDraw(JSON.parse(JSON.stringify(draw))), true);
    assert.deepEqual(
      [...draw.order].sort((a, b) => a - b),
      Array.from({ length: 24 }, (_, i) => i + 1),
    );
    orders.add(draw.order.join(","));
  }
  assert.ok(orders.size > 1);
  assert.equal(new Set(horses.map((h) => h.barrier)).size, 24);
});

test("picks are permanent, names are trimmed, every door can be picked once", () => {
  const draw = newDraw();
  assert.equal(pick(draw, 0, "  Ana  "), true);
  assert.equal(pick(draw, 0, "Other player"), false);
  assert.equal(draw.picks[0], "Ana");
  for (let i = 1; i < 24; i++) assert.equal(pick(draw, i, ""), true);
  assert.equal(Object.keys(draw.picks).length, 24);
  assert.equal(pick(draw, -1, ""), false);
  assert.equal(pick(draw, 24, ""), false);
  assert.equal(validDraw(draw), true);
  assert.equal(Object.keys(newDraw().picks).length, 0);
});

test("invalid saved draws are rejected rather than assigning duplicate or missing horses", () => {
  const draw = newDraw();
  assert.equal(validDraw(null), false);
  assert.equal(validDraw({ ...draw, order: Array(24).fill(1) }), false);
  assert.equal(validDraw({ ...draw, picks: { 24: "A" } }), false);
  assert.equal(validDraw({ ...draw, picks: null }), false);
  assert.equal(validDraw({ ...draw, picks: { 0: 42 } }), false);
});

test("Excel export preserves assignments, numeric race data and literal player names", async () => {
  const draw = {
    version: 1,
    order: Array.from({ length: 24 }, (_, i) => 24 - i),
    picks: { 0: 'Ana, "A" — José', 8: "", 23: "=1+1" },
  };
  const file = await picksWorkbook(draw);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(file);
  const sheet = workbook.getWorksheet("Your picks");
  assert.equal(sheet.rowCount, 4);
  assert.deepEqual(sheet.getRow(2).values.slice(1), [
    1,
    'Ana, "A" — José',
    "Shockletz",
    24,
    17,
    "Ciaron Maher",
    "To be confirmed",
  ]);
  assert.deepEqual(sheet.getRow(3).values.slice(1, 6), [
    9,
    "Unassigned",
    "So You Are",
    16,
    7,
  ]);
  assert.deepEqual(sheet.getRow(4).values.slice(1, 6), [
    24,
    "=1+1",
    "Sons And Lovers",
    1,
    3,
  ]);
  assert.equal(sheet.getCell("B4").type, ExcelJS.ValueType.String);
  assert.equal(sheet.getCell("D2").type, ExcelJS.ValueType.Number);
});
