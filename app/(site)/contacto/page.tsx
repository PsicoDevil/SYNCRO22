import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import { siteContactEmail, socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto de SYNCRO22.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        index="06"
        title="Contacto"
        description="Contacto para booking, prensa y gestión."
      />

      <section
        className="relative overflow-hidden bg-black py-16 sm:py-24"
        aria-label="Formulario de contacto de SYNCRO22"
      >
        {/* Luz ambiental — misma gramática visual que el resto del sitio */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,4,41,0.10),transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_50%)]"
          aria-hidden="true"
        />

        {/* Índice fantasma decorativo (fuera del flujo, no suma altura en mobile) */}
        <span
          aria-hidden="true"
          className="display-title pointer-events-none absolute -top-4 right-0 select-none text-[7rem] leading-none text-transparent [-webkit-text-stroke:1px_rgba(232,232,232,0.06)] sm:-top-8 sm:text-[12rem] lg:-top-14 lg:text-[16rem]"
        >
          06
        </span>

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          {/* Columna de información */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="tech-label text-blood">CONTACTO DIRECTO</span>
              <h2 className="display-title mt-4 text-3xl text-bone sm:text-4xl lg:text-5xl">
                ESCRIBINOS
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-fog sm:text-base">
                Completá el formulario y te vamos a responder a la brevedad.
              </p>
            </Reveal>

            {siteContactEmail ? (
              <Reveal delay={100}>
                <div className="mt-10 border-t border-steel/60 pt-8">
                  <span className="tech-label text-smoke">EMAIL</span>
                  <br />
                  <a
                    href={`mailto:${siteContactEmail}`}
                    className="mt-3 inline-block break-all font-mono text-sm text-bone transition-colors duration-300 hover:text-blood sm:text-base"
                  >
                    {siteContactEmail}
                  </a>
                </div>
              </Reveal>
            ) : null}

            {socialLinks.instagram || socialLinks.facebook ? (
              <Reveal delay={160}>
                <div className="mt-10 border-t border-steel/60 pt-8">
                  <span className="tech-label text-smoke">SEGUINOS</span>
                  <div className="mt-4 flex items-center gap-3">
                    {socialLinks.instagram ? (
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center border border-steel text-fog transition-all duration-300 hover:border-blood hover:text-blood"
                        aria-label="Instagram de SYNCRO22"
                      >
                        <InstagramIcon className="h-5 w-5" />
                      </a>
                    ) : null}
                    {socialLinks.facebook ? (
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center border border-steel text-fog transition-all duration-300 hover:border-blood hover:text-blood"
                        aria-label="Facebook de SYNCRO22"
                      >
                        <FacebookIcon className="h-5 w-5" />
                      </a>
                    ) : null}
                    {socialLinks.youtube ? (
                      <a
                        href={socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-11 items-center justify-center border border-steel text-fog transition-all duration-300 hover:border-blood hover:text-blood"
                        aria-label="YouTube de SYNCRO22"
                      >
                        <YouTubeIcon className="h-5 w-5" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ) : null}
          </div>

          {/* Formulario */}
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}