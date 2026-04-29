import Blog from "@/components/Blog";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Video from "@/components/Video";
import { Metadata } from "next";
import MapaPage from "./mapa/page";
import SplashWrapper from "@/components/splash/SplashWrapper";

export const metadata: Metadata = {
  title: "AD Missão Jardim América - Goiânia",
  description: "Site da Assembleia de Deus Ministério Missão Jardim América em Goiânia - Goiás",
  // other metadata
};

export default function Home() {
  return (
    <>
      <SplashWrapper />

      <ScrollUp />
      <Hero />
      <Video />
      <MapaPage />
      <Blog />
    </>
  );
}
