// Пиксельный логотип «RAW»: буквы нарисованы на сетке 5×7, каждая клетка, отдельный
// квадрат, поэтому их можно анимировать по одному.
const GLYPHS: Record<string, string[]> = {
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
};

const WORD = "RAW";
const COLS = WORD.length * 5 + (WORD.length - 1); // 17
const ROWS = 7;

export type Pixel = { x: number; y: number; i: number };

export const PIXELS: Pixel[] = (() => {
  const out: Pixel[] = [];
  WORD.split("").forEach((ch, li) => {
    GLYPHS[ch].forEach((row, y) => {
      row.split("").forEach((bit, x) => {
        if (bit === "1") out.push({ x: li * 6 + x, y, i: out.length });
      });
    });
  });
  return out;
})();

// Псевдослучайное, но стабильное число для каждого пикселя (одинаково на сервере и в браузере).
export const pixelNoise = (n: number) => {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

export const LOGO_GRID = { cols: COLS, rows: ROWS };
