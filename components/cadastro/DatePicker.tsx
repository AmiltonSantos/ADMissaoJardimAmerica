"use client";

import { useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

function isoToBR(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function brToISO(br: string): string | null {
  const match = br.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const [, d, m, y] = match;
  const date = new Date(`${y}-${m}-${d}T00:00:00`);
  if (isNaN(date.getTime())) return null;
  return `${y}-${m}-${d}`;
}

function maskDate(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  return digits
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
}

export default function DatePicker({ value, onChange, label }: Props) {
  const [inputText, setInputText] = useState(() => isoToBR(value));

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = maskDate(e.target.value);
    setInputText(masked);
    const iso = brToISO(masked);
    onChange(iso ?? "");
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">{label}</label>
      <input
        type="text"
        inputMode="numeric"
        placeholder="dd/mm/aaaa"
        value={inputText}
        onChange={handleInputChange}
        className="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
      />
    </div>
  );
}
