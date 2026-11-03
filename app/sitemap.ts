import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  const paginas: { caminho: string; frequencia: "weekly" | "monthly"; prioridade: number }[] = [
    { caminho: "", frequencia: "weekly", prioridade: 1 },
    { caminho: "/programacao", frequencia: "weekly", prioridade: 0.9 },
    { caminho: "/location", frequencia: "monthly", prioridade: 0.8 },
    { caminho: "/historia", frequencia: "monthly", prioridade: 0.7 },
    { caminho: "/ofertar", frequencia: "monthly", prioridade: 0.5 },
    { caminho: "/cadastro", frequencia: "monthly", prioridade: 0.4 },
    { caminho: "/bio", frequencia: "monthly", prioridade: 0.4 },
  ];

  return paginas.map(({ caminho, frequencia, prioridade }) => ({
    url: `${SITE_URL}${caminho}`,
    lastModified: agora,
    changeFrequency: frequencia,
    priority: prioridade,
  }));
}
