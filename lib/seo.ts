// Dados centrais de SEO do site (usados em metadata, sitemap e JSON-LD)

export const SITE_URL = "https://www.admissaojardimamerica.com.br";

export const SITE_NOME = "AD Missão Jardim América";

export const SITE_TITULO = "Assembleia de Deus Ministério Missão Jardim América | Goiânia GO";

export const SITE_DESCRICAO =
  "Conheça a Assembleia de Deus Ministério Missão Jardim América, em Goiânia-GO. Confira nossos cultos, eventos, departamentos, Escola Bíblica Dominical e atividades da igreja.";

// Palavras-chave de prioridade alta (as demais vão no conteúdo de cada página)
export const PALAVRAS_CHAVE = [
  "Assembleia de Deus Missão Goiânia",
  "Assembleia de Deus Jardim América",
  "AD Missão Jardim América",
  "Assembleia de Deus Ministério Missão",
  "Igreja evangélica Jardim América Goiânia",
  "Igreja Assembleia de Deus Goiânia GO",
];

// URL absoluta: redes sociais não resolvem caminho relativo
export const OG_IMAGEM = `${SITE_URL}/images/og.jpg`;

const ENDERECO = {
  rua: "Rua C-160, 1338",
  bairro: "Jardim América",
  cidade: "Goiânia",
  estado: "GO",
  cep: "74255-130",
  lat: -16.719597545737017,
  lng: -49.29065610808544,
};

const TELEFONE = "+55-62-99449-7444";

const REDES_SOCIAIS = [
  "https://www.instagram.com/admissaojardimamerica/",
  "https://www.youtube.com/@admissaojardimamerica",
  "https://www.facebook.com/admissaojardimamerica/",
];

// Schema.org "Church" para o Google entender nome, endereço, horários e redes
export const jsonLdIgreja = {
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": `${SITE_URL}/#igreja`,
  name: "Assembleia de Deus Ministério Missão Jardim América",
  alternateName: [
    "AD Missão Jardim América",
    "AD Missão Goiânia",
    "Assembleia de Deus Ministério Missão",
    "Assembleia de Deus Missão Goiânia",
    "Igreja Evangélica Assembleia de Deus Ministério Missão",
  ],
  description: SITE_DESCRICAO,
  url: SITE_URL,
  logo: `${SITE_URL}/images/bio/logo.jpg`,
  image: OG_IMAGEM,
  telephone: TELEFONE,
  address: {
    "@type": "PostalAddress",
    streetAddress: ENDERECO.rua,
    addressLocality: ENDERECO.cidade,
    addressRegion: ENDERECO.estado,
    postalCode: ENDERECO.cep,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: ENDERECO.lat,
    longitude: ENDERECO.lng,
  },
  areaServed: ["Jardim América", "Goiânia", "Goiás"],
  sameAs: REDES_SOCIAIS,
  // Horários da programação semanal (app/programacao/page.tsx)
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "08:30", closes: "11:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "18:00", closes: "20:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "19:30", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "19:30", closes: "21:30" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "19:30", closes: "21:30" },
  ],
};
