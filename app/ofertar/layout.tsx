import { Metadata } from "next";

// page.tsx é client component e não pode exportar metadata
export const metadata: Metadata = {
  title: "Ofertas e Dízimos",
  description:
    "Contribua com a obra da Assembleia de Deus Ministério Missão Jardim América em Goiânia-GO. Oferte e dizime via Pix ou presencialmente.",
  alternates: { canonical: "/ofertar" },
};

export default function OfertarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
