import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links Oficiais",
  alternates: { canonical: "/bio" },
  description:
    "A Assembleia de Deus Ministério Missão Jardim América é fundamentada na Palavra de Deus, na ação do Espírito Santo e na vida de santidade.",
};

const links = [
  { titulo: "YOUTUBE - AD MISSÃO JARDIM AMÉRICA", url: "https://www.youtube.com/@admissaojardimamerica", imagem: "youtube.jpg" },
  { titulo: "INSTAGRAM - OFICIAL", url: "https://www.instagram.com/admissaojardimamerica/", imagem: "instagram-oficial.jpg" },
  { titulo: "INSTAGRAM - CASA EDIFICADA", url: "https://www.instagram.com/casa.edificadaa", imagem: "casa-edificada.jpg" },
  { titulo: "INSTAGRAM - SEMADMIG - MISSÕES", url: "https://www.instagram.com/semadmig/", imagem: "semadmig.jpg" },
  { titulo: "INSTAGRAM - UMADEM - JOVENS", url: "https://www.instagram.com/umademgoiania/", imagem: "umadem.jpg" },
  { titulo: "INSTAGRAM - USADEMIG - SENHORAS", url: "https://www.instagram.com/usademig/", imagem: "usademig.jpg" },
  { titulo: "INSTAGRAM - UAADMIG - ADOLESCENTES", url: "https://www.instagram.com/adteensgoiania/", imagem: "uaadmig.jpg" },
  { titulo: "COMO CHEGAR", url: "https://maps.app.goo.gl/FdgKszV1VakAP1KR9", imagem: "como-chegar.png" },
  { titulo: "WHATSAPP SECRETARIA", url: "https://wa.me/5562994497444", imagem: "whatsapp.png" },
];

export default function BioPage() {
  return (
    <main className="min-h-screen bg-[#181A20] px-4 py-12 text-white">
      <div className="mx-auto w-full max-w-xl space-y-12">
        <header className="space-y-5">
          <Image
            src="/images/bio/logo.jpg"
            alt="AD Missão Jardim América"
            width={112}
            height={112}
            priority
            className="h-28 w-28 rounded-full object-cover"
          />
          <h1 className="text-3xl font-bold sm:text-4xl">AD MISSÃO JARDIM AMÉRICA</h1>
          <p className="whitespace-pre-line text-base leading-relaxed text-white/80">
            A Assembleia de Deus Ministério Missão Jardim América é fundamentada na Palavra de Deus, na ação do
            Espírito Santo e na vida de santidade.{"\n"}Valorizamos a oração, o ensino bíblico fiel, a comunhão e
            o compromisso com a missão: anunciar o Evangelho e transformar vidas.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">2026 O ano da unção</h2>
          <p className="leading-relaxed text-white/80">
            Vivemos o Ano da Unção, tempo de consagração, renovo espiritual e capacitação divina. Cremos que Deus
            está levantando um povo preparado, cheio do Espírito, para viver o sobrenatural e cumprir o Seu
            propósito com autoridade.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Confira nossas redes sociais oficiais</h2>
          <ul className="space-y-3">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl bg-white p-2 pr-4 font-semibold text-[#181A20] transition hover:scale-[1.02] hover:shadow-lg"
                >
                  <Image
                    src={`/images/bio/${link.imagem}`}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                  />
                  <span className="text-sm sm:text-base">{link.titulo}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
