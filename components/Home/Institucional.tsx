"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { congregacoes } from "@/lib/congregacoes";
import { ANO_FUNDACAO, REDES } from "@/lib/igreja";
import { missoes } from "../Missoes/data";

const contadores = [
  { valor: new Date().getFullYear() - ANO_FUNDACAO, label: "Anos de existência" },
  { valor: congregacoes.length, label: "Congregações" },
  { valor: congregacoes.filter((c) => "isSubSede" in c && c.isSubSede).length, label: "Sub-sedes" },
  { valor: missoes.length, label: "Missões" },
];

// Conta de 0 até `valor` quando o elemento entra na tela
const Contador = ({ valor, ativo }: { valor: number; ativo: boolean }) => {
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (!ativo) return;
    const duracao = 1600;
    const inicio = performance.now();
    let raf = 0;
    const tick = (agora: number) => {
      const p = Math.min((agora - inicio) / duracao, 1);
      setAtual(Math.round(valor * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ativo, valor]);

  return <>{atual}</>;
};

const Institucional = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 dark:bg-[#1C1C1D] md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Imagem com play → canal do YouTube */}
          <a
            href={REDES.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-video overflow-hidden rounded-2xl shadow-xl"
            aria-label="Assistir no YouTube"
          >
            <Image
              src="/images/location/sede.jpg"
              alt="AD Missão Jardim América - Sede"
              fill
              sizes="(min-width: 992px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#093060]/40 transition group-hover:bg-[#093060]/55" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#1863dc] shadow-2xl ring-8 ring-white/25 transition group-hover:scale-110">
                <svg width="20" height="22" viewBox="0 0 16 18" className="ml-1 fill-current">
                  <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                </svg>
              </span>
            </div>
            <span className="absolute bottom-4 left-4 rounded-full bg-[#093060]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              Vídeo Institucional
            </span>
          </a>

          {/* Texto */}
          <div>
            <span className="mb-3 block text-sm font-bold uppercase tracking-[0.2em] text-[#1863dc]">
              Quem Somos
            </span>
            <h2 className="mb-6 text-3xl font-extrabold leading-tight text-[#093060] dark:text-white md:text-4xl lg:text-[42px]">
              Vidas transformadas pelo poder do Espírito Santo
            </h2>
            <p className="mb-5 text-base leading-relaxed text-body-color md:text-lg">
              A AD Missão Jardim América está presente em Goiânia, região
              metropolitana e cidades vizinhas, levando a Palavra de Deus a
              cada bairro e comunidade.
            </p>
            <p className="mb-8 text-base leading-relaxed text-body-color md:text-lg">
              Nossa visão é ver famílias restauradas e comunidades impactadas
              pelo amor de Cristo.
            </p>
            <Link
              href="/location"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1863dc] transition hover:gap-3"
            >
              Ver congregações no mapa
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Contadores */}
        <div
          ref={ref}
          className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl bg-[#093060] lg:grid-cols-4"
        >
          {contadores.map((c, i) => (
            <div
              key={c.label}
              className={`px-4 py-8 text-center text-white md:py-10 ${
                i % 2 === 0 ? "border-r border-white/10" : ""
              } ${i < 2 ? "border-b border-white/10 lg:border-b-0" : ""} ${
                i === 1 ? "lg:border-r" : ""
              }`}
            >
              <p className="text-4xl font-extrabold md:text-5xl">
                <Contador valor={c.valor} ativo={visivel} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/70 md:text-sm">
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Institucional;
