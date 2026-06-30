import { Question, SelectOption } from "./types";
import DatePicker from "./DatePicker";

function maskCpf(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskCep(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 8);
  return d.replace(/(\d{5})(\d)/, "$1-$2");
}

function maskPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{1})(\d{4})(\d)/, "$1 $2-$3");
}

const inputClass =
  "w-full border border-gray-200 dark:border-gray-600 rounded-xl p-4 mt-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition";

const labelClass = "block text-sm font-medium text-white mb-1";

interface Props {
  field: Question;
  value: string;
  onChange: (value: string) => void;
}

export default function FormInput({ field, value, onChange }: Props) {
  if (field.type === "radio") {
    const options = field.options as string[];
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <div className="flex gap-3 mt-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`px-5 py-3 rounded-xl border text-sm font-medium transition ${
                value === option
                  ? "bg-primary border-primary text-white"
                  : "border-gray-200 text-gray-700 hover:border-primary"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">Selecione</option>
          {(field.options as (string | SelectOption)[]).map((item) => {
            const val = typeof item === "string" ? item : item.value;
            const lbl = typeof item === "string" ? item : item.label;
            return (
              <option key={val} value={val}>
                {lbl}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  if (field.type === "select-group") {
    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          <option value="">Selecione uma congregação</option>
          {(field.options as any[]).map((grupo) => (
            <optgroup key={grupo.regional} label={grupo.regional}>
              {grupo.options.map((item: any) => (
                <option key={item.value} value={item.value}>
                  {item.value}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "cpf" || field.type === "cep" || field.type === "phone") {
    const mask =
      field.type === "cpf" ? maskCpf : field.type === "cep" ? maskCep : maskPhone;
    const placeholder =
      field.type === "cpf"
        ? "000.000.000-00"
        : field.type === "cep"
        ? "00000-000"
        : "(00) 0 0000-0000";

    return (
      <div>
        <label className={labelClass}>{field.label}</label>
        <input
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(mask(e.target.value))}
          className={inputClass}
        />
      </div>
    );
  }

  if (field.type === "date") {
    return <DatePicker label={field.label} value={value} onChange={onChange} />;
  }

  return (
    <div>
      <label className={labelClass}>{field.label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        className={inputClass}
      />
    </div>
  );
}
