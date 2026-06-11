"use client";

import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const congregacoes = [
  { id: 1, nome: "Sede", bairro: "Jardim América", isSede: true },
  { id: 2, nome: "Setor dos Afonsos", bairro: "Goiânia" },
  { id: 3, nome: "Faiçalville", bairro: "Goiânia" },
  { id: 4, nome: "Eli Forte", bairro: "Goiânia" },
  { id: 5, nome: "Norte Ferroviário", bairro: "Goiânia" },
  { id: 6, nome: "Recanto do Bosque", bairro: "Goiânia" },
  { id: 7, nome: "Boa Vista", bairro: "Goiânia" },
  { id: 8, nome: "14 Bis", bairro: "Goiânia" },
  { id: 9, nome: "João Braz", bairro: "Goiânia" },
  { id: 10, nome: "Buriti Sereno", bairro: "Goiânia" },
  { id: 11, nome: "Veiga Jardim", bairro: "Goiânia" },
  { id: 12, nome: "Jardim Itaipú", bairro: "Goiânia" },
  { id: 13, nome: "Cardoso II", bairro: "Goiânia" },
  { id: 14, nome: "Flor do Ipê", bairro: "Goiânia" },
  { id: 15, nome: "Pedro Miranda", bairro: "Goiânia" },
  { id: 16, nome: "Alice Barbosa", bairro: "Goiânia" },
  { id: 17, nome: "Itanhangá", bairro: "Goiânia" },
  { id: 18, nome: "Jardim Todos os Santos II", bairro: "Goiânia" },
  { id: 19, nome: "Jardim Todos os Santos III", bairro: "Goiânia" },
  { id: 20, nome: "Bonfinópolis", bairro: "Goiás" },
  { id: 21, nome: "Aragoiânia", bairro: "Goiás" },
  { id: 22, nome: "São Bernardo", bairro: "Goiânia" },
  { id: 23, nome: "Anápolis", bairro: "Goiás" },
];

const PinIcon = () => (
  <svg
    className="h-6 w-6 text-primary"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const Congregacoes = () => {
  return (
    <section className="bg-gray-50 py-16 dark:bg-[#1D2144] md:py-24">
      <div className="container">
        {/* Título */}
        <div className="mb-12 text-center">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-primary">
            Onde Estamos
          </span>
          <h2 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
            Nossas Congregações
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-body-color">
            Estamos presentes em{" "}
            <strong>{congregacoes.length} congregações</strong> em Goiânia e
            região metropolitana.
          </p>
        </div>

        {/* Swiper horizontal */}
        <div className="overflow-hidden">
        <Swiper
          spaceBetween={16}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          modules={[Autoplay]}
          breakpoints={{
            0:    { slidesPerView: 2 },
            640:  { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-2"
        >
          {congregacoes.map((c) => (
            <SwiperSlide key={c.id}>
              <div
                className={`flex h-full flex-col gap-3 rounded-xl border p-5 shadow-sm transition-shadow hover:shadow-md ${
                  c.isSede
                    ? "border-primary/30 bg-primary/5 dark:bg-primary/10"
                    : "border-body-color/10 bg-white dark:bg-dark"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <PinIcon />
                </div>
                <div>
                  {c.isSede && (
                    <span className="mb-1 block text-xs font-semibold uppercase text-primary">
                      Sede
                    </span>
                  )}
                  <p className="text-sm font-semibold leading-snug text-black dark:text-white">
                    {c.nome}
                  </p>
                  <p className="mt-0.5 text-xs text-body-color">{c.bairro}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/location"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary/90"
          >
            Ver no Mapa
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Congregacoes;
