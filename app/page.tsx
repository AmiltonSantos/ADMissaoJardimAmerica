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

export const metadata: Metadata = {
  title: "AD Missão Jardim América - Goiânia",
  description: "Site da Assembleia de Deus Ministério Missão Jardim América em Goiânia - Goiás",
};

export default function Home() {
  return (
    <>
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
