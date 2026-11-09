"use client";

import { PIX_BANCO, PIX_BENEFICIARIO, PIX_CHAVE } from "@/lib/igreja";
import { useCopiar } from "../Common/useCopiar";

const PixCard = () => {
  const { copiado, copiar } = useCopiar();

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
          onClick={() => copiar(PIX_CHAVE)}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
            copiado ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90"
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

export default PixCard;
