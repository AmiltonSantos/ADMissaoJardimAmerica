import { FormStep } from "../types";
import { estados } from "./estados";
import { congregacoes } from "./congregacoes";

export const steps: FormStep[] = [
  {
    step: 1,
    title: "Informações Pessoais",
    fields: [
      { id: "nome", label: "Qual seu nome completo?", type: "text", required: true },
      { id: "congregacao", label: "Onde você congrega?", type: "select-group", required: true, options: congregacoes },
      { id: "cpf", label: "Qual o número do seu CPF?", type: "cpf", required: true },
    ],
  },
  {
    step: 2,
    title: "Documentos",
    fields: [
      { id: "rg", label: "Qual o número do seu RG?", type: "rg", required: true },
      { id: "nascimento", label: "Qual a data do nascimento?", type: "date", required: true },
      { id: "sexo", label: "Masculino ou Feminino?", type: "radio", required: true, options: ["Masculino", "Feminino"] },
    ],
  },
  {
    step: 3,
    title: "Dados Gerais",
    fields: [
      {
        id: "estadoCivil",
        label: "Seu estado civil?",
        type: "select",
        required: true,
        options: ["SOLTEIRO(a)", "CASADO(a)", "DIVORCIADO(a)", "VIÚVO(a)"],
      },
      { id: "profissao", label: "Sua profissão?", type: "text", required: true },
      { id: "cidadeNascimento", label: "Cidade que você nasceu?", type: "text", required: true },
    ],
  },
  {
    step: 4,
    title: "Filiação",
    fields: [
      {
        id: "estadoNascimento",
        label: "Estado que você nasceu?",
        type: "select",
        required: true,
        options: estados.map((e) => ({ label: e.nome, value: e.sigla })),
      },
      { id: "nomeMae", label: "Nome completo da mãe?", type: "text", required: true },
      { id: "nomePai", label: "Nome completo do pai?", type: "text", required: true },
    ],
  },
  {
    step: 5,
    title: "Contato",
    fields: [
      {
        id: "escolaridade",
        label: "Sua escolaridade?",
        type: "select",
        required: true,
        options: ["FUNDAMENTAL", "MÉDIO", "SUPERIOR", "PÓS-GRADUAÇÃO", "MESTRADO", "DOUTORADO"],
      },
      { id: "whatsapp", label: "Número do Whatsapp?", type: "phone", required: true },
      { id: "cep", label: "Qual o seu CEP?", type: "cep", required: true },
    ],
  },
  {
    step: 6,
    title: "Endereço",
    fields: [
      { id: "rua", label: "Nome da sua rua?", type: "text", required: true },
      { id: "complemento", label: "Complemento (Quadra, Lote)?", type: "text", required: true },
      { id: "numeroCasa", label: "Qual número da casa?", type: "text", required: true },
    ],
  },
  {
    step: 7,
    title: "Localização",
    fields: [
      { id: "bairro", label: "Nome do bairro?", type: "text", required: true },
      { id: "cidade", label: "Cidade onde mora?", type: "text", required: true },
      {
        id: "estado",
        label: "Estado onde mora?",
        type: "select",
        required: true,
        options: estados.map((e) => e.nome),
      },
    ],
  },
  {
    step: 8,
    title: "Vida Cristã",
    fields: [
      { id: "batismoAguas", label: "Qual a data batismo nas águas?", type: "date", required: true },
      { id: "batizadoEspSanto", label: "É batizado no Espírito Santo?", type: "radio", required: true, options: ["SIM", "NÃO"] },
      { id: "batismoEspSanto", label: "Qual a data batismo no Espírito Santo?", type: "date", required: false },
    ],
  },
  {
    step: 9,
    title: "Ministério",
    fields: [
      { id: "obreiro", label: "É obreiro?", type: "radio", required: true, options: ["Sim", "Não"] },
      {
        id: "cargo",
        label: "Cargo?",
        type: "select",
        required: true,
        options: ["MEMBRO", "COOPERADOR", "DIÁCONO", "PRESBÍTERO", "EVANGELISTA", "PASTOR"],
      },
    ],
  },
];
