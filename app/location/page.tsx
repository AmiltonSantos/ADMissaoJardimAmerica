import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import MapaPage from "../mapa/page";

export const metadata: Metadata = {
  // Foco: Igreja Assembleia de Deus Jardim América / igreja evangélica perto de mim
  title: "Como Chegar - Igreja Assembleia de Deus Jardim América",
  description:
    "Encontre a Igreja Assembleia de Deus no Setor Jardim América, Goiânia-GO (Rua C-160, 1338) e a congregação da AD Missão mais perto de você no mapa.",
  alternates: { canonical: "/location" },
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Localização"
        description="Procure no mapa algumas das nossas congregações que esteja mas perto de você, e venha fazer-nos uma visita, você será bem vindo..."
      />
      <MapaPage />
    </>
  );
};

export default ContactPage;
