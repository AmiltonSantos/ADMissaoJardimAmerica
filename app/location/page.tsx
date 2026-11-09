import Breadcrumb from "@/components/Common/Breadcrumb";
import Mapa from "@/components/Mapa";
import { Metadata } from "next";

export const metadata: Metadata = {
  // Foco: Igreja Assembleia de Deus Jardim América / igreja evangélica perto de mim
  title: "Como Chegar - Igreja Assembleia de Deus Jardim América",
  description:
    "Encontre a Igreja Assembleia de Deus no Setor Jardim América, Goiânia-GO (Rua C-160, 1338) e a congregação da AD Missão mais perto de você no mapa.",
  alternates: { canonical: "/location" },
};

const LocationPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Localização"
        description="Procure no mapa a congregação mais perto de você e venha nos fazer uma visita. Você será bem-vindo!"
      />
      <Mapa />
    </>
  );
};

export default LocationPage;
