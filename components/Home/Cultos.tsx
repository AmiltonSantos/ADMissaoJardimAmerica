import Link from "next/link";
import { cultosSemana } from "@/lib/programacao";

const Cultos = () => {
  const cultos = cultosSemana.flatMap((d) =>
    d.cultos.map((c) => ({ ...c, dia: d.dia, diaCurto: d.diaCurto })),
  );

  return (
    <section className="bg-white py-16 dark:bg-[#1C1C1D] md:py-24">
      <div className="container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#1863dc]">
              Programação
            </span>
            <h2 className="text-3xl font-extrabold text-[#093060] dark:text-white md:text-4xl lg:text-[42px]">
              Nossos Cultos
            </h2>
          </div>
          <Link
            href="/programacao"
            className="rounded-full border-2 border-[#093060] px-7 py-3 text-sm font-bold uppercase tracking-wider text-[#093060] transition hover:bg-[#093060] hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#093060]"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cultos.map((c) => (
            <div
              key={`${c.dia}-${c.horario}`}
              className="flex overflow-hidden rounded-2xl border border-stroke bg-[#F4F4F4] transition hover:shadow-lg dark:border-white/10 dark:bg-[#151516]"
            >
              <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-[#093060] px-2 py-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  {c.diaCurto}
                </span>
                <span className="mt-1 text-xl font-extrabold">{c.horario}</span>
              </div>
              <div className="p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#1863dc]">
                  {c.dia}
                </p>
                <h3 className="mb-2 text-lg font-bold leading-snug text-[#093060] dark:text-white">
                  {c.titulo}
                </h3>
                <p className="mb-3 text-sm text-body-color">{c.descricao}</p>
                <p className="inline-flex items-center gap-1.5 text-xs text-body-color">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {c.local}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cultos;
