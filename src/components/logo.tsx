type Props = {
  className?: string;
  title?: string;
};

// Логотип RAW (векторизован из PNG владельца, файл public/brand/raw-logo.svg).
// Рисуется маской, поэтому берёт цвет текста (currentColor) и не раздувает HTML.
export function Logo({ className = "", title = "RAW Development" }: Props) {
  return (
    <span
      role="img"
      aria-label={title}
      className={`inline-block aspect-[3098/1597] bg-current ${className}`}
      style={{
        maskImage: "url(/brand/raw-logo.svg)",
        WebkitMaskImage: "url(/brand/raw-logo.svg)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
