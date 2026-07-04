import { PDFDocument } from "pdf-lib";

export async function gerarPDF(frente: Buffer, verso: Buffer): Promise<Buffer> {
  const pdf = await PDFDocument.create();

  const imgFrente = await pdf.embedJpg(frente);
  const pagina1 = pdf.addPage([imgFrente.width, imgFrente.height]);
  pagina1.drawImage(imgFrente, { x: 0, y: 0, width: imgFrente.width, height: imgFrente.height });

  const imgVerso = await pdf.embedJpg(verso);
  const pagina2 = pdf.addPage([imgVerso.width, imgVerso.height]);
  pagina2.drawImage(imgVerso, { x: 0, y: 0, width: imgVerso.width, height: imgVerso.height });

  return Buffer.from(await pdf.save());
}
