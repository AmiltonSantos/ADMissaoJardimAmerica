"use client";

import type { TDocumentDefinitions } from "pdfmake/interfaces";

type FormData = Record<string, string>;

function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function formatCpf(cpf: string): string {
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4").slice(0, 14);
}

function formatCep(cep: string): string {
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2").slice(0, 9);
}

function formatPhone(phone: string): string {
  return phone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3").slice(0, 15);
}

async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.startsWith("image/")) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function createDottedLine(x1: number, y1: number, x2: number, y2: number, dashLength: number) {
  const lines = [];
  const totalLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const dashCount = Math.floor(totalLength / dashLength);
  for (let i = 0; i < dashCount; i++) {
    const startX = x1 + (x2 - x1) * (i / dashCount);
    const startY = y1 + (y2 - y1) * (i / dashCount);
    const endX = x1 + (x2 - x1) * ((i + 0.5) / dashCount);
    const endY = y1 + (y2 - y1) * ((i + 0.5) / dashCount);
    lines.push({ type: "line", x1: startX, y1: startY, x2: endX, y2: endY, lineWidth: 1.5, lineColor: "black" });
  }
  return lines;
}

export async function generatePdf(formData: FormData): Promise<void> {
  const pdfMakeModule = await import("pdfmake/build/pdfmake");
  const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

  const pdfMake = (pdfMakeModule.default ?? pdfMakeModule) as any;
  const fontsRaw = pdfFontsModule as any;
  pdfMake.vfs = fontsRaw.default ?? fontsRaw;

  const logoData = await loadImageAsBase64("/header-igreja.png");

  const nome = (formData.nome ?? "").toUpperCase();
  const congregacao = (formData.congregacao ?? "").toUpperCase();
  const cpf = formData.cpf ?? "";
  const rg = (formData.rg ?? "").toUpperCase();
  const dataNascimento = formatDate(formData.nascimento ?? "");
  const sexo = (formData.sexo ?? "").toUpperCase();
  const estadoCivil = (formData.estadoCivil ?? "").toUpperCase();
  const profissao = (formData.profissao ?? "").toUpperCase();
  const naturalidade = (formData.cidadeNascimento ?? "").toUpperCase();
  const uf = (formData.estadoNascimento ?? "").toUpperCase();
  const nomeMae = (formData.nomeMae ?? "").toUpperCase();
  const nomePai = (formData.nomePai ?? "").toUpperCase();
  const escolaridade = (formData.escolaridade ?? "").toUpperCase();
  const whatsapp = formData.whatsapp ?? "";
  const cep = formData.cep ?? "";
  const rua = (formData.rua ?? "").toUpperCase();
  const complemento = (formData.complemento ?? "").toUpperCase();
  const numero = (formData.numeroCasa ?? "").toUpperCase();
  const bairro = (formData.bairro ?? "").toUpperCase();
  const estado = (formData.estado ?? "").toUpperCase();
  const cidade = (formData.cidade ?? "").toUpperCase();
  const batismoAgua = formatDate(formData.batismoAguas ?? "");
  const batismoEspSanto = formatDate(formData.batismoEspSanto ?? "");
  const isObreiro = (formData.obreiro ?? "").toUpperCase();
  const cargo = (formData.cargo ?? "").toUpperCase();

  const layoutTable = {
    hLineWidth: () => 0.5,
    vLineWidth: () => 0.5,
    hLineColor: () => "black",
    vLineColor: () => "black",
  };

  const molduraFolha = () => ({
    canvas: [{ type: "rect", x: 5, y: 5, w: 390, h: 555, lineWidth: 2, lineColor: "black" }],
  });

  const now = new Date();
  const dia = now.toLocaleDateString("pt-BR", { day: "numeric" });
  const mes = now.toLocaleDateString("pt-BR", { month: "long" }).toUpperCase();
  const ano = now.toLocaleDateString("pt-BR", { year: "numeric" });

  const docDefinition: TDocumentDefinitions = {
    pageOrientation: "landscape",
    pageMargins: [10, 10, 10, 10],
    watermark: {
      text: "AD MISSÃO JARDIM AMÉRICA",
      color: "red",
      opacity: 0.05,
      bold: true,
    },
    content: [
      // PÁGINA 1
      {
        columns: [
          {
            width: "49%",
            margin: [5, 5, 5, 5],
            stack: [
              molduraFolha(),
              {
                stack: [
                  {
                    columns: [
                      logoData
                        ? { image: logoData, width: 350, margin: [20, -30, 0, 3] }
                        : { text: "IEADMM - JD. AMÉRICA", fontSize: 14, bold: true, alignment: "center", margin: [0, 5, 0, 3] },
                    ],
                  },
                  {
                    canvas: [{ type: "line", x1: 0, y1: 0, x2: 390, y2: 0, lineWidth: 1.5, lineColor: "black" }],
                    margin: [5, 2, 0, 2],
                  },
                  { text: "FICHA DE CADASTRO", fontSize: 10, bold: true, alignment: "center", margin: [0, 2, 0, -2] },
                  {
                    columns: [
                      {
                        width: "79%",
                        stack: [
                          { text: "CONGREGAÇÃO", fontSize: 10 },
                          { table: { widths: [289], heights: 12, body: [[{ text: congregacao.slice(0, 46), fontSize: 10, bold: true }]] }, layout: layoutTable },
                          { text: "Dados Pessoais", bold: true, fontSize: 10, margin: [0, 2, 0, 0] },
                          {
                            columns: [
                              {
                                width: "31%",
                                stack: [
                                  { text: "CPF", fontSize: 10 },
                                  { table: { widths: [73], heights: 12, body: [[{ text: formatCpf(cpf), fontSize: 10, bold: true }]] }, layout: layoutTable },
                                ],
                              },
                              {
                                width: "62%",
                                stack: [
                                  { text: "RG", fontSize: 10 },
                                  { table: { widths: [139], heights: 12, body: [[{ text: rg.slice(0, 25), fontSize: 10, bold: true }]] }, layout: layoutTable },
                                ],
                              },
                              {
                                width: "6%",
                                stack: [
                                  { text: "M", fontSize: 10, margin: [10, 0, 0, 0] },
                                  { table: { widths: [20], heights: 12, body: [[{ text: sexo === "MASCULINO" ? "X" : "", alignment: "center", fontSize: 10, bold: true }]] }, layout: layoutTable },
                                ],
                              },
                              {
                                width: "6%",
                                stack: [
                                  { text: "F", fontSize: 10, margin: [10, 0, 0, 0] },
                                  { table: { widths: [20], heights: 12, body: [[{ text: sexo === "FEMININO" ? "X" : "", alignment: "center", fontSize: 10, bold: true }]] }, layout: layoutTable },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        width: "25%",
                        stack: [
                          { canvas: [{ type: "rect", x: 10, y: -17, w: 80, h: 100, lineWidth: 1, lineColor: "black", fill: "none" }] },
                        ],
                      },
                    ],
                    margin: [9, 5, 10, -5],
                  },
                  {
                    columns: [
                      { width: "27%", stack: [{ text: "Data de Nascimento", fontSize: 10 }, { table: { widths: [86], heights: 12, body: [[{ text: dataNascimento, fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                      { width: "77%", stack: [{ text: "Nome", fontSize: 10 }, { table: { widths: [272], heights: 12, body: [[{ text: nome.slice(0, 46), fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 2],
                    columnGap: 0,
                  },
                  {
                    columns: [
                      { width: "53%", stack: [{ text: "Nome Mãe", fontSize: 10 }, { table: { widths: [185], heights: 12, body: [[{ text: nomeMae.slice(0, 31), fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                      { width: "51%", stack: [{ text: "Nome Pai", fontSize: 10 }, { table: { widths: [175], heights: 12, body: [[{ text: nomePai.slice(0, 31), fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 2],
                    columnGap: 0,
                  },
                  {
                    columns: [
                      { width: "23%", stack: [{ text: "Nacionalidade", fontSize: 10 }, { table: { widths: [71], heights: 12, body: [[{ text: "BRASILEIRO(A)", fontSize: 10, bold: true }]] }, layout: layoutTable, margin: [0, 0, 10, 0] }] },
                      { width: "70%", stack: [{ text: "Naturalidade", fontSize: 10 }, { table: { widths: [248], heights: 12, body: [[{ text: naturalidade.slice(0, 46), fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                      { width: "10%", stack: [{ text: "UF", fontSize: 10 }, { table: { widths: [25], heights: 12, body: [[{ text: uf, fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 2],
                    columnGap: 0,
                  },
                  {
                    columns: [
                      { width: "23%", stack: [{ text: "Estado Civil", fontSize: 10 }, { table: { widths: [73], heights: 12, body: [[{ text: estadoCivil, fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                      { width: "30%", stack: [{ text: "Escolaridade", fontSize: 10 }, { table: { widths: [100], heights: 12, body: [[{ text: escolaridade, fontSize: 10, bold: true }]] }, layout: layoutTable, margin: [0, 0, 10, 0] }] },
                      { width: "25%", stack: [{ text: "WhatsApp", fontSize: 10 }, { table: { widths: [80], heights: 12, body: [[{ text: formatPhone(whatsapp), fontSize: 10, bold: true }]] }, layout: layoutTable, margin: [0, 0, 10, 0] }] },
                      { width: "28%", stack: [{ text: "Telefone 2", fontSize: 10 }, { table: { widths: [81], heights: 12, body: [[{ text: "", bold: true }]] }, layout: layoutTable, margin: [0, 0, 10, 0] }] },
                    ],
                    margin: [9, 0, 0, 2],
                    columnGap: 0,
                  },
                  { canvas: createDottedLine(0, 0, 383, 0, 5), margin: [9, 2, 0, 2] },
                  { text: "Endereço", bold: true, fontSize: 10, margin: [9, 0, 0, -2] },
                  {
                    columns: [
                      { width: "24%", stack: [{ text: "Cep", fontSize: 10 }, { table: { widths: [76], heights: 12, body: [[{ text: formatCep(cep), fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                      { width: "68%", stack: [{ text: "Rua", fontSize: 10 }, { table: { widths: [242], heights: 12, body: [[{ text: rua.slice(0, 41), fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                      { width: "11%", stack: [{ text: "Número", fontSize: 10 }, { table: { widths: [29], heights: 12, body: [[{ text: numero.slice(0, 4), fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 2],
                    columnGap: 0,
                  },
                  {
                    columns: [
                      { width: "51%", stack: [{ text: "Bairro", fontSize: 10 }, { table: { widths: [177], heights: 12, body: [[{ text: bairro.slice(0, 31), fontSize: 10, bold: true }]] }, layout: layoutTable, margin: [0, 0, 10, 0] }] },
                      { width: "51%", stack: [{ text: "Complemento (QUADRA, LOTE)", fontSize: 10 }, { table: { widths: [182], heights: 12, body: [[{ text: complemento.slice(0, 34), fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 2],
                    columnGap: 0,
                  },
                  {
                    columns: [
                      { width: "40%", stack: [{ text: "Estado", fontSize: 10 }, { table: { widths: [135], heights: 12, body: [[{ text: estado, fontSize: 10, bold: true }]] }, layout: layoutTable, margin: [0, 0, 10, 0] }] },
                      { width: "65%", stack: [{ text: "Cidade", fontSize: 10 }, { table: { widths: [223], heights: 12, body: [[{ text: cidade.slice(0, 39), fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 2],
                    columnGap: 0,
                  },
                  { canvas: createDottedLine(0, 0, 383, 0, 5), margin: [9, 2, 0, 2] },
                  { text: "Ministério", bold: true, fontSize: 10, margin: [9, 0, 0, 2] },
                  {
                    columns: [
                      { width: "25%", stack: [{ text: "Batismo nas águas:", fontSize: 10, margin: [0, 3, 2, 0] }] },
                      { width: "23%", stack: [{ table: { widths: [70], heights: 12, body: [[{ text: batismoAgua, fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                      { width: "33%", stack: [{ text: "Batismo no Espírito Santo:", fontSize: 10, margin: [0, 3, 2, 0] }] },
                      { width: "24%", stack: [{ table: { widths: [70], heights: 12, body: [[{ text: batismoEspSanto, fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 3],
                    columnGap: 0,
                  },
                  {
                    columns: [
                      { width: "11%", stack: [{ text: "Obreiro:", fontSize: 10, margin: [0, 3, 2, 0] }] },
                      { width: "15%", stack: [{ table: { widths: [25], heights: 12, body: [[{ text: isObreiro, alignment: "center", bold: true, fontSize: 10 }]] }, layout: layoutTable }] },
                      { width: "9%", stack: [{ text: "Cargo:", fontSize: 10, margin: [0, 3, 2, 0] }] },
                      { width: "70%", stack: [{ table: { widths: [242], heights: 12, body: [[{ text: cargo, fontSize: 10, bold: true }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 3],
                    columnGap: 0,
                  },
                  ...(["Diácono", "Presbítero", "Evangelista", "Pastor"] as const).map((titulo) => ({
                    columns: [
                      { width: "25%", stack: [{ text: `Data há ${titulo}:`, fontSize: 10, margin: [0, 3, 2, 0] }] },
                      { width: "27%", stack: [{ table: { widths: [80], heights: 12, body: [[{ text: "", fontSize: 10 }]] }, layout: layoutTable }] },
                      { width: "8%", stack: [{ text: "Local:", fontSize: 10, margin: [0, 3, 2, 0] }] },
                      { width: "44%", stack: [{ table: { widths: [149], heights: 12, body: [[{ text: "", fontSize: 10 }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 3],
                    columnGap: 0,
                  })),
                  {
                    columns: [
                      { width: "36%", stack: [{ text: "Registro Campo Jd. América", fontSize: 10 }, { table: { widths: [123], heights: 12, body: [[{ text: "", fontSize: 10 }]] }, layout: layoutTable }] },
                      { width: "33%", stack: [{ text: "Registro CADESGO", fontSize: 10 }, { table: { widths: [112], heights: 12, body: [[{ text: "", fontSize: 10 }]] }, layout: layoutTable }] },
                      { width: "35%", stack: [{ text: "Registro CGADB", fontSize: 10 }, { table: { widths: [115], heights: 12, body: [[{ text: "", fontSize: 10 }]] }, layout: layoutTable }] },
                    ],
                    margin: [9, 0, 0, 2],
                    columnGap: 0,
                  },
                ],
                margin: [0, -520, 0, 0],
              },
            ],
          },
          {
            width: "49%",
            margin: [5, 5, 5, 5],
            stack: [
              molduraFolha(),
              {
                stack: [
                  { text: "(Continuação da Ficha de Cadastro para Obreiros e Membros da IEADMM-Jd. América..............Fl 02)", alignment: "center", bold: true, fontSize: 8.3, decoration: "underline", margin: [9, 0, -10, 40] },
                  { text: "DECLARAÇÃO E TERMO DE AUTORIZAÇÃO", bold: true, style: "header", alignment: "center", margin: [9, 0, 0, 40] },
                  { text: "I – DÍZIMOS, OFERTAS E DOAÇÕES", bold: true, style: "header", margin: [20, 0, 0, 20] },
                  { text: "Pelo presente termo, eu acima identificado, declaro para os devidos fins e a quem possa interessar que as contribuições como os dízimos, as ofertas e outras doações feitas por mim à Igreja Evangélica Assembleia de Deus Ministério Missão – Jardim América, são voluntárias, e que em hipótese alguma, nem no presente e no futuro, reclamarei a devolução do que por mim foi doado.", alignment: "justify", margin: [20, 0, 0, 20] },
                  { text: "II – USO DE IMAGEM, VOZ E CESSÃO DE DIREITO", bold: true, style: "header", margin: [20, 0, 0, 20] },
                  { text: "Declaro ainda, com base no art. 29 da Lei de Direitos Autorais, que AUTORIZO de forma gratuita e sem qualquer ônus, a Igreja Evangélica Assembleia de Deus Ministério Missão – Jardim América, a utilização de minha(s) imagem(ns) e/ou voz e/ou de informações pessoais na obra, e em sua divulgação, se houver, em todos os meios de divulgação possíveis, quer sejam na mídia impressa (livros, catálogos, revistas, jornais, entre outros), televisiva (propagandas para televisão aberta e/ou fechas, vídeos, filmes, entre outros), radiofônica (programas de rádio/podcasts), internet, banco de dados informatizados, multimídia, entre outros, e nos meios de comunicação interna, como jornais e periódicos em geral, na forma de impresso, voz e imagem.", alignment: "justify", margin: [20, 0, 0, 10] },
                  { text: "A presente autorização e cessão são de natureza gratuita, firmadas em caráter irrevogável e irretratável e por prazo indeterminado, cujos direitos e obrigações vinculam seus respectivos herdeiros e sucessores consoante as regras previstas na Lei 9.610/98 (Lei sobre Direitos Autorais e outras providências).", alignment: "justify", margin: [20, 0, 0, 0] },
                ],
                margin: [0, -550, 0, 0],
              },
            ],
          },
        ],
        columnGap: 20,
      } as any,

      // PÁGINA 2
      {
        pageBreak: "before",
        columns: [
          {
            width: "49%",
            margin: [5, 5, 5, 5],
            stack: [
              molduraFolha(),
              {
                stack: [
                  { text: "(Continuação da Ficha de Cadastro para Obreiros e Membros da IEADMM-Jd. América..............Fl 03)", alignment: "center", bold: true, fontSize: 8.1, decoration: "underline", margin: [9, 0, -10, 1] },
                  { text: "TERMO DE CONSENTIMENTO PARA TRATAMENTO DE DADOS PESSOAIS", style: "header", fontSize: 11, alignment: "center", margin: [9, 0, 0, 2] },
                  { text: "(Lei 13.709 – LGPD)", style: "header", fontSize: 11, alignment: "center", margin: [9, 0, 0, 5] },
                  {
                    width: "95%",
                    table: { widths: ["*"], body: [[{ text: [{ text: "IGREJA EVANGELICA ASSEMBLEIA DE DEUS MINISTÉRIO MISSÃO - CAMPO JARDIM AMÉRICA, situada na Rua C-160, Qd 371, Lt 17/18, CEP 74255-130, Setor Jardim América, Goiânia-GO,", bold: true }, { text: " doravante denominado(a)" }, { text: " CONTROLADORA.", bold: true }], alignment: "justify", margin: [2, 2, 2, 2] }]] },
                    layout: layoutTable,
                    margin: [15, 0, 0, 5],
                  },
                  {
                    width: "95%",
                    table: {
                      widths: ["*"],
                      body: [[{
                        text: [
                          { text: `Nome: ${nome.slice(0, 46)} `, bold: true },
                          { text: "nacionalidade: BRASILEIRO(A), estado civil: " },
                          { text: estadoCivil, bold: true },
                          { text: " profissão: " },
                          { text: profissao, bold: true },
                          { text: " , RG nº: " },
                          { text: rg, bold: true },
                          { text: " inscrito(a) CPF/MF sob o nº " },
                          { text: formatCpf(cpf), bold: true },
                          { text: " residente e domiciliado(a) na " },
                          { text: `${rua.slice(0, 41)}, ${bairro.slice(0, 31)}, ${numero}`, bold: true },
                          { text: " Cidade: " },
                          { text: cidade, bold: true },
                          { text: " Estado: " },
                          { text: estado, bold: true },
                          { text: " CEP: " },
                          { text: formatCep(cep), bold: true },
                          { text: " doravante denominado(a) " },
                          { text: "TITULAR.", bold: true },
                        ],
                        alignment: "justify",
                        margin: [2, 2, 2, 2],
                      }]],
                    },
                    layout: layoutTable,
                    margin: [15, 0, 0, 5],
                  },
                  { text: "Este termo de consentimento foi elaborado em conformidade com a lei geral de proteção de dados. Consoante ao artigo 5º inciso XII da Lei 13.709, este documento viabiliza a manifestação livre, informada e inequívoca, pela qual o titular/ responsável concorda com o tratamento de seus dados pessoais e os dados do menor sob os seus cuidados, para as finalidades a seguir determinadas:", italics: true, alignment: "justify", margin: [50, 0, 0, 5] },
                  { text: "PARÁGRAFO PRIMEIRO - DO CONSENTIMENTO", style: "header", alignment: "left", margin: [15, 0, 0, 5] },
                  { text: [{ text: "Ao assinar este termo o " }, { text: "TITULAR ", bold: true }, { text: "concorda que a " }, { text: " CONTROLADORA, ", bold: true }, { text: "proceda com o tratamento de seus dados." }], alignment: "justify", margin: [15, 0, 0, 5] },
                  { text: "Entende-se por tratamento de acordo com o artigo 5º inciso X, a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.", alignment: "justify", margin: [15, 0, 0, 5] },
                  { text: "PARÁGRAFO SEGUNDO - DADOS PESSOAIS", style: "header", alignment: "left", margin: [15, 0, 0, 5] },
                  { text: "Poderão ser tratados, mediante anuência expressa do titular/responsável, os seguintes dados pessoais, pelo(a) controlador(a):", alignment: "justify", margin: [15, 0, 0, 5] },
                  { ul: ["Nome, RG, CPF, endereço, status civil, e-mail, telefone, histórico pessoal e congregacional."], margin: [15, 0, 0, 10] },
                ],
                margin: [0, -550, 0, 0],
              },
            ],
          },
          {
            width: "49%",
            margin: [5, 5, 5, 5],
            stack: [
              molduraFolha(),
              {
                stack: [
                  { text: "(Cont. do termo de consentimento para tratamento de dados pessoais (lei 13.709-LGPD)........Fl 04)", alignment: "center", bold: true, fontSize: 8.1, decoration: "underline", margin: [9, 0, -10, 20] },
                  { text: "PARÁGRAFO TERCEIRO - FINALIDADE DO TRATAMENTO", style: "header", alignment: "left", margin: [15, 0, 0, 10] },
                  { text: "Em atendimento ao artigo 8º §4 este termo guarda finalidade determinada, sendo que os dados serão utilizados especificamente para fins de:", alignment: "justify", margin: [15, 0, 0, 5] },
                  { ul: ["Cadastro."], margin: [15, 0, 0, 5] },
                  { ul: ["Elaboração de relatórios e pareceres informativos."], margin: [15, 0, 0, 5] },
                  { ul: ["Quando necessário para atender aos interesses legítimos do controlador ou de terceiros, exceto no caso de prevalecerem direitos e liberdades fundamentais do titular que exijam a proteção dos dados pessoais;"], margin: [15, 0, 0, 5] },
                  { ul: ["Para a utilização e divulgação em mídia impressa ou digital, exceto os dados sensíveis, com vistas à promoção da pregação do evangelho bem como à realização dos trabalhos relacionados à comunidade religiosa da qual o titular faça parte;"], margin: [15, 0, 0, 5] },
                  { ul: ["Para o exercício regular de direitos em processo judicial, administrativo ou arbitral;"], margin: [15, 0, 0, 5] },
                  { ul: ["Para a proteção da vida ou da incolumidade física do titular ou de terceiros."], margin: [15, 0, 0, 10] },
                  { text: "PARÁGRAFO QUARTO - SEGURANÇA DOS DADOS", style: "header", alignment: "left", margin: [15, 0, 0, 5] },
                  { text: "A Controladora responsabiliza-se pela manutenção de medidas de segurança, técnicas e administrativas aptas a proteger os dados pessoais de acessos não autorizados e de situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito.", alignment: "justify", margin: [15, 0, 0, 10] },
                  {
                    text: [
                      { text: `${cidade} - ${estado}`, decoration: "underline" },
                      { text: ", " },
                      { text: dia, decoration: "underline" },
                      { text: " DE " },
                      { text: mes, decoration: "underline" },
                      { text: " DE " },
                      { text: ano, decoration: "underline" },
                    ],
                    alignment: "right",
                    fontSize: 10,
                    margin: [0, 0, 0, 20],
                  },
                  {
                    columns: [
                      { width: "50%", stack: [{ text: "_____________________________", alignment: "center", margin: [0, 0, 0, 2] }, { text: "DIRIGENTE/SECRETÁRIO", alignment: "center", fontSize: 10 }], alignment: "center" },
                      { width: "50%", stack: [{ text: "_____________________________", alignment: "center", margin: [0, 0, 0, 0] }, { text: "OBREIRO/MEMBRO", alignment: "center", fontSize: 10 }], alignment: "center" },
                    ],
                    margin: [10, 0, 0, 20],
                    columnGap: 0,
                  },
                  { stack: [{ text: "_________________________", alignment: "center", margin: [9, 0, 0, 0] }, { text: "IEADMM-JD AMÉRICA", alignment: "center", fontSize: 10 }], alignment: "center" },
                ],
                margin: [0, -550, 0, 0],
              },
            ],
          },
        ],
        columnGap: 20,
      } as any,
    ],

    footer() {
      return {
        columns: [{ text: `AD Missão Jardim América Goiânia - GO. Todos os direitos reservados | ${new Date().toLocaleString("pt-BR")}`, alignment: "center", fontSize: 6, margin: [0, -7, 0, 0] }],
        columnGap: 20,
      };
    },

    styles: {
      header: { fontSize: 12, bold: true },
    },
  };

  const fileName = `${nome || "cadastro"}_${new Date().toLocaleDateString("pt-BR").replace(/\//g, "-")}.pdf`;
  pdfMake.createPdf(docDefinition).download(fileName);
}
