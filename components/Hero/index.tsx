"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

const AUTOPLAY_DELAY = 4000;

const images = [
  { url: "/images/hero/igreja01.png", anim: "hero-zoom-in"   },
  { url: "/images/hero/igreja02.png", anim: "hero-zoom-out"  },
  { url: "/images/hero/igreja03.png", anim: "hero-pan-left"  },
  { url: "/images/hero/igreja04.jpeg", anim: "hero-pan-right" },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section
      id="home"
      className="dark:bg-gray-dark relative z-10 h-[560px] overflow-hidden bg-white md:h-[640px] lg:h-[760px]"
    >
      {/* Slider com fade */}
      <div className="absolute inset-0 z-0">
        <Swiper
          spaceBetween={0}
          effect="fade"
          autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
          loop
          modules={[Autoplay, EffectFade]}
          className="h-full w-full"
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                key={index === activeIndex ? `active-${activeIndex}` : `idle-${index}`}
                className={`h-full w-full bg-cover bg-center ${index === activeIndex ? image.anim : ""}`}
                style={{ backgroundImage: `url(${image.url})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 z-10 bg-black/45" />
      </div>

      {/* Texto centralizado */}
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

      {/* Indicadores clicáveis */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, index) => (
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

      {/* Barra de progresso */}
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
