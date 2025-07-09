import Breadcrumb from "@/components/Common/Breadcrumb";
import Location from "@/components/Location";

import { Metadata } from "next";
import MapaPage from "../mapa/page";

export const metadata: Metadata = {
  title: "AD Missão Jardim América - Goiânia",
  description: "Site da Assembleia de Deus Ministério Missão Jardim América em Goiânia - Goiás",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Localização"
        description="Procure no mapa algumas das nossas congregações que esteja mas perto de você, e venha fazer-nos uma visita, você será bem vindo..."
      />
      <MapaPage />

      <Location />
    </>
  );
};

export default ContactPage;
