import Image from "next/image";
import { TopBanner } from "./TopBanner";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export function InfoPageLayout({
  h1,
  description,
  sections,
  images = [],
}: {
  h1: string;
  description?: string;
  sections: { h2s: string[]; h3s: string[]; paragraphs: string[]; list?: string[] }[];
  images?: { src: string }[];
}) {
  const heroImage = images[0];
  const galleryImages = images.slice(1);
  return (
    <>
      <TopBanner />
      <NavBar />
      <main className="bg-background">
        <section className="bab-section">
          <div className="bab-container max-w-[1100px] px-6">
            {h1 && (
              <h1 className="text-[clamp(36px,5vw,72px)] leading-[1.1] tracking-[-0.04em]">
                {h1}
              </h1>
            )}
            {description && (
              <p className="mt-6 max-w-[640px] text-[18px] leading-[1.5] text-foreground/80">
                {description}
              </p>
            )}
            {heroImage && (
              <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-md border border-foreground/10 bg-[var(--surface-grey)]">
                <Image
                  src={heroImage.src}
                  alt=""
                  fill
                  sizes="(max-width: 1100px) 100vw, 1100px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {sections.map((s, i) => (
          <section key={i} className="bg-background pb-16 pt-2">
            <div className="bab-container max-w-[1100px] px-6 space-y-6">
              {s.h2s.map((h, j) => (
                <h2
                  key={`h2-${j}`}
                  className="mt-8 text-[clamp(28px,3.5vw,44px)] leading-[1.15] tracking-[-0.04em]"
                >
                  {h}
                </h2>
              ))}
              {s.h3s.map((h, j) => (
                <h3
                  key={`h3-${j}`}
                  className="mt-6 text-[clamp(22px,2.4vw,28px)] leading-[1.25] tracking-[-0.04em]"
                >
                  {h}
                </h3>
              ))}
              {s.paragraphs.map((p, j) => (
                <p key={`p-${j}`} className="text-[16px] leading-[1.65] text-foreground/90">
                  {p}
                </p>
              ))}
              {s.list && s.list.length > 0 && (
                <ul className="ml-6 list-disc space-y-2 text-[16px] leading-[1.65] text-foreground/90">
                  {s.list.map((li, j) => (
                    <li key={`li-${j}`}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}

        {galleryImages.length > 0 && (
          <section className="bg-background pb-20 pt-4">
            <div className="bab-container max-w-[1100px] px-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[4/3] overflow-hidden rounded-md border border-foreground/10 bg-[var(--surface-grey)]"
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
