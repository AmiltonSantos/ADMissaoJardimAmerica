"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import ModalVideo from "react-modal-video";

const videos = [
  {
    id: 1,
    title: "CULTO DE DOMINGO- 08/03/2026",
    videoId: "v8lrY-rjgRw",
    thumb: "/images/video/v8lrY-rjgRw.png",
  },
  {
    id: 2,
    title: "CULTO DE MISSÕES - 01/03/2026",
    videoId: "af-Frythh8M",
    thumb: "/images/video/af-Frythh8M.png",
  },
  {
    id: 3,
    title: "CULTO DE ENSINO - 24/02/2026",
    videoId: "ELkE6B2OWhE",
    thumb: "/images/video/ELkE6B2OWhE.png",
  },
  {
    id: 4,
    title: "CULTO DE MULHERES - 22/02/2026",
    videoId: "48Xul15vfe8",
    thumb: "/images/video/48Xul15vfe8.png",
  },
];

const Video = () => {
  const [isOpen, setOpen] = useState(false);
  const [videoId, setVideoId] = useState("");

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="CANAL DO YOUTUBE"
          paragraph="CULTO DE MISSÕES - AD Missão Jardim América"
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          {videos.map((video) => (
            <div key={video.id} className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="mx-auto mb-10 max-w-[370px] overflow-hidden rounded-md">
                <div className="relative aspect-[77/40]">
                  <Image src={video.thumb} alt={video.title} fill />

                  <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                    <button
                      aria-label="video play button"
                      onClick={() => {
                        setVideoId(video.videoId);
                        setOpen(true);
                      }}
                      className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        className="fill-current"
                      >
                        <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="bg-white p-4 text-center dark:bg-dark">
                  <h3 className="text-base font-semibold">{video.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={videoId}
        onClose={() => setOpen(false)}
      />

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;