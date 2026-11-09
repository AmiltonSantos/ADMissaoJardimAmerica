"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { missoes } from "../Missoes/data";

const Seta = ({ direcao }: { direcao: "prev" | "next" }) => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d={direcao === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
    />
  </svg>
);

const botaoSeta =
  "absolute top-1/2 z-10 flex h-[50px] w-10 -translate-y-1/2 items-center justify-center bg-black/90 text-white transition hover:bg-[#1863dc]";

/*
 * Medidas baseadas no adbelem.org.br (tela de 1912px):
 *  - cards 16:9 (~893x500), cantos 30px, espaço de 20px entre eles
 *  - 2 cards inteiros no desktop + pontas (~30px) dos vizinhos nas laterais
 *    → padding lateral de 50px no trilho = 30px de ponta + 20px de espaço
 */
const MissoesCarrossel = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="overflow-hidden bg-[#F9F9F9] py-12 dark:bg-[#151516] md:py-16">
      {/* Cabeçalho centralizado */}
      <div className="container mb-10 text-center">
        <span className="mb-2 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#1C1C1D] dark:text-white/70 md:text-sm">
          <span className="h-px w-8 bg-current" />
          Nossas Missões
          <span className="h-px w-8 bg-current" />
        </span>
        <h2 className="text-3xl font-normal text-[#093060] dark:text-white md:text-4xl lg:text-[45px]">
          Nossa geração, nosso propósito
        </h2>
      </div>

      {/* Trilho de largura total */}
      <div className="relative px-6 md:px-10 lg:px-[50px]">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Anterior"
          className={`${botaoSeta} left-0`}
        >
          <Seta direcao="prev" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Próximo"
          className={`${botaoSeta} right-0`}
        >
          <Seta direcao="next" />
        </button>

        <Swiper
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 992: { slidesPerView: 2 } }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          modules={[Autoplay]}
          className="!overflow-visible"
        >
          {missoes.map((m) => (
            <SwiperSlide key={m.id}>
              <div
                className={`group relative aspect-[16/9] overflow-hidden rounded-[20px] md:rounded-[30px] ${
                  m.imagem ? "bg-[#1C1C1D]" : `bg-gradient-to-br ${m.gradient}`
                }`}
              >
                {m.imagem ? (
                  <Image
                    src={m.imagem}
                    alt={`Missão ${m.titulo}`}
                    fill
                    sizes="(min-width: 992px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  // Sem foto: ícone grande ao fundo
                  <div className="absolute -bottom-10 -right-10 text-white/10 [&_svg]:h-64 [&_svg]:w-64">
                    {m.icon}
                  </div>
                )}

                {/* Overlay escuro */}
                <div className="absolute inset-0 bg-[#0b1a33]/60 transition group-hover:bg-[#0b1a33]/50" />

                {/* Texto central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                  <h3 className="mb-3 text-2xl font-normal md:text-[30px]">
                    Missão {m.titulo}
                  </h3>
                  <Link
                    href={m.href}
                    className="rounded-md border border-white px-3 py-1.5 text-xs uppercase tracking-wider text-white transition hover:bg-white hover:text-[#093060]"
                  >
                    Saber mais
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MissoesCarrossel;
