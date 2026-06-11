"use client";

import Link from "next/link";
import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

const missoes = [
  {
    id: 1,
    titulo: "Evangelismo",
    descricao: "Levando o Evangelho a cada bairro e comunidade de Goiânia.",
    gradient: "from-blue-600 via-blue-700 to-blue-900",
    href: "/about",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    titulo: "Jovens",
    descricao: "Uma geração apaixonada por Deus, transformando o presente e o futuro.",
    gradient: "from-purple-600 via-purple-700 to-purple-900",
    href: "/about",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    titulo: "Mulheres",
    descricao: "Fortalecendo a fé e a identidade de cada mulher em Cristo.",
    gradient: "from-pink-500 via-pink-600 to-rose-800",
    href: "/about",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 4,
    titulo: "Homens",
    descricao: "Homens de Deus, pilares de família e de comunidade.",
    gradient: "from-slate-600 via-slate-700 to-slate-900",
    href: "/about",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    id: 5,
    titulo: "Crianças",
    descricao: "Plantando a semente da fé desde a infância com amor e alegria.",
    gradient: "from-yellow-500 via-orange-500 to-orange-700",
    href: "/about",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    id: 6,
    titulo: "Família",
    descricao: "Restaurando e fortalecendo lares pelo poder da Palavra.",
    gradient: "from-green-600 via-green-700 to-emerald-900",
    href: "/about",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 7,
    titulo: "Missões",
    descricao: "Alcançando nações com a mensagem de salvação de Cristo.",
    gradient: "from-red-600 via-red-700 to-red-900",
    href: "/about",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    id: 8,
    titulo: "Adotes",
    descricao: "Grupos de vida onde o cuidado e a comunhão acontecem de perto.",
    gradient: "from-teal-600 via-teal-700 to-teal-900",
    href: "/about",
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

const ArrowIcon = ({ direction }: { direction: "prev" | "next" }) => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
    />
  </svg>
);

const Missoes = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="overflow-hidden bg-gray-50 py-16 dark:bg-[#1D2144] md:py-24">
      <div className="container">
        {/* Título */}
        <div className="mb-12 text-center">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
            Nossas Missões
          </span>
          <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-[42px]">
            Nossa geração, nosso propósito
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body-color">
            Cada pessoa importa. Cada fase da vida tem um ministério dedicado
            a ela, com amor, propósito e cuidado.
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative">
          {/* Seta anterior */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Anterior"
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-primary hover:text-white dark:bg-dark dark:text-white dark:hover:bg-primary lg:-left-6"
          >
            <ArrowIcon direction="prev" />
          </button>

          {/* Seta próximo */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Próximo"
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-primary hover:text-white dark:bg-dark dark:text-white dark:hover:bg-primary lg:-right-6"
          >
            <ArrowIcon direction="next" />
          </button>

          <Swiper
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            spaceBetween={24}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            modules={[Autoplay]}
            breakpoints={{
              0:    { slidesPerView: 1 },
              640:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="px-1 py-2"
          >
            {missoes.map((m) => (
              <SwiperSlide key={m.id}>
                <div
                  className={`group relative h-[400px] overflow-hidden rounded-2xl bg-gradient-to-br ${m.gradient} shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  {/* Padrão decorativo de fundo */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white" />
                    <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white" />
                  </div>

                  {/* Overlay gradiente inferior */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Conteúdo */}
                  <div className="absolute inset-0 flex flex-col justify-between p-8">
                    {/* Ícone no topo */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                      {m.icon}
                    </div>

                    {/* Texto e botão na base */}
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-white">
                        {m.titulo}
                      </h3>
                      <p className="mb-5 text-sm leading-relaxed text-white/80">
                        {m.descricao}
                      </p>
                      <Link
                        href={m.href}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/60 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-gray-900"
                      >
                        Saiba mais
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Missoes;
