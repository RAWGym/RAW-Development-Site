import type { Metadata } from "next";
import NotFound from "../not-found";

export const metadata: Metadata = { title: "Змейка", robots: { index: false } };

// Та же змейка, что на странице 404, по прямому адресу (для ⌘K).
export default function SnakePage() {
  return <NotFound />;
}
