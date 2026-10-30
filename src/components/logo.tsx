import { LOGO_PATH, LOGO_VIEWBOX } from "./logo-path";

type Props = {
  className?: string;
  title?: string;
};

export function Logo({ className, title = "RAW Development" }: Props) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      role="img"
      aria-label={title}
      fill="currentColor"
    >
      <path fillRule="evenodd" d={LOGO_PATH} />
    </svg>
  );
}
