"use client";

import { useEffect, useRef, useState } from "react";

export default function Splash({ onFinish }: { onFinish?: () => void }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const DRAW_DUR = 2500;
  const STAGGER = 400;
  const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const splashEl = svgRef.current?.closest(".splash");

    // ativa animação APENAS uma vez
    requestAnimationFrame(() => {
      splashEl?.classList.add("show");
    });
    
    const run = () => {
      const paths = svgRef.current?.querySelectorAll("path");
      if (!paths || paths.length === 0) {
        requestAnimationFrame(run);
        return;
      }

      // garante que todos têm length
      const allReady = Array.from(paths).every(
        (p) => p.getTotalLength() > 0
      );

      if (!allReady) {
        requestAnimationFrame(run);
        return;
      }

      startAnimation(paths);
    };

    const startAnimation = (paths: NodeListOf<SVGPathElement>) => {
      const arr = Array.from(paths).map((el) => {
        const len = el.getTotalLength();

        el.style.transition = "none";
        el.style.filter =
          "drop-shadow(0 0 4px rgba(0,158,224,0.4)) drop-shadow(0 0 10px rgba(16,42,131,0.6))";
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = `${len}`;
        el.style.fill = "none";

        // força reflow
        el.getBoundingClientRect();

        return el;
      });

      requestAnimationFrame(() => {
        arr.forEach((el, i) => {
          el.style.transition = `stroke-dashoffset ${DRAW_DUR}ms ${
            i * STAGGER
          }ms ${EASE}`;
          el.style.strokeDashoffset = "0";
        });

        const total = DRAW_DUR + arr.length * STAGGER;

        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            onFinish?.();
          }, 500);
        }, total);
      });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(run);
    });
  }, [onFinish]);

  return (
    <div className={`splash ${fadeOut ? "fade-out" : ""}`}>
      <svg
        ref={svgRef}
        viewBox="200 100 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="a">
            <stop offset="0%" stopColor="#009ee0" />
            <stop offset="58%" stopColor="#102a83" />
            <stop offset="100%" stopColor="#102a83" />
          </linearGradient>

          <linearGradient
            href="#a"
            id="c"
            x1="169.657"
            x2="169.657"
            y1="411.836"
            y2="615.701"
            gradientTransform="scale(1.45188 .68876)"
            gradientUnits="userSpaceOnUse"
          />

          <linearGradient id="b">
            <stop offset="0%" stopColor="#ffec00" />
            <stop offset="33%" stopColor="#e30016" />
            <stop offset="76%" stopColor="#102a83" />
            <stop offset="100%" stopColor="#102a83" />
          </linearGradient>

          <linearGradient
            href="#b"
            id="d"
            x1="391.681"
            x2="391.681"
            y1="99.727"
            y2="311.845"
            gradientTransform="scale(.8535 1.17164)"
            gradientUnits="userSpaceOnUse"
          />
        </defs>

        <path
          strokeWidth="2"
          stroke="url(#c)"
          d="M542.309 424.072h-70.581c-23.96-56.67-76.898-101.507-134.922-120.36-69.578-23.669-109.386 58.232-41.151 72.804 38.242 5.462 77.764-2.515 118.25-20.62l29.878 35.348c-48.587 21.111-94.632 27.985-137.608 17.675-35.633-10.94-59.2-28.192-59.756-59.335q-1.893-35.559 33.244-54.286c89.598-45.63 225.567 52.442 262.646 128.774"
        />

        <path
          strokeWidth="2"
          stroke="url(#d)"
          d="M337.794 284.52a159 159 0 0 1 9.134-29.277c21.384-52.633 35.87-94.867 10.263-138.399h1.02c122.58 15.451 206.94 124.128 123.94 234.371l-57.512-.315 24.684-26.717c76.14-76.928 23.245-172.732-61.848-185.04 9.523 61.993-23.89 111.037-31.677 169.207-2.569 21.384-.918 39.43 7.636 55.298l-24.101 1.722c-4.327-21.147-6.275-42.296-4.195-63.442.364-5.803 1.18-11.606 2.656-17.408"
        />
      </svg>
    </div>
  );
}