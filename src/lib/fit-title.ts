// Размер крупного заголовка, при котором самое длинное слово целиком влезает в строку.
// Широкий гротеск занимает примерно 1em на букву, поэтому делим доступную ширину на длину слова.
export function fitTitle(title: string, max: number, min = 30): string {
  const longest = Math.max(...title.split(/\s+/).map((w) => w.length), 1);
  return `clamp(${min}px, calc((min(100vw, 1440px) - 48px) / ${(longest * 1.08).toFixed(2)}), ${max}px)`;
}
