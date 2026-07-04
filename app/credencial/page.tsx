"use client";

import { useState } from "react";

export default function CredencialPage() {
  const [excel, setExcel] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function onSubmit() {
    setErro(null);
    if (!excel) {
      setErro("Selecione a planilha");
      return;
    }
    setCarregando(true);
    try {
      const formData = new FormData();
      formData.append("excel", excel);

      const res = await fetch("/api/credencial", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const { erro } = await res.json().catch(() => ({ erro: "Falha ao gerar PDF" }));
        throw new Error(erro ?? "Falha ao gerar PDF");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro inesperado");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="max-w-md mx-auto">
          <form
            onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            className="w-full space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark p-8 shadow-lg"
          >
            <h1 className="text-2xl font-bold text-dark dark:text-white">Gerador de Credencial</h1>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Planilha (.xlsx)
              </label>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => setExcel(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white file:cursor-pointer"
              />
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500">
              Colunas: nome, cargo, cpf, nascimento, batismo, naturalidade, emissão, foto (URL ou caminho).
            </p>

            {erro && <p className="text-sm text-red-500">{erro}</p>}

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-xl bg-primary px-4 py-3 font-medium text-white disabled:opacity-50 hover:bg-primary/90 transition"
            >
              {carregando ? "Gerando..." : "Gerar PDF"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
