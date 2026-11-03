import Cadastro from "@/components/cadastro";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ficha de Cadastro de Membros",
  description: "Preencha a ficha de cadastro de membros da Assembleia de Deus Ministério Missão Jardim América, em Goiânia-GO.",
  alternates: { canonical: "/cadastro" },
};


const ContactPage = () => {
  return (
    <>
      <Cadastro />
    </>
  );
};

export default ContactPage;
