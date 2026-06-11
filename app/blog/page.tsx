import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programação | AD Missão Jardim América",
  description: "Confira os cultos semanais e próximos eventos da AD Missão Jardim América em Goiânia.",
};

// ─── Dados ────────────────────────────────────────────────────────────────────

const cultosSemana = [
  {
    dia: "Domingo",
    diaCurto: "Dom",
    cultos: [
      {
        horario: "09:00",
        titulo: "Culto da Manhã",
        descricao: "Louvor, adoração e pregação da Palavra.",
        cor: "bg-yellow-500",
        corLight: "bg-yellow-50 dark:bg-yellow-900/20",
        corTexto: "text-yellow-600 dark:text-yellow-400",
        corBorda: "border-yellow-200 dark:border-yellow-800",
        local: "Sede – Jardim América",
      },
      {
        horario: "18:00",
        titulo: "Culto da Tarde",
        descricao: "Momento de comunhão e edificação da fé.",
        cor: "bg-blue-500",
        corLight: "bg-blue-50 dark:bg-blue-900/20",
        corTexto: "text-blue-600 dark:text-blue-400",
        corBorda: "border-blue-200 dark:border-blue-800",
        local: "Sede – Jardim América",
      },
    ],
  },
  {
    dia: "Terça-feira",
    diaCurto: "Ter",
    cultos: [
      {
        horario: "19:30",
        titulo: "Reunião de Oração",
        descricao: "Intercessão, jejum e busca de Deus.",
        cor: "bg-purple-500",
        corLight: "bg-purple-50 dark:bg-purple-900/20",
        corTexto: "text-purple-600 dark:text-purple-400",
        corBorda: "border-purple-200 dark:border-purple-800",
        local: "Sede – Jardim América",
      },
    ],
  },
  {
    dia: "Quarta-feira",
    diaCurto: "Qua",
    cultos: [
      {
        horario: "19:30",
        titulo: "Culto de Ensino",
        descricao: "Estudo aprofundado da Bíblia para crescimento espiritual.",
        cor: "bg-green-500",
        corLight: "bg-green-50 dark:bg-green-900/20",
        corTexto: "text-green-600 dark:text-green-400",
        corBorda: "border-green-200 dark:border-green-800",
        local: "Sede – Jardim América",
      },
    ],
  },
  {
    dia: "Sexta-feira",
    diaCurto: "Sex",
    cultos: [
      {
        horario: "19:30",
        titulo: "Culto de Evangelismo",
        descricao: "Proclamação do Evangelho com foco nos perdidos.",
        cor: "bg-orange-500",
        corLight: "bg-orange-50 dark:bg-orange-900/20",
        corTexto: "text-orange-600 dark:text-orange-400",
        corBorda: "border-orange-200 dark:border-orange-800",
        local: "Sede – Jardim América",
      },
    ],
  },
];

type Categoria = "Missões" | "Jovens" | "Mulheres" | "Homens" | "Família" | "Geral" | "Adote";

const coresCategorias: Record<Categoria, string> = {
  Missões: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Jovens: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Mulheres: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  Homens: "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400",
  Família: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Geral: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Adote: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
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
    dia: "14",
    mes: "JUN",
    ano: "2026",
    diaSemana: "Domingo",
    titulo: "Culto de Missões",
    descricao: "Um culto especial dedicado à visão missionária, com testemunhos e oferta de missões.",
    horario: "18:00",
    local: "Sede – Jardim América",
    categoria: "Missões",
  },
  {
    id: 2,
    dia: "20",
    mes: "JUN",
    ano: "2026",
    diaSemana: "Sábado",
    titulo: "Conferência de Jovens",
    descricao: "Uma noite de louvor, pregação e quebrantamento para a juventude.",
    horario: "19:00",
    local: "Sede – Jardim América",
    categoria: "Jovens",
  },
  {
    id: 3,
    dia: "28",
    mes: "JUN",
    ano: "2026",
    diaSemana: "Domingo",
    titulo: "Culto de Consagração",
    descricao: "Culto especial de consagração e renovação espiritual para toda a família.",
    horario: "09:00",
    local: "Sede – Jardim América",
    categoria: "Geral",
  },
  {
    id: 4,
    dia: "05",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Domingo",
    titulo: "Encontro de Casais",
    descricao: "Um encontro especial para fortalecer e restaurar os casamentos em Cristo.",
    horario: "18:00",
    local: "Sede – Jardim América",
    categoria: "Família",
  },
  {
    id: 5,
    dia: "11",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Sábado",
    titulo: "Retiro de Adolescentes",
    descricao: "Fim de semana transformador para adolescentes com pregação, louvor e atividades.",
    horario: "08:00",
    local: "A confirmar",
    categoria: "Jovens",
  },
  {
    id: 6,
    dia: "18",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Sábado",
    titulo: "Vigília de Oração",
    descricao: "Uma noite de adoração e intercessão por Goiânia e pelas nossas congregações.",
    horario: "22:00",
    local: "Sede – Jardim América",
    categoria: "Geral",
  },
  {
    id: 7,
    dia: "25",
    mes: "JUL",
    ano: "2026",
    diaSemana: "Sábado",
    titulo: "Conferência de Mulheres",
    descricao: "Encontro de fortalecimento para mulheres com palestra, louvor e comunhão.",
    horario: "14:00",
    local: "Sede – Jardim América",
    categoria: "Mulheres",
  },
  {
    id: 8,
    dia: "01",
    mes: "AGO",
    ano: "2026",
    diaSemana: "Sábado",
    titulo: "Treinamento de Líderes de Adote",
    descricao: "Capacitação para líderes e obreiros e ministérios da igreja.",
    horario: "09:00",
    local: "Sede – Jardim América",
    categoria: "Adote",
  },
  {
    id: 9,
    dia: "08",
    mes: "AGO",
    ano: "2026",
    diaSemana: "Sábado",
    titulo: "Encontro de Homens",
    descricao: "Um dia de quebrantamento, comunhão e desafios para homens de Deus.",
    horario: "07:00",
    local: "Sede – Jardim América",
    categoria: "Homens",
  },
];

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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {proximosEventos.map((evento) => (
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
                  href="https://www.instagram.com/admissaojardimamerica/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@assembleiadedeusmissao-jar3253"
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
