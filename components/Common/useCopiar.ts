"use client";

import { useEffect, useRef, useState } from "react";

// Copia um texto para a área de transferência e indica sucesso por alguns segundos
export function useCopiar(duracao = 2500) {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copiar = (texto: string) => {
    navigator.clipboard
      ?.writeText(texto)
      .then(() => {
        setCopiado(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopiado(false), duracao);
      })
      .catch(() => {});
  };

  return { copiado, copiar };
}
