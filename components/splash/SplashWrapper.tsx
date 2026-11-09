"use client";

import { useEffect, useState } from "react";
import Splash from "./splash";

const CHAVE = "seenSplash";

// Mostra a abertura só na primeira visita da sessão
export default function SplashWrapper() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(CHAVE)) setShow(false);
    } catch {
      // sessionStorage bloqueado: segue mostrando a abertura
    }
  }, []);

  const handleFinish = () => {
    try {
      sessionStorage.setItem(CHAVE, "1");
    } catch {}
    setShow(false);
  };

  if (!show) return null;

  return <Splash onFinish={handleFinish} />;
}
