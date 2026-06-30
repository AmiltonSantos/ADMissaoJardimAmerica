"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

function toDate(iso: string): Date | undefined {
  if (!iso) return undefined;
  const d = new Date(iso + "T00:00:00");
  return isNaN(d.getTime()) ? undefined : d;
}

function toISO(date: Date): string {
  return date.toISOString().slice(0, 10);
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
  const [open, setOpen] = useState(false);
  const selected = toDate(value);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = maskDate(e.target.value);
    setInputText(masked);
    const iso = brToISO(masked);
    onChange(iso ?? "");
  }

  function handleCalendarSelect(date: Date | undefined) {
    if (!date) return;
    const iso = toISO(date);
    onChange(iso);
    setInputText(isoToBR(iso));
    setOpen(false);
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-white mb-2">{label}</label>

      <div className="flex items-center border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
        <input
          type="text"
          inputMode="numeric"
          placeholder="dd/mm/aaaa"
          value={inputText}
          onChange={handleInputChange}
          className="flex-1 p-4 outline-none bg-white text-gray-900 placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="px-4 py-4 hover:bg-gray-50 transition-colors border-l"
        >
          <CalendarIcon className="w-5 h-5 text-primary" />
        </button>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border bg-white shadow-xl p-4">
          <DayPicker
            mode="single"
            selected={selected}
            locale={ptBR}
            onSelect={handleCalendarSelect}
            captionLayout="dropdown"
            startMonth={new Date(1900, 0)}
            endMonth={new Date()}
            classNames={{
              root: "w-full",
              months: "w-full",
              month: "w-full",
              month_caption: "flex items-center justify-between mb-3",
              caption_label: "text-sm font-semibold text-gray-800",
              nav: "flex items-center gap-1",
              button_previous: "p-1 rounded-lg hover:bg-primary/10 text-primary transition-colors",
              button_next: "p-1 rounded-lg hover:bg-primary/10 text-primary transition-colors",
              month_grid: "w-full border-collapse",
              weekdays: "flex",
              weekday: "flex-1 text-center text-xs font-medium text-gray-400 py-2",
              week: "flex",
              day: "flex-1 p-0",
              day_button: "w-full aspect-square flex items-center justify-center text-sm rounded-full hover:bg-primary/10 transition-colors",
              selected: "bg-primary text-white rounded-full",
              today: "font-bold text-primary",
              outside: "text-gray-300",
              disabled: "text-gray-200 cursor-not-allowed",
              dropdowns: "flex items-center gap-2",
              dropdown: "text-sm border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary",
            }}
            components={{
              Chevron: ({ orientation }) =>
                orientation === "left"
                  ? <ChevronLeftIcon className="w-4 h-4" />
                  : <ChevronRightIcon className="w-4 h-4" />,
            }}
          />
        </div>
      )}

      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
    </div>
  );
}
