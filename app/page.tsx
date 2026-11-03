import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Missao from "@/components/Missao";
import Missoes from "@/components/Missoes";
import Blog from "@/components/Blog";
import Congregacoes from "@/components/Congregacoes";
import Oferta from "@/components/Oferta";
import MapaPage from "./mapa/page";
import SplashWrapper from "@/components/splash/SplashWrapper";
import { Metadata } from "next";
import { SITE_TITULO, jsonLdIgreja } from "@/lib/seo";

// Foco: Assembleia de Deus Missão Goiânia
export const metadata: Metadata = {
  title: { absolute: SITE_TITULO },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdIgreja) }}
      />
      <SplashWrapper />
      <ScrollUp />
      <Hero />
      <Missao />
      <Missoes />
      <Blog />
      <Congregacoes />
      <Oferta />
      <MapaPage />
    </>
  );
}
