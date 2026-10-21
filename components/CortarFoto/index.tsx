"use client";

import { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

// Tamanho final da foto recortada (proporção 3x4)
const LARGURA_SAIDA = 600;
const ALTURA_SAIDA = 800;

interface Props {
  arquivo: File;
  onConfirmar: (foto: File) => void;
  onCancelar: () => void;
}

export default function CortarFoto({ arquivo, onConfirmar, onCancelar }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<Cropper | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(arquivo);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [arquivo]);

  useEffect(() => {
    if (!url || !imgRef.current) return;
    const cropper = new Cropper(imgRef.current, {
      aspectRatio: 3 / 4,
      viewMode: 1,
      autoCropArea: 1,
      dragMode: "move",
      background: false,
    });
    cropperRef.current = cropper;
    return () => {
      cropper.destroy();
      cropperRef.current = null;
    };
  }, [url]);

  function confirmar() {
    const canvas = cropperRef.current?.getCroppedCanvas({
      width: LARGURA_SAIDA,
      height: ALTURA_SAIDA,
      imageSmoothingQuality: "high",
    });
    if (!canvas) return;
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const nome = arquivo.name.replace(/\.[^.]+$/, "") + ".jpg";
        onConfirmar(new File([blob], nome, { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92,
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg space-y-4 rounded-2xl bg-white dark:bg-dark p-6 shadow-lg">
        <h2 className="text-xl font-bold text-dark dark:text-white">Recortar foto (3x4)</h2>

        <div className="h-[60vh] max-h-[480px] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          {/* Cropper precisa de <img> nativo, não next/image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {url && <img ref={imgRef} src={url} alt="Foto do membro" className="block max-w-full" />}
        </div>

        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => cropperRef.current?.rotate(-90)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm text-gray-700 dark:text-white"
          >
            ⟲ Girar
          </button>
          <button
            type="button"
            onClick={() => cropperRef.current?.rotate(90)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm text-gray-700 dark:text-white"
          >
            Girar ⟳
          </button>
          <button
            type="button"
            onClick={() => cropperRef.current?.reset()}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm text-gray-700 dark:text-white"
          >
            Resetar
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium text-gray-700 dark:text-white transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={confirmar}
            className="flex-1 rounded-xl bg-primary px-4 py-3 font-medium text-white hover:bg-primary/90 transition"
          >
            Recortar
          </button>
        </div>
      </div>
    </div>
  );
}
