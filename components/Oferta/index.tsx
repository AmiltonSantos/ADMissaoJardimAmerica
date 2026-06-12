"use client";

import { useState } from "react";

// Substitua pelos dados reais da igreja
const PIX_KEY = "00.000.000/0001-00"; // CNPJ ou chave pix real
const PIX_BENEFICIARIO = "AD Missão Jardim América";

const Oferta = () => {
  const [copiado, setCopiado] = useState(false);

  const copiarChave = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    });
  };

  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-24">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center text-white">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-widest opacity-80">
            Contribua com a Obra
          </span>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-[40px]">
            Dízimos e Ofertas
          </h2>
          <p className="mb-10 text-base leading-relaxed opacity-90 md:text-lg">
            Sua contribuição é essencial para que possamos continuar levando o
            Evangelho a mais pessoas e comunidades em Goiânia e região.
          </p>

          {/* Card Pix */}
          <div className="mx-auto max-w-md rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
            {/* Ícone Pix */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.05 4.33L7.1 8.27c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38l-3.95-3.94c-.38-.38-1-.38-1.38 0zM4.33 11.05L.38 15c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38L5.71 11.05c-.38-.38-1-.38-1.38 0zm13.34 0l-3.95 3.95c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38l-3.95-3.95c-.38-.38-1-.38-1.38 0z" />
                </svg>
              </div>
            </div>

            <p className="mb-1 text-sm font-medium uppercase tracking-wider text-white/70">
              Chave Pix
            </p>
            <p className="mb-2 text-xl font-bold text-white">{PIX_KEY}</p>
            <p className="mb-6 text-sm text-white/70">{PIX_BENEFICIARIO}</p>

            <button
              onClick={copiarChave}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-primary transition hover:bg-white/90"
            >
              {copiado ? (
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Chave copiada!
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar Chave Pix
                </>
              )}
            </button>
          </div>

          <p className="mt-8 text-sm opacity-70">
            &ldquo;Cada um contribua segundo propôs no seu coração; não com tristeza,
            ou por necessidade; porque Deus ama ao que dá com alegria.&rdquo;
            <br />
            <span className="font-semibold">2 Coríntios 9:7</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Oferta;
