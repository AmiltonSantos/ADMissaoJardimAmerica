import { NextRequest, NextResponse } from "next/server";
import { lerPlanilha } from "@/lib/credencial/excel";
import { carregarFoto } from "@/lib/credencial/foto";
import { gerarFrente, gerarVerso } from "@/lib/credencial/credencial";
import { gerarPDF } from "@/lib/credencial/pdf";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const excel = formData.get("excel");

  if (!(excel instanceof File)) {
    return NextResponse.json({ erro: "Campo 'excel' é obrigatório" }, { status: 400 });
  }

  const excelBuffer = Buffer.from(await excel.arrayBuffer());
  const registros = await lerPlanilha(excelBuffer);

  if (registros.length === 0) {
    return NextResponse.json({ erro: "Planilha sem registros" }, { status: 400 });
  }

  const registro = registros[0];
  const fotoBuffer = registro.foto ? await carregarFoto(registro.foto) : null;

  const frente = await gerarFrente(registro, fotoBuffer);
  const verso = await gerarVerso(registro);
  const pdf = await gerarPDF(frente, verso);

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="credencial.pdf"',
    },
  });
}
