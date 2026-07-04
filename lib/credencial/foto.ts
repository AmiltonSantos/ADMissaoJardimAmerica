import path from "path";
import { readFile } from "fs/promises";

const EXT_IMAGEM = /\.(jpe?g|png|webp|gif|avif|tiff?|bmp)$/i;

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

  const caminho = path.isAbsolute(valor)
    ? valor
    : path.join(process.cwd(), valor);

  try {
    return await readFile(caminho);
  } catch {
    console.warn(`Foto ignorada, arquivo não encontrado: ${caminho}`);
    return null;
  }
}
