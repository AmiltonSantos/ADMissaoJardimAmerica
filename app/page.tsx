import Blog from "@/components/Blog";
import HomeHero from "@/components/Home/HomeHero";
import Institucional from "@/components/Home/Institucional";
import MissoesCarrossel from "@/components/Home/MissoesCarrossel";
import Cultos from "@/components/Home/Cultos";
import Doacao from "@/components/Home/Doacao";
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
      {/* Layout inspirado em adbelem.org.br */}
      <HomeHero />
      <MissoesCarrossel />
      <Institucional />
      <Blog />
      <Cultos />
      <Doacao />
    </>
  );
}
