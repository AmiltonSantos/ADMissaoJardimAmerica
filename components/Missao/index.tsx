import Image from "next/image";
import Link from "next/link";

const Missao = () => {
  return (
    <section className="bg-white py-16 dark:bg-dark md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Texto */}
          <div>
            <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-primary">
              Quem Somos
            </span>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl lg:text-[40px]">
              Nossa Missão
            </h2>
            <p className="mb-5 text-base leading-relaxed text-body-color md:text-lg">
              A AD Missão Jardim América é uma igreja comprometida com o
              evangelismo e o crescimento espiritual de cada pessoa. Com sede em
              Goiânia - GO, atuamos em mais de 40 congregações pela região
              metropolitana, e cidades visinhas levando a Palavra de Deus a 
              cada bairro e comunidade.
            </p>
            <p className="mb-8 text-base leading-relaxed text-body-color md:text-lg">
              Nossa visão é ver vidas transformadas pelo poder do Espírito
              Santo, famílias restauradas e comunidades impactadas pelo amor de
              Cristo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-base font-semibold text-white transition hover:bg-primary/90"
              >
                Nossa História
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/location"
                className="inline-flex items-center gap-2 rounded-md border border-primary px-7 py-3 text-base font-semibold text-primary transition hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:border-primary dark:hover:bg-primary"
              >
                Como Chegar
              </Link>
            </div>
          </div>

          {/* Imagem */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/images/location/sede.jpg"
              alt="AD Missão Jardim América - Sede"
              width={600}
              height={450}
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Missao;
