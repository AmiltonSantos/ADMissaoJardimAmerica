import Breadcrumb from "@/components/Common/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossa História | AD Missão Jardim América",
  description:
    "Conheça a história da Assembleia de Deus no Brasil e da AD Missão Jardim América em Goiânia - GO.",
};

// ─── Dados ────────────────────────────────────────────────────────────────────

const timeline = [
  {
    ano: "1910",
    titulo: "A Chegada dos Missionários",
    descricao:
      "Em 19 de novembro de 1910, os missionários suecos Gunnar Vingren e Daniel Berg aportaram em Belém do Pará. Movidos por uma visão profética recebida em South Bend (EUA), buscavam uma terra chamada 'Pará' — que desconheciam até então. Ao chegar, começaram a pregar o Evangelho e o batismo no Espírito Santo.",
  },
  {
    ano: "1911",
    titulo: "Fundação da Assembleia de Deus",
    descricao:
      "Em 18 de junho de 1911, um grupo de 18 fiéis foi excluído da Igreja Batista de Belém por adotar doutrinas pentecostais. Esse grupo formou a 'Missão da Fé Apostólica', que anos mais tarde seria reconhecida como Assembleia de Deus no Brasil — a maior denominação pentecostal do país.",
  },
  {
    ano: "1920–1940",
    titulo: "Expansão pelo Brasil",
    descricao:
      "Ao longo das décadas de 1920 a 1940, obreiros e missionários levaram o Evangelho pentecostal a todos os estados brasileiros. A AD cresceu de forma extraordinária entre os mais humildes, chegando a regiões remotas e ribeirinhas do Nordeste, Norte e Centro-Oeste.",
  },
  {
    ano: "1930",
    titulo: "A Chegada em Goiás",
    descricao:
      "Pioneiros da Assembleia de Deus chegaram ao estado de Goiás na década de 1930, plantando igrejas em cidades do interior e na própria capital. A obra cresceu rapidamente, formando dezenas de congregações que alcançaram bairros e municípios de toda a região.",
  },
  {
    ano: "1980s",
    titulo: "AD Missão Jardim América",
    descricao:
      "No bairro Jardim América, em Goiânia, foi fundada a AD Missão Jardim América — com uma visão clara de evangelismo local e cuidado pastoral de cada família. Desde sua fundação, a igreja cresceu, multiplicou congregações e se tornou referência espiritual na região.",
  },
  {
    ano: "Hoje",
    titulo: "Congregações e Crescendo",
    descricao:
      "Hoje a AD Missão Jardim América conta com mais de 40 congregações espalhadas por Goiânia e municípios vizinhos como Aragoiânia, Bonfinópolis e Anápolis. Com centenas de membros ativos, a obra continua avançando, guiada pela missão de levar o Evangelho a cada pessoa.",
  },
];

const crencas = [
  {
    titulo: "A Bíblia Sagrada",
    descricao:
      "Cremos que toda a Escritura é divinamente inspirada por Deus e constitui a única regra infalível de fé e prática.",
    icone: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    titulo: "A Trindade Santa",
    descricao:
      "Cremos no único Deus eterno, que se manifesta em três pessoas distintas: Pai, Filho e Espírito Santo.",
    icone: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    titulo: "Salvação pela Graça",
    descricao:
      "Cremos que a salvação é um dom de Deus mediante a fé em Jesus Cristo, morto e ressurreto para a remissão dos nossos pecados.",
    icone: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    titulo: "Batismo nas Águas",
    descricao:
      "Cremos no batismo por imersão em água em nome do Pai, do Filho e do Espírito Santo, como ato público de obediência e identificação com Cristo.",
    icone: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
      </svg>
    ),
  },
  {
    titulo: "Batismo no Espírito Santo",
    descricao:
      "Cremos no batismo no Espírito Santo com a evidência do falar em línguas estranhas, conforme o derramamento do Pentecostes (Atos 2).",
    icone: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    titulo: "A Volta de Cristo",
    descricao:
      "Cremos na segunda vinda pessoal, literal e visível do Senhor Jesus Cristo para buscar sua Igreja e estabelecer seu reino eterno.",
    icone: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
];

const numeros = [
  { valor: "1911", label: "Fundação da AD no Brasil" },
  { valor: "40", label: "Congregações ativas" },
  { valor: "+100", label: "Anos de história em Goiás" },
  { valor: "15M+", label: "Membros no Brasil" },
];

// ─── Página ───────────────────────────────────────────────────────────────────

