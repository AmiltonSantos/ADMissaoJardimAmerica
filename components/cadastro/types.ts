export type FieldType =
  | "text"
  | "cpf"
  | "rg"
  | "date"
  | "phone"
  | "cep"
  | "select-group"
  | "select"
  | "radio";

export interface CongregacaoGroup {
  regional: string;
  options: { value: string }[];
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[] | SelectOption[] | CongregacaoGroup[];
}

export interface FormStep {
  step: number;
  title: string;
  fields: Question[];
}

export type FormData = Record<string, string>;
