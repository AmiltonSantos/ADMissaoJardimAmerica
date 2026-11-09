import Image from "next/image";
import Link from "next/link";

const HomeHero = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-[#093060] [height:clamp(460px,75vh,640px)] lg:[height:720px]"
    >
      <Image
        src="/images/hero/igreja01.png"
        alt="Templo sede da AD Missão Jardim América"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay azul-marinho, mais forte à esquerda para leitura do texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#093060]/95 via-[#093060]/75 to-[#093060]/30" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#093060]/80 to-transparent" />

      <div className="container relative flex h-full items-center">
        <div className="max-w-2xl text-white">
          <span className="mb-5 inline-block border-l-4 border-[#1863dc] pl-3 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            Bem-vindo à
          </span>
          <h1 className="mb-6 text-4xl font-extrabold uppercase leading-[1.05] md:text-6xl xl:text-7xl">
            Assembleia de Deus
            <span className="block text-[#5b9bff]">Missão Jardim América</span>
          </h1>
          <p className="mb-10 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Uma igreja comprometida com o evangelismo e o crescimento espiritual
            de cada pessoa. Sede em Goiânia - GO, levando a Palavra de Deus a
            cada bairro e comunidade.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/historia"
              className="rounded-full bg-[#1863dc] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#0056a7]"
            >
              Nossa História
            </Link>
            <Link
              href="/programacao"
              className="rounded-full border-2 border-white/80 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-[#093060]"
            >
              Horários dos Cultos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
