"use client";

import { PIX_BENEFICIARIO, PIX_CHAVE } from "@/lib/igreja";
import { useCopiar } from "../Common/useCopiar";

const Doacao = () => {
  const { copiado, copiar } = useCopiar();

  return (
    <section className="relative overflow-hidden bg-[#093060] py-16 md:py-24">
      {/* Decoração */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#1863dc]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#1863dc]/20 blur-3xl" />

      <div className="container relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="text-white">
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#5b9bff]">
              Faça sua doação
            </span>
            <h2 className="mb-6 text-3xl font-extrabold leading-tight md:text-4xl lg:text-[42px]">
              Contribua para o crescimento da obra de Deus.
            </h2>
            <p className="mb-8 text-base leading-relaxed text-white/80 md:text-lg">
              Seus dízimos e ofertas nos ajudam a continuar levando o Evangelho
              a mais pessoas e comunidades em Goiânia e região.
            </p>
            <blockquote className="border-l-4 border-[#1863dc] pl-4 text-sm italic text-white/70">
              &ldquo;Cada um contribua segundo propôs no seu coração; não com
              tristeza, ou por necessidade; porque Deus ama ao que dá com
              alegria.&rdquo;
              <span className="mt-1 block font-semibold not-italic text-white/90">
                2 Coríntios 9:7
              </span>
            </blockquote>
          </div>

          {/* Card Pix */}
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-[#1C1C1D]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#1863dc]/10 text-[#1863dc]">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.05 4.33L7.1 8.27c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38l-3.95-3.94c-.38-.38-1-.38-1.38 0zM4.33 11.05L.38 15c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38L5.71 11.05c-.38-.38-1-.38-1.38 0zm13.34 0l-3.95 3.95c-.38.38-.38 1 0 1.38l3.95 3.95c.38.38 1 .38 1.38 0l3.95-3.95c.38-.38.38-1 0-1.38l-3.95-3.95c-.38-.38-1-.38-1.38 0z" />
              </svg>
            </div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-body-color">
              Chave Pix (CNPJ)
            </p>
            <p className="mb-2 text-2xl font-extrabold text-[#093060] dark:text-white">
              {PIX_CHAVE}
            </p>
            <p className="mb-7 text-sm text-body-color">{PIX_BENEFICIARIO}</p>
            <button
              onClick={() => copiar(PIX_CHAVE)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1863dc] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#0056a7]"
            >
              {copiado ? "Chave copiada!" : "Copiar chave Pix"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doacao;
