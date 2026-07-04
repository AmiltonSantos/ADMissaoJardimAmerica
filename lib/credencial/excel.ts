import ExcelJS from "exceljs";
import type { Registro } from "./types";

function texto(value: ExcelJS.CellValue): string {
  if (value == null) return "";
  if (value instanceof Date) return value.toLocaleDateString("pt-BR");
  if (typeof value === "object" && "text" in value) return String(value.text);
  return String(value);
}

export async function lerPlanilha(buffer: Buffer): Promise<Registro[]> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as unknown as Parameters<typeof workbook.xlsx.load>[0]);

  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) throw new Error("Planilha sem aba de dados");

  const dados: Registro[] = [];

  worksheet.eachRow((row, index) => {
    if (index === 1) return;
    dados.push({
      nome: texto(row.getCell(1).value),
      cargo: texto(row.getCell(2).value),
      cpf: texto(row.getCell(3).value),
      nascimento: texto(row.getCell(4).value),
      batismo: texto(row.getCell(5).value),
      naturalidade: texto(row.getCell(6).value),
      emissao: texto(row.getCell(7).value),
      foto: texto(row.getCell(8).value),
    });
  });

  return dados;
}