export default function SobrePage() {
  return (
    <>
      <Breadcrumb
        pageName="Nossa História"
        description="Conheça a trajetória da Assembleia de Deus no Brasil e a nossa caminhada em Goiânia."
      />

      {/* ── Números em destaque ── */}
      <section className="border-b border-body-color/10 bg-white py-10 dark:border-white/10 dark:bg-dark">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {numeros.map((n) => (
              <div key={n.label} className="text-center">
                <p className="text-3xl font-extrabold text-primary md:text-4xl">{n.valor}</p>
                <p className="mt-1 text-sm text-body-color">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Introdução ── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-primary">
                Quem Somos
              </span>
              <h2 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl lg:text-[42px]">
                Uma Igreja Plantada por Deus
              </h2>
              <p className="mb-5 text-base leading-relaxed text-body-color md:text-lg">
                A Assembleia de Deus Missão Jardim América é parte de uma história que começou
                em 1911, nas margens do Rio Amazonas, quando dois missionários suecos obedeceram
                a uma visão divina e plantaram no Brasil uma das maiores obras do Espírito Santo
                no mundo.
              </p>
              <p className="mb-5 text-base leading-relaxed text-body-color md:text-lg">
                Hoje, mais de um século depois, aquela semente se multiplica em{" "}
                <strong className="text-black dark:text-white">40 congregações</strong> em
                Goiânia e região, com centenas de famílias alcançadas pelo poder transformador
                do Evangelho de Jesus Cristo.
              </p>
              <p className="text-base leading-relaxed text-body-color md:text-lg">
                Nossa missão é a mesma do primeiro dia: pregar Cristo crucificado e ressurreto,
                discipular vidas e enviar obreiros até os confins da terra.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/location/sede.jpg"
                alt="AD Missão Jardim América - Sede"
                width={600}
                height={480}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-gray-50 py-16 dark:bg-[#1D2144] md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
              Linha do Tempo
            </span>
            <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
              Nossa Trajetória
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body-color">
              De Belém do Pará a Goiânia — mais de um século de fé, missão e crescimento.
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            {/* Linha vertical */}
            <div className="absolute left-6 top-0 h-full w-0.5 bg-primary/20 md:left-1/2 md:-ml-px" />

            <div className="space-y-10">
              {timeline.map((item, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={item.ano}
                    className={`relative flex gap-6 md:gap-0 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Bolinha central */}
                    <div className="absolute left-6 top-2 z-10 -translate-x-1/2 md:left-1/2">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-white dark:bg-dark" />
                    </div>

                    {/* Card */}
                    <div
                      className={`ml-12 flex-1 md:ml-0 ${
                        isLeft
                          ? "md:mr-8 md:pr-8 md:text-right"
                          : "md:ml-8 md:pl-8 md:text-left"
                      }`}
                    >
                      <div className="rounded-2xl border border-body-color/10 bg-white p-6 shadow-sm dark:bg-dark">
                        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                          {item.ano}
                        </span>
                        <h3 className="mb-2 text-base font-bold text-black dark:text-white md:text-lg">
                          {item.titulo}
                        </h3>
                        <p className="text-sm leading-relaxed text-body-color">
                          {item.descricao}
                        </p>
                      </div>
                    </div>

                    {/* Espaçador do lado oposto */}
                    <div className="hidden flex-1 md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Crenças ── */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
              O Que Cremos
            </span>
            <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
              Nossas Crenças
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body-color">
              Fundamentados na Palavra de Deus, estas são as doutrinas que norteiam
              nossa fé e prática.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {crencas.map((crenca) => (
              <div
                key={crenca.titulo}
                className="group rounded-2xl border border-body-color/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-dark"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  {crenca.icone}
                </div>
                <h3 className="mb-2 text-base font-bold text-black dark:text-white">
                  {crenca.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-body-color">
                  {crenca.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fundadores da AD ── */}
      <section className="bg-gray-50 py-16 dark:bg-[#1D2144] md:py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
              Pioneiros da Fé
            </span>
            <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
              Os Fundadores da AD no Brasil
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
            {/* Gunnar Vingren */}
            <div className="overflow-hidden rounded-2xl border border-body-color/10 bg-white shadow-sm dark:bg-dark">
              <div className="bg-gradient-to-br from-blue-600 to-blue-900 px-6 py-10 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-4xl font-bold text-white">
                  GV
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-bold text-black dark:text-white">
                  Gunnar Vingren
                </h3>
                <p className="mb-3 text-sm font-semibold text-primary">1879 – 1933 · Suécia</p>
                <p className="text-sm leading-relaxed text-body-color">
                  Pastor sueco que recebeu uma visão profética sobre o Pará (Brasil) em 1909.
                  Chegou a Belém em novembro de 1910 e co-fundou a Missão da Fé Apostólica em
                  1911, que se tornaria a Assembleia de Deus. Dedicou sua vida ao evangelismo
                  e à tradução da Bíblia para dialetos indígenas.
                </p>
              </div>
            </div>

            {/* Daniel Berg */}
            <div className="overflow-hidden rounded-2xl border border-body-color/10 bg-white shadow-sm dark:bg-dark">
              <div className="bg-gradient-to-br from-slate-600 to-slate-900 px-6 py-10 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-4xl font-bold text-white">
                  DB
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-lg font-bold text-black dark:text-white">
                  Daniel Berg
                </h3>
                <p className="mb-3 text-sm font-semibold text-primary">1884 – 1963 · Suécia</p>
                <p className="text-sm leading-relaxed text-body-color">
                  Ferreiro sueco que se converteu ao pentecostalismo nos EUA e acompanhou Vingren
                  ao Brasil. Percorreu o interior do Nordeste e Norte do Brasil a pé e de barco,
                  evangelizando e plantando igrejas em regiões remotas. Viveu no Brasil por mais
                  de 50 anos.
                </p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-body-color">
            &ldquo;Ide por todo o mundo e pregai o evangelho a toda criatura.&rdquo; — Marcos 16:15
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-white md:px-16">
            <h3 className="mb-4 text-2xl font-bold md:text-3xl">
              Faça Parte Dessa História
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed opacity-90">
              Venha nos visitar. Toda família tem um lugar reservado na AD Missão
              Jardim América. Nossa porta está sempre aberta.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/location"
                className="rounded-xl bg-white px-7 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
              >
                Como Chegar
              </a>
              <a
                href="/blog"
                className="rounded-xl border-2 border-white px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver Programação
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
