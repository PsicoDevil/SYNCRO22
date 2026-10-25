import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import {
  FacebookIcon,
  InstagramIcon,
  SpotifyIcon,
  YouTubeIcon,
} from "@/components/ui/icons";
import { siteContactEmail, siteNavigation, socialLinks } from "@/lib/site";

// Perfil oficial de artista en Spotify. Se abre en pestaña nueva.
const SPOTIFY_ARTIST_URL =
  "https://open.spotify.com/intl-es/artist/6MGPFHFIpWpozKaYWyl9Rm?si=TrjY0eUbTCG-RnooJKmsSQ";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacto de SYNCRO22.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        index={siteNavigation.contacto.index}
        title="Contacto"
        description="Contacto para booking, prensa y gestión."
      />

      <section
        className="relative overflow-hidden bg-black py-16 sm:py-24"
        aria-label="Formulario de contacto de SYNCRO22"
      >
        {/* Foto ambiental — maxicontacto: baterista y kit a la izquierda, doble fantasma a la derecha */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/contact/maxicontacto.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[30%_20%] saturate-55 contrast-110 opacity-70 lg:object-[20%_center] lg:opacity-75"
          />
        </div>
        {/* Velados cinematográficos para que el texto y el formulario sigan legibles */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#050505_0%,rgba(5,5,5,0.45)_30%,rgba(5,5,5,0.1)_62%,rgba(5,5,5,0.3)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,#050505_0%,transparent_28%,transparent_72%,#050505_100%)]"
          aria-hidden="true"
        />

        {/* Luz ambiental — misma gramática visual que el resto del sitio */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,4,41,0.10),transparent_55%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_50%)]"
          aria-hidden="true"
        />

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
                    <a
                      href={SPOTIFY_ARTIST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center border border-steel text-fog transition-all duration-300 hover:border-blood hover:text-blood"
                      aria-label="Spotify"
                    >
                      <SpotifyIcon className="h-5 w-5" />
                    </a>
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
