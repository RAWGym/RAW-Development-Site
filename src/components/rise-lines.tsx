import { Children, isValidElement, type ReactNode } from "react";

// Разбивает заголовок на строки по <br /> и поднимает их по очереди из-под маски.
// Чистый CSS: работает и без JavaScript, а при «меньше движения» анимация отключается глобально.
function toLines(node: ReactNode): ReactNode[][] {
  const lines: ReactNode[][] = [[]];
  const walk = (n: ReactNode) => {
    Children.forEach(n, (child) => {
      if (isValidElement(child) && child.type === "br") lines.push([]);
      else if (isValidElement<{ children?: ReactNode }>(child) && typeof child.type === "symbol") walk(child.props.children);
      else lines[lines.length - 1].push(child);
    });
  };
  walk(node);
  return lines.filter((l) => l.length);
}

export function RiseLines({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <>
      {toLines(children).map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span className="rise block" style={{ animationDelay: `${delay + i * 90}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </>
  );
}
