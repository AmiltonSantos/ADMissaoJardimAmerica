"use client";

import { useRef, useState } from "react";

const hoje = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// yyyy-mm-dd (input date) -> dd/mm/yyyy (mesmo formato lido da planilha)
const formatarData = (valor: string) => {
  if (!valor) return "";
  const [ano, mes, dia] = valor.split("-");
  return `${dia}/${mes}/${ano}`;
};

const dadosIniciais = () => ({
  nome: "",
  cargo: "",
  cpf: "",
  nascimento: "",
  batismo: "",
  naturalidade: "",
  emissao: hoje(),
});

const maiusculo = (valor: string) => valor.toUpperCase();

// 00000000000 -> 000.000.000-00
const mascaraCpf = (valor: string) =>
  valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

// 00000000 -> 00/00/0000
const mascaraData = (valor: string) =>
  valor
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");

const padraoData = "(0[1-9]|[12]\\d|3[01])/(0[1-9]|1[0-2])/\\d{4}";

const cargos = ["MEMBRO", "COOPERADOR", "DIÁCONO", "PRESBÍTERO", "EVANGELISTA", "PASTOR"];

const inputClass =
  "block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:border-primary focus:outline-none";

export default function CredencialPage() {
  const [excel, setExcel] = useState<File | null>(null);
  const [foto, setFoto] = useState<File | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [dados, setDados] = useState(dadosIniciais);
  const [formPreenchido, setFormPreenchido] = useState(false);
  const excelRef = useRef<HTMLInputElement>(null);

  async function onSubmit() {
    setErro(null);
    const formData = new FormData();

    // Formulário preenchido tem prioridade sobre a planilha
    if (formPreenchido) {
      formData.append(
        "dados",
        JSON.stringify({
          ...dados,
          emissao: formatarData(dados.emissao),
        }),
      );
    } else if (excel) {
      formData.append("excel", excel);
    } else {
      setErro("Selecione a planilha ou preencha o formulário");
      return;
    }

    setCarregando(true);
    try {
      if (foto) formData.append("foto", foto);

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

  function onSubmitFormulario() {
    setErro(null);
    setFormPreenchido(true);
    setDialogAberto(false);
  }

  function onEscolherExcel(arquivo: File | null) {
    // Importar planilha descarta os dados do formulário
    setExcel(arquivo);
    setDados(dadosIniciais());
    setFormPreenchido(false);
  }

  function abrirFormulario() {
    // Usar o formulário descarta a planilha importada
    setExcel(null);
    if (excelRef.current) excelRef.current.value = "";
    setDialogAberto(true);
  }

  function limparFormulario() {
    setDados(dadosIniciais());
    setFormPreenchido(false);
  }

  const campo = (
    nome: keyof ReturnType<typeof dadosIniciais>,
    label: string,
    {
      type = "text",
      readOnly = false,
      formatar = (valor: string) => valor,
      ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & { formatar?: (valor: string) => string } = {},
  ) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-white">{label}</label>
      <input
        {...props}
        type={type}
        required
        readOnly={readOnly}
        value={dados[nome]}
        onChange={(e) => setDados((d) => ({ ...d, [nome]: formatar(e.target.value) }))}
        className={`${inputClass} ${readOnly ? "cursor-not-allowed opacity-60" : ""}`}
      />
    </div>
  );

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
                ref={excelRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => onEscolherExcel(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white file:cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Foto do membro
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFoto(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white file:cursor-pointer"
              />
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Opcional — substitui o caminho da coluna &quot;foto&quot; na planilha.
              </p>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500">
              Colunas da planilha: nome, cargo, cpf, nascimento, batismo, naturalidade, emissão, foto.
            </p>

            {formPreenchido && (
              <p className="text-xs text-primary">
                Formulário preenchido ({dados.nome}) — será usado no lugar da planilha.
                {!foto && " Selecione a foto do membro para gerar o PDF."}{" "}
                <button type="button" onClick={limparFormulario} className="underline">
                  Limpar
                </button>
              </p>
            )}

            {erro && <p className="text-sm text-red-500">{erro}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={carregando || (formPreenchido && !foto)}
                title={formPreenchido && !foto ? "Selecione a foto do membro" : undefined}
                className="flex-1 rounded-xl bg-primary px-4 py-3 font-medium text-white disabled:opacity-50 hover:bg-primary/90 transition"
              >
                {carregando ? "Gerando..." : "Gerar PDF"}
              </button>
              <button
                type="button"
                onClick={abrirFormulario}
                disabled={carregando}
                className="flex-1 rounded-xl border border-primary px-4 py-3 font-medium text-primary disabled:opacity-50 hover:bg-primary/10 transition"
              >
                Formulário
              </button>
            </div>
          </form>
        </div>
      </div>

      {dialogAberto && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDialogAberto(false)}
        >
          <form
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => { e.preventDefault(); onSubmitFormulario(); }}
            className="w-full max-w-md max-h-[90vh] overflow-y-auto space-y-4 rounded-2xl bg-white dark:bg-dark p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-dark dark:text-white">Dados da Credencial</h2>

            {campo("nome", "Nome", { formatar: maiusculo })}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-white">Cargo</label>
              <select
                required
                value={dados.cargo}
                onChange={(e) => setDados((d) => ({ ...d, cargo: e.target.value }))}
                className={inputClass}
              >
                <option value="" disabled>Selecione...</option>
                {cargos.map((cargo) => (
                  <option key={cargo} value={cargo}>{cargo}</option>
                ))}
              </select>
            </div>
            {campo("cpf", "CPF", {
              formatar: mascaraCpf,
              inputMode: "numeric",
              placeholder: "000.000.000-00",
              pattern: "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}",
              title: "CPF deve ter 11 dígitos",
            })}
            <div className="grid grid-cols-2 gap-3">
              {campo("nascimento", "Nascimento", {
                formatar: mascaraData,
                inputMode: "numeric",
                placeholder: "dd/mm/aaaa",
                pattern: padraoData,
                title: "Data no formato dd/mm/aaaa",
              })}
              {campo("batismo", "Batismo", {
                formatar: mascaraData,
                inputMode: "numeric",
                placeholder: "dd/mm/aaaa",
                pattern: padraoData,
                title: "Data no formato dd/mm/aaaa",
              })}
            </div>
            {campo("naturalidade", "Naturalidade", { formatar: maiusculo })}
            {campo("emissao", "Emissão", { type: "date", readOnly: true })}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => { limparFormulario(); setDialogAberto(false); }}
                className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium text-gray-700 dark:text-white transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90 transition"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
