"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { useState } from "react";

// ─── Dados ────────────────────────────────────────────────────────────────────

const PIX_CHAVE = "00.000.000/0001-00"; // ← substitua pelo CNPJ/chave real
const PIX_BENEFICIARIO = "AD Missão Jardim América";
const PIX_BANCO = "Banco do Brasil";

const formasDeOfertar = [
  {
    id: 1,
    titulo: "Pix",
    subtitulo: "Rápido e disponível 24h",
    cor: "from-blue-600 to-blue-800",
    icone: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.05 4.33L7.1 8.27c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38l-3.95-3.94c-.38-.38-1-.38-1.38 0zM4.33 11.05L.38 15c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38L5.71 11.05c-.38-.38-1-.38-1.38 0zm13.34 0l-3.95 3.95c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38l-3.95-3.95c-.38-.38-1-.38-1.38 0zM11.05 17.77l-3.95 3.95c-.38.38-.38 1 0 1.38l.69.69c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38l-.69-.69c-.38-.38-1-.38-1.38 0z" />
      </svg>
    ),
    destaque: true,
  },
  {
    id: 2,
    titulo: "Transferência Bancária",
    subtitulo: "TED / DOC",
    cor: "from-slate-600 to-slate-800",
    icone: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    destaque: false,
  },
  {
    id: 3,
    titulo: "Presencialmente",
    subtitulo: "Nos cultos e eventos",
    cor: "from-green-600 to-green-800",
    icone: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    destaque: false,
  },
];

const tiposOferta = [
  {
    titulo: "Dízimo",
    descricao: "O dízimo é a décima parte da nossa renda, reservada a Deus como reconhecimento de que tudo pertence a Ele.",
    versiculo: "Malaquias 3:10",
    cor: "border-l-primary bg-primary/5",
  },
  {
    titulo: "Oferta",
    descricao: "A oferta é uma expressão de amor e gratidão a Deus, dada com alegria e de coração voluntário.",
    versiculo: "2 Coríntios 9:7",
    cor: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/10",
  },
  {
    titulo: "Missões",
    descricao: "Sua contribuição para missões apoia obreiros e missionários que levam o Evangelho a lugares remotos.",
    versiculo: "Mateus 28:19",
    cor: "border-l-red-500 bg-red-50 dark:bg-red-900/10",
  },
  {
    titulo: "Construção",
    descricao: "Contribua com a construção e manutenção dos templos das nossas congregações em Goiânia e região.",
    versiculo: "Hageu 1:8",
    cor: "border-l-green-500 bg-green-50 dark:bg-green-900/10",
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

const PixCard = () => {
  const [copiado, setCopiado] = useState(false);

  const copiar = () => {
    navigator.clipboard.writeText(PIX_CHAVE).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-body-color/10 bg-white shadow-lg dark:bg-dark">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-5 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.05 4.33L7.1 8.27c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38l-3.95-3.94c-.38-.38-1-.38-1.38 0zM4.33 11.05L.38 15c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38L5.71 11.05c-.38-.38-1-.38-1.38 0zm13.34 0l-3.95 3.95c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38l-3.95-3.95c-.38-.38-1-.38-1.38 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium opacity-80">Chave Pix</p>
            <p className="text-lg font-bold">{PIX_BANCO}</p>
          </div>
        </div>
      </div>

      {/* Dados */}
      <div className="p-6">
        <div className="mb-4 space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-body-color">
              Beneficiário
            </p>
            <p className="mt-0.5 text-base font-semibold text-black dark:text-white">
              {PIX_BENEFICIARIO}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-body-color">
              Chave (CNPJ)
            </p>
            <p className="mt-0.5 font-mono text-base font-semibold text-black dark:text-white">
              {PIX_CHAVE}
            </p>
          </div>
        </div>

        <button
          onClick={copiar}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
            copiado
              ? "bg-green-500 text-white"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {copiado ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Chave copiada!
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copiar Chave Pix
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const OfertarPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Ofertar"
        description="Contribua com a obra de Deus através do dízimo, oferta, missões e construção."
      />

      {/* ── Versículo destaque ── */}
      <section className="bg-primary py-10">
        <div className="container text-center text-white">
          <p className="mx-auto max-w-2xl text-lg font-medium italic leading-relaxed opacity-95 md:text-xl">
            "Cada um contribua segundo propôs no seu coração; não com tristeza,
            ou por necessidade; porque Deus ama ao que dá com alegria."
          </p>
          <p className="mt-3 text-sm font-semibold opacity-80">2 Coríntios 9:7</p>
        </div>
      </section>

      {/* ── Formas de Ofertar ── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
              Como Contribuir
            </span>
            <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
              Formas de Ofertar
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body-color">
              Escolha a forma mais conveniente para você.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Coluna Pix — ocupa mais espaço por ser destaque */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-1 w-8 rounded-full bg-primary" />
                <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Método recomendado
                </h3>
              </div>
              <PixCard />
            </div>

            {/* Coluna outras formas */}
            <div className="space-y-4">
              {/* Transferência Bancária */}
              <div className="rounded-2xl border border-body-color/10 bg-white p-6 dark:bg-dark">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black dark:text-white">
                      Transferência Bancária
                    </p>
                    <p className="text-xs text-body-color">TED / DOC</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-body-color">
                  <p><span className="font-semibold text-black dark:text-white">Banco:</span> {PIX_BANCO}</p>
                  <p><span className="font-semibold text-black dark:text-white">Agência:</span> 0000-0</p>
                  <p><span className="font-semibold text-black dark:text-white">Conta:</span> 00000-0</p>
                  <p><span className="font-semibold text-black dark:text-white">CNPJ:</span> {PIX_CHAVE}</p>
                </div>
              </div>

              {/* Presencialmente */}
              <div className="rounded-2xl border border-body-color/10 bg-white p-6 dark:bg-dark">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-black dark:text-white">
                      Presencialmente
                    </p>
                    <p className="text-xs text-body-color">Nos cultos e eventos</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-body-color">
                  Você também pode ofertar durante nossos cultos semanais. Envelopes disponíveis na
                  entrada do templo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tipos de Oferta ── */}
      <section className="bg-gray-50 py-16 dark:bg-[#1D2144] md:py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
              Entenda a diferença
            </span>
            <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
              Tipos de Contribuição
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body-color">
              Cada tipo de oferta tem um propósito específico na obra de Deus.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tiposOferta.map((tipo) => (
              <div
                key={tipo.titulo}
                className={`rounded-2xl border-l-4 p-6 ${tipo.cor}`}
              >
                <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                  {tipo.titulo}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-body-color">
                  {tipo.descricao}
                </p>
                <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-semibold text-body-color dark:bg-white/10">
                  📖 {tipo.versiculo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promessa ── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="overflow-hidden rounded-3xl bg-primary">
            <div className="flex flex-col items-center justify-center px-8 py-14 text-center text-white md:px-16">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                Deus Honra Quem O Honra
              </h3>
              <p className="mx-auto max-w-xl text-base leading-relaxed opacity-90 md:text-lg">
                "Trazei todos os dízimos à casa do tesouro, para que haja
                mantimento na minha casa, e depois fazei prova de mim nisto,
                diz o SENHOR dos Exércitos, se eu não vos abrir as janelas do
                céu e não derramar sobre vós uma bênção sem medida."
              </p>
              <p className="mt-4 text-sm font-semibold opacity-80">Malaquias 3:10</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfertarPage;
