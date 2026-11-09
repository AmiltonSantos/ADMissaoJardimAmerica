import Breadcrumb from "@/components/Common/Breadcrumb";
import { REDES } from "@/lib/igreja";
import { cultosSemana } from "@/lib/programacao";
import { Metadata } from "next";

export const metadata: Metadata = {
  // Foco: horários de cultos e eventos em Goiânia
  title: "Horários de Cultos e Eventos em Goiânia",
  description:
    "Horários dos cultos da Assembleia de Deus em Goiânia: Escola Bíblica Dominical, culto de domingo, culto de ensino, culto de senhoras, evangelismo e próximos eventos da AD Missão Jardim América.",
  alternates: { canonical: "/programacao" },
};

// Revalida a página a cada hora para tirar da lista os eventos que já passaram
export const revalidate = 3600;

// ─── Dados ────────────────────────────────────────────────────────────────────

type Categoria = "Usademig" | "Jovens" | "Mulheres" | "Homens" | "Família" | "Geral" | "Adote" | "Terça" | "Ebd";

const coresCategorias: Record<Categoria, string> = {
  Usademig: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Jovens: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Mulheres: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Homens: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  Família: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Geral: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Adote: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Terça: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
  Ebd: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
};

const proximosEventos: {
  id: number;
  dia: string;
  mes: string;
  ano: string;
  diaSemana: string;
  titulo: string;
  descricao: string;
  horario: string;
  local: string;
  categoria: Categoria;
}[] = [
  {
    id: 1,
    dia: "20",
    mes: "JUN",
    ano: "2026",
    diaSemana: "Sábado",
    titulo: "Congresso USADEMIG",
    descricao: "Abertura do grande congresso de Senhoras do Campo, sendo 2 dias de festa.",
    horario: "18:00",
    local: "Sede – Jardim América",
    categoria: "Usademig",
  },
  {
    id: 2,
    dia: "21",
    mes: "JUN",
    ano: "2026",
    diaSemana: "Domingo",
    titulo: "Congresso USADEMIG",
    descricao: "2º noite de louvor, pregação e quebrantamento congresso da Usademig.",
    horario: "19:00",
    local: "Sede – Jardim América",
    categoria: "Usademig",
  },
  {
    id: 3,
    dia: "23",
    mes: "JUN",
    ano: "2026",
    diaSemana: "Terça",
    titulo: "Terça da Palavra",
    descricao: "Culto de ensino da Palavra de Deus.",
    horario: "19:30",
    local: "Sede – Jardim América",
    categoria: "Terça",
  },
  {
    id: 4,
    dia: "25",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Quinta",
    titulo: "Culto de Senhoras",
    descricao: "Um encontro especial para fortalecer e restaurar os casamentos em Cristo.",
    horario: "19:00",
    local: "Sede – Jardim América",
    categoria: "Mulheres",
  },
  {
    id: 5,
    dia: "26",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Sexta",
    titulo: "Vigília de Oração",
    descricao: "Uma noite de adoração e intercessão por Goiânia e pelas nossas congregações.",
    horario: "22:00",
    local: "Sede – Jardim América",
    categoria: "Geral",
  },
  {
    id: 6,
    dia: "28",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Domingo",
    titulo: "EBD - Escola Biblica Dominical",
    descricao: "Uma manhã de ensino e comunhão.",
    horario: "08:00",
    local: "A confirmar",
    categoria: "Ebd",
  },  
  {
    id: 7,
    dia: "28",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Domingo",
    titulo: "Culto da Familia",
    descricao: "Encontro de fortalecimento para mulheres com palestra, louvor e comunhão.",
    horario: "18:00",
    local: "Sede – Jardim América",
    categoria: "Geral",
  },
  {
    id: 8,
    dia: "30",
    mes: "JUN",
    ano: "2026",
    diaSemana: "Terça",
    titulo: "Terça da Palavra",
    descricao: "Culto de ensino da Palavra de Deus.",
    horario: "19:30",
    local: "Sede – Jardim América",
    categoria: "Terça",
  }
];

const MESES = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

// "AAAA-MM-DD" do evento, para comparar/ordenar como texto
function dataEvento(e: { dia: string; mes: string; ano: string }) {
  const mes = String(MESES.indexOf(e.mes) + 1).padStart(2, "0");
  return `${e.ano}-${mes}-${e.dia.padStart(2, "0")}`;
}

