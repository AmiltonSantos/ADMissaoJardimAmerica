"use client";

import { useState } from "react";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayDelay = 2500; // 5 segundos por slide

  const images = [
    {
      url: '/images/hero/igreja01.jpeg'
    },
    {
      url: '/images/hero/igreja02.jpeg'
    },
    {
      url: '/images/hero/igreja03.jpeg'
    },
    {
      url: '/images/hero/igreja04.jpeg'
    },
    {
      url: '/images/hero/igreja05.jpeg'
    }
  ];

  return (
    <section
      id="home"
      className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
    >
      {/* Slider principal */}
      <div className="absolute inset-0 z-0">
        <Swiper
          spaceBetween={0}
          effect={'fade'}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
          className="h-full w-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${image.url})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
     
      {/* Barra de progresso */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1.5 bg-white/20">
        <div 
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{
            width: `${100 / images.length}%`,
            transform: `translateX(${activeIndex * 100}%)`
          }}
        />
      </div>

      {/* Indicadores de slide */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${index === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'}`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;