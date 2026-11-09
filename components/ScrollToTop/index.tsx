"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const atualizar = () => setVisivel(window.scrollY > 300);
    window.addEventListener("scroll", atualizar, { passive: true });
    return () => window.removeEventListener("scroll", atualizar);
  }, []);

  if (!visivel) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className="fixed bottom-8 right-8 z-[99] flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
    >
      <span className="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white" />
    </button>
  );
}