// ─── Componentes ──────────────────────────────────────────────────────────────

const IconeRelogio = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconeLocal = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// ─── Página ───────────────────────────────────────────────────────────────────

const ProgramacaoPage = () => {
  const hoje = new Date().toLocaleDateString("en-CA", { timeZone: "America/Sao_Paulo" }); // AAAA-MM-DD
  const eventos = proximosEventos
    .filter((e) => dataEvento(e) >= hoje)
    .sort((a, b) => dataEvento(a).localeCompare(dataEvento(b)));

  return (
    <>
      <Breadcrumb
        pageName="Programação"
        description="Cultos semanais e próximos eventos da AD Missão Jardim América."
      />

      {/* ── Programação Semanal ── */}
      <section className="pb-16 pt-10 md:pb-20 md:pt-14">
        <div className="container">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
              Toda semana
            </span>
            <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
              Programação Semanal
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body-color">
              Nossos cultos acontecem toda semana. Venha nos visitar!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cultosSemana.map((dia) =>
              dia.cultos.map((culto, i) => (
                <div
                  key={`${dia.dia}-${i}`}
                  className={`rounded-2xl border p-6 transition-shadow hover:shadow-lg ${culto.corLight} ${culto.corBorda}`}
                >
                  {/* Dia + hora */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-body-color">
                      {dia.dia}
                    </span>
                    <span
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${culto.corTexto} bg-white/70 dark:bg-white/5`}
                    >
                      <IconeRelogio />
                      {culto.horario}
                    </span>
                  </div>

                  {/* Barra colorida */}
                  <div className={`mb-4 h-1 w-12 rounded-full ${culto.cor}`} />

                  {/* Título */}
                  <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                    {culto.titulo}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-body-color">
                    {culto.descricao}
                  </p>

                  {/* Local */}
                  <div className="flex items-center gap-1.5 text-xs text-body-color">
                    <IconeLocal />
                    {culto.local}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── Próximos Eventos ── */}
      <section className="bg-gray-50 py-16 dark:bg-[#1D2144] md:py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
              Agenda
            </span>
            <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
              Próximos Eventos
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-body-color">
              Fique por dentro dos eventos especiais e conferências da nossa igreja.
            </p>
          </div>

          {eventos.length === 0 && (
            <p className="mx-auto max-w-md rounded-2xl border border-body-color/10 bg-white p-8 text-center text-body-color dark:bg-dark">
              Nenhum evento especial agendado no momento. Acompanhe nossas redes
              sociais para novidades.
            </p>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento) => (
              <div
                key={evento.id}
                className="group flex overflow-hidden rounded-2xl border border-body-color/10 bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-dark"
              >
                {/* Coluna da data */}
                <div className="flex w-20 flex-shrink-0 flex-col items-center justify-center bg-primary px-2 py-6 text-white">
                  <span className="text-3xl font-extrabold leading-none">{evento.dia}</span>
                  <span className="mt-1 text-xs font-semibold uppercase tracking-wider opacity-90">
                    {evento.mes}
                  </span>
                  <span className="mt-0.5 text-xs opacity-70">{evento.ano}</span>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${coresCategorias[evento.categoria]}`}
                      >
                        {evento.categoria}
                      </span>
                      <span className="text-xs text-body-color">{evento.diaSemana}</span>
                    </div>
                    <h3 className="mb-1.5 text-base font-bold text-black dark:text-white">
                      {evento.titulo}
                    </h3>
                    <p className="text-sm leading-relaxed text-body-color line-clamp-2">
                      {evento.descricao}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-body-color/10 pt-4 text-xs text-body-color">
                    <span className="flex items-center gap-1">
                      <IconeRelogio />
                      {evento.horario}
                    </span>
                    <span className="flex items-center gap-1">
                      <IconeLocal />
                      {evento.local}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Banner CTA ── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="overflow-hidden rounded-3xl bg-primary px-8 py-12 md:px-16 md:py-16">
            <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
              <div>
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  Ficou com dúvidas sobre algum evento?
                </h3>
                <p className="mt-2 text-base text-white/80">
                  Entre em contato conosco pelas redes sociais ou venha pessoalmente à sede.
                </p>
              </div>
              <div className="flex flex-shrink-0 flex-wrap gap-3">
                <a
                  href={REDES.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
                >
                  Instagram
                </a>
                <a
                  href={REDES.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border-2 border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgramacaoPage;
