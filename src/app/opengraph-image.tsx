import { ImageResponse } from "next/og";
import { PIXELS } from "@/components/pixel-font";

export const alt = "RAW Development · студия разработки";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Превью для соцсетей и мессенджеров: пиксельное RAW на тёмном фоне.
export default function OgImage() {
  const cell = 44;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b0b0c", padding: 64, color: "#edebe7" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8a8885", letterSpacing: 4 }}>
          <span>RAW DEVELOPMENT</span>
          <span>ALMATY · SINCE 2018</span>
        </div>
        <div style={{ position: "relative", width: 17 * cell, height: 7 * cell, display: "flex" }}>
          {PIXELS.map((p) => (
            <div key={p.i} style={{ position: "absolute", left: p.x * cell + 3, top: p.y * cell + 3, width: cell - 6, height: cell - 6, background: "#edebe7", borderRadius: 3 }} />
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#edebe7" }}>Websites · Apps · Telegram bots · Games</div>
      </div>
    ),
    size,
  );
}
