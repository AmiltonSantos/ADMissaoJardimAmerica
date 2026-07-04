import path from "path";
import { readFile } from "fs/promises";

const EXT_IMAGEM = /\.(jpe?g|png|webp|gif|avif|tiff?|bmp)$/i;

async function tentarLer(...caminhos: string[]): Promise<Buffer | null> {
  for (const c of caminhos) {
    try {
      return await readFile(c);
    } catch {
      // tenta próximo
    }
  }
  return null;
}

export async function carregarFoto(origem: string): Promise<Buffer | null> {
  const valor = origem.trim();
  if (!valor) return null;

  if (/^https?:\/\//i.test(valor)) {
    const res = await fetch(valor);
    if (!res.ok) {
      console.warn(`Foto ignorada, download falhou: ${valor} (${res.status})`);
      return null;
    }
    return Buffer.from(await res.arrayBuffer());
  }

  if (!EXT_IMAGEM.test(valor)) {
    console.warn(`Foto ignorada, valor não é imagem: "${valor}"`);
    return null;
  }

  const cwd = process.cwd();
  // FOTO_DIR env permite configurar pasta base das fotos sem alterar o Excel
  const fotoDir = process.env.FOTO_DIR ?? "";
  const nome = path.basename(valor);

  const candidatos = path.isAbsolute(valor)
    ? [
        valor,
        ...(fotoDir ? [path.join(fotoDir, nome)] : []),
      ]
    : [
        path.resolve(valor),
        path.join(cwd, valor),
        path.join(cwd, "public", valor),
        ...(fotoDir ? [path.join(fotoDir, valor), path.join(fotoDir, nome)] : []),
      ];

  const buf = await tentarLer(...candidatos);
  if (!buf) {
    console.warn(`Foto ignorada, não encontrada em:\n  ${candidatos.join("\n  ")}`);
  }
  return buf;
}
