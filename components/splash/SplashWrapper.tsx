"use client";

import { useState, useEffect } from "react";
import Splash from "./splash";

export default function SplashWrapper() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (document.readyState === "complete") {
      const seen = sessionStorage.getItem("seenSplash");
      if (seen) setShow(false);
    }
  }, []);
  
  const handleFinish = () => {
    //sessionStorage.setItem("seenSplash", "1");
    setShow(false);
  };

  if (!show) return null;

  return <Splash onFinish={handleFinish} />;
}