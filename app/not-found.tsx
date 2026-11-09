import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-[530px] text-center">
          <p className="mb-4 text-8xl font-extrabold text-primary/20 md:text-9xl">404</p>
          <h1 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
            Página não encontrada
          </h1>
          <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg">
            A página que você procura foi movida, removida ou não existe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-md bg-primary px-8 py-3 text-base font-bold text-white transition hover:bg-primary/90"
            >
              Voltar ao início
            </Link>
            <Link
              href="/programacao"
              className="rounded-md border border-primary px-8 py-3 text-base font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              Ver programação
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
