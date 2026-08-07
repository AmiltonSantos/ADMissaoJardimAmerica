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

export async function gerarFrente(dados: Registro, fotoBuffer?: Buffer | null): Promise<Buffer> {
  const svg = `
  <svg width="${LARGURA}" height="${ALTURA}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="sombra" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="black" flood-opacity="0.6"/>
      </filter>
    </defs>
    <style>
      .nome { fill:white; stroke: black; stroke-width: 1px; paint-order: stroke fill; font-size:47px; font-family:'Arial Black', sans-serif; }
      .cargo { fill:white; font-size:50px; font-family:'Arial Black', sans-serif; }
    </style>
    <text x="280" y="370" class="nome" filter="url(#sombra)">${esc(dados.nome)}</text>
    <text x="420" y="505" class="cargo" filter="url(#sombra)">${esc(dados.cargo)}</text>
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
    <text x="36" y="277" class="dado">${esc(dados.naturalidade)}</text>
    <text x="36" y="376" class="dado">${esc(dados.batismo)}</text>
    <text x="134" y="615" class="emissao">${esc(dados.emissao)}</text>
  </svg>`;

  return sharp(path.join(templateDir, "verso.jpg"))
    .resize(LARGURA, ALTURA)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg()
    .toBuffer();
}
