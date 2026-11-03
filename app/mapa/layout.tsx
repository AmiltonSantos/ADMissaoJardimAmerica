import { Metadata } from "next";

// Mapa também aparece em / e /location: evita conteúdo duplicado
export const metadata: Metadata = {
  title: "Mapa das Congregações",
  robots: { index: false, follow: true },
};

export default function MapaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
