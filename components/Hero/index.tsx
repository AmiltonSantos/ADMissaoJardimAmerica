"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

const AUTOPLAY_DELAY = 5000;

const slides = [
  {
    url: "/images/hero/igreja01.png",
    kenBurns: "hero-zoom-in",
    transition: "hero-wipe-left",   // wipe horizontal
  },
  {
    url: "/images/hero/igreja02.png",
    kenBurns: "hero-zoom-out",
    transition: "hero-dissolve",    // zoom + fade
  },
  {
    url: "/images/hero/igreja03.png",
    kenBurns: "hero-pan-left",
    transition: "hero-curtain",     // cortina de cima
  },
  {
    url: "/images/hero/igreja04.jpeg",
    kenBurns: "hero-pan-right",
    transition: "hero-diagonal",    // diagonal
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const activeRef = useRef(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  const handleSlideChange = (swiper: SwiperClass) => {
    setPrevIndex(activeRef.current);
    activeRef.current = swiper.realIndex;
    setActiveIndex(swiper.realIndex);
  };

  return (
    <section
      id="home"
      className="dark:bg-gray-dark relative z-10 h-[560px] overflow-hidden bg-black md:h-[640px] lg:h-[760px]"
    >
      {/* ── Layers visuais ── */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPrev = index === prevIndex;

          return (
            <div
              key={index}
              className={`absolute inset-0 ${
                isActive
                  ? prevIndex === null
                    ? "" // primeira carga: sem animação de entrada
                    : slide.transition
                  : isPrev
                  ? "opacity-0 transition-opacity duration-700"
                  : "opacity-0"
              }`}
              style={{ zIndex: isActive ? 2 : isPrev ? 1 : 0 }}
            >
              {/* Ken Burns na imagem */}
              <div
                key={isActive ? `kb-${activeIndex}` : `kb-idle-${index}`}
                className={`h-full w-full bg-cover bg-center ${
                  isActive ? slide.kenBurns : ""
                }`}
                style={{ backgroundImage: `url(${slide.url})` }}
              />
            </div>
          );
        })}

        {/* Overlay escuro */}
        <div className="absolute inset-0 z-10 bg-black/45" />
      </div>

      {/* ── Swiper invisível — só controla autoplay e índice ── */}
      <div className="pointer-events-none absolute inset-0 opacity-0" aria-hidden="true">
        <Swiper
          speed={1}
          loop
          autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="h-full w-full"
          onSwiper={(s) => { swiperRef.current = s; }}
          onSlideChange={handleSlideChange}
        >
          {slides.map((_, i) => (
            <SwiperSlide key={i} />
          ))}
        </Swiper>
      </div>

      {/* ── Texto centralizado ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-white">
        <div>
          <h1 className="text-3xl font-bold drop-shadow-lg md:text-5xl xl:text-6xl">
            AD Missão Jardim América
          </h1>
          <p className="mt-4 text-base opacity-90 drop-shadow md:text-xl">
            Assembleia de Deus · Goiânia - Goiás
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/location"
              className="rounded-md bg-white px-7 py-3 text-base font-semibold text-primary shadow transition hover:bg-white/90"
            >
              Como Chegar
            </Link>
            <a
              href="https://www.youtube.com/@assembleiadedeusmissao-jar3253"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-2 border-white px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Assistir no YouTube
            </a>
          </div>
        </div>
      </div>

      {/* ── Indicadores clicáveis ── */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-6 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* ── Barra de progresso ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
        <div
          key={activeIndex}
          className="hero-progress h-full bg-white"
          style={{ animationDuration: `${AUTOPLAY_DELAY}ms` }}
        />
      </div>
    </section>
  );
};

export default Hero;
