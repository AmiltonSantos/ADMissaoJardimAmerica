import path from "path";
import sharp, { type OverlayOptions } from "sharp";
import type { Registro } from "./types";
import { registrarFontes } from "./fonts";

registrarFontes();

const LARGURA = 1004;
const ALTURA = 638;

const templateDir = path.join(process.cwd(), "public", "credencial", "templates");

function esc(valor: string): string {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const NOME_MAX_CHARS = 25; // máximo de caracteres por linha (espaços contam)
const NOME_MAX_LINHAS = 2;
const NOME_FONTE_BASE = 45;
// Centro horizontal da área do nome (entre o fim da foto, x=270, e a margem direita, x≈984)
const NOME_X = 627;
const NOME_Y = 370;

// Quebra o texto por palavras sem ultrapassar `limite` caracteres por linha (espaços inclusos).
function quebrarLinhas(texto: string, limite: number): string[] {
  const palavras = texto.trim().split(/\s+/).filter(Boolean);
  const linhas: string[] = [];
  let atual = "";
  for (const palavra of palavras) {
    const candidata = atual ? `${atual} ${palavra}` : palavra;
    if (candidata.length <= limite || !atual) {
      atual = candidata;
    } else {
      linhas.push(atual);
      atual = palavra;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

// Até 25 caracteres: 1 linha, fonte base. Acima disso: quebra em linhas de até 25.
// Se mesmo assim não couber em NOME_MAX_LINHAS (ou houver palavra única > 25),
// aumenta o limite por linha e reduz a fonte na mesma proporção.
function layoutNome(nome: string): { linhas: string[]; fonte: number } {
  let limite = NOME_MAX_CHARS;
  let linhas = quebrarLinhas(nome, limite);
  while (linhas.length > NOME_MAX_LINHAS) {
    limite++;
    linhas = quebrarLinhas(nome, limite);
  }
  const maior = Math.max(...linhas.map((l) => l.length), 1);
  const fonte = Math.floor(NOME_FONTE_BASE * Math.min(1, NOME_MAX_CHARS / maior));
  return { linhas, fonte };
}

function svgNome(nome: string): string {
  const { linhas, fonte } = layoutNome(nome);
  const alturaLinha = Math.round(fonte * 1.15);
  // Centraliza o bloco verticalmente em torno da posição original (y=370)
  const yInicial = NOME_Y - ((linhas.length - 1) * alturaLinha) / 2;
  const tspans = linhas
    .map((linha, i) => `<tspan x="${NOME_X}" y="${yInicial + i * alturaLinha}">${esc(linha)}</tspan>`)
    .join("");
  return `<text class="nome" text-anchor="middle" style="font-size:${fonte}px" filter="url(#sombra)">${tspans}</text>`;
}

// Posição X do cargo por tipo (chaves sem acento, em maiúsculas)
const CARGO_X: Record<string, number> = {
  EVANGELISTA: 380,
  MEMBRO: 440,
  PASTOR: 440,
  COOPERADOR: 380,
  PRESBITERO: 400,
};
const CARGO_X_PADRAO = 440;

// Normaliza o cargo (maiúsculas, sem acento e sem espaços nas pontas) para aceitar
// variações da planilha como "Presbítero", "presbitero " ou "PRESBÍTERO".
function cargoX(cargo: string): number {
  const chave = (cargo ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toUpperCase();
  return CARGO_X[chave] ?? CARGO_X_PADRAO;
}

export async function gerarFrente(dados: Registro, fotoBuffer?: Buffer | null): Promise<Buffer> {
  const svg = `
  <svg width="${LARGURA}" height="${ALTURA}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="sombra" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="black" flood-opacity="0.6"/>
      </filter>
    </defs>
    <style>
      .nome { fill:white; stroke: black; stroke-width: 1px; paint-order: stroke fill; font-family:'Arial Black', sans-serif; }
      .cargo { fill:white; font-size:62px; font-family:'Arial Black', sans-serif; }
    </style>
    ${svgNome(dados.nome)}
    <text x="${cargoX(dados.cargo)}" y="505" class="cargo" filter="url(#sombra)">${esc(dados.cargo)}</text>
  </svg>`;

  const composites: OverlayOptions[] = [];

  if (fotoBuffer) {
    const W = 220;
    const H = 280;
    const RAIO = 24;
    const BORDA = 3;

    let foto = await sharp(fotoBuffer).resize(W, H, { fit: "cover" }).toBuffer();

    const mascara = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${H}" rx="${RAIO}" ry="${RAIO}"/>
    </svg>`;
    foto = await sharp(foto)
      .composite([{ input: Buffer.from(mascara), blend: "dest-in" }])
      .png()
      .toBuffer();

    const contorno = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${BORDA / 2}" y="${BORDA / 2}" width="${W - BORDA}" height="${H - BORDA}"
            rx="${RAIO}" ry="${RAIO}" fill="none" stroke="white" stroke-width="${BORDA}"/>
    </svg>`;
    foto = await sharp(foto)
      .composite([{ input: Buffer.from(contorno), top: 0, left: 0 }])
      .png()
      .toBuffer();

    composites.push({ input: foto, top: 225, left: 30 });
  }

  composites.push({ input: Buffer.from(svg), top: 0, left: 0 });

  return await sharp(path.join(templateDir, "frente.jpg"))
    .resize(LARGURA, ALTURA)
    .composite(composites)
    .jpeg()
    .toBuffer();
}

export async function gerarVerso(dados: Registro): Promise<Buffer> {
  const svg = `
  <svg width="${LARGURA}" height="${ALTURA}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .dado { fill:white; font-size:40px; font-family:'Arial Black', sans-serif; }
      .emissao { fill:white; font-size:20px; font-family:'Arial Black', sans-serif; }
    </style>
    <text x="36" y="92" class="dado">${esc(dados.cpf)}</text>
    <text x="36" y="182" class="dado">${esc(dados.nascimento)}</text>
    <text x="36" y="280" class="dado">${esc(dados.naturalidade)}</text>
    <text x="36" y="376" class="dado">${esc(dados.batismo)}</text>
    <text x="145" y="612" class="emissao">${esc(dados.emissao)}</text>
  </svg>`;

  return sharp(path.join(templateDir, "verso.jpg"))
    .resize(LARGURA, ALTURA)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg()
    .toBuffer();
}