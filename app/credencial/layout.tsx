import { Metadata } from "next";

// Ferramenta interna: fora dos buscadores
export const metadata: Metadata = {
  title: "Gerador de Credencial",
  robots: { index: false, follow: false },
};

export default function CredencialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
