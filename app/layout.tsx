import LayoutShell from "@/components/LayoutShell";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import type { Metadata } from "next";
import { OG_IMAGEM, PALAVRAS_CHAVE, SITE_DESCRICAO, SITE_NOME, SITE_TITULO, SITE_URL } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

// Metadata padrão; cada página sobrescreve title/description com seu foco de SEO
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITULO,
    template: `%s | ${SITE_NOME}`,
  },
  description: SITE_DESCRICAO,
  keywords: PALAVRAS_CHAVE,
  applicationName: SITE_NOME,
  authors: [{ name: "Assembleia de Deus Ministério Missão Jardim América" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NOME,
    title: SITE_TITULO,
    description: SITE_DESCRICAO,
    images: [{ url: OG_IMAGEM, width: 1200, height: 630, alt: "AD Missão Jardim América - Goiânia GO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITULO,
    description: SITE_DESCRICAO,
    images: [OG_IMAGEM],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
