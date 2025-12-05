"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import Image from "next/image"
import { Building2, TrendingUp, Users } from "lucide-react"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function PartnersPage() {
  const { language, t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-white">
      {/* Header */}
      <header className="border-b border-border/20 bg-card/50 backdrop-blur-xl shadow-lg sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-4">
            <svg
              id="Lager_2"
              data-name="Lager 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 106.15 106.15"
              className="h-12 w-12"
              style={{ shapeRendering: "geometricPrecision" }}
            >
              <defs>
                <style>{`.cls-1 { fill: #3d67fc; }`}</style>
              </defs>
              <g id="Lager_1-2" data-name="Lager 1">
                <path
                  className="cls-1"
                  d="M53.08,0C23.76,0,0,23.76,0,53.08s23.76,53.08,53.08,53.08,53.08-23.76,53.08-53.08S82.39,0,53.08,0ZM87.91,55.53l.49.08c-2.4,0-4.56.97-6.13,2.54-1.57,1.57-2.54,3.74-2.54,6.13s-.97,4.56-2.54,6.13c-1.57,1.57-3.74,2.54-6.13,2.54-4.79,0-8.67-3.88-8.67-8.67,0-2.4-.97-4.56-2.54-6.13-1.45-1.45-3.4-2.38-5.57-2.52-2.17.14-4.13,1.07-5.57,2.52-1.57,1.57-2.54,3.74-2.54,6.13s-.97,4.56-2.54,6.13c-1.57,1.57-3.73,2.54-6.13,2.54-4.79,0-8.67-3.88-8.67-8.67,0-2.4-.97-4.56-2.54-6.13-1.57-1.57-3.74-2.54-6.13-2.54l-1.86-.08c-4.4,0-8.17-3.26-8.68-7.64-.32-2.8.69-5.37,2.48-7.16,1.57-1.57,3.74-2.54,6.13-2.54s4.56.97,6.13,2.54c1.57,1.57,2.54,3.74,2.54,6.13,0,4.75,3.81,8.6,8.54,8.67,2.35-.03,4.46-1,6-2.54,1.57-1.57,2.54-3.74,2.54-6.13s.97-4.56,2.54-6.13c1.57-1.57,3.74-2.54,6.13-2.54s4.56.97,6.13,2.54c1.57,1.57,2.54,3.74,2.54,6.13s-.97,4.56-2.54,6.13-3.74,2.54-6.13,2.54Z"
                />
              </g>
            </svg>
            <span className="text-xl font-semibold text-foreground">Wavenet</span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button asChild className="shadow-lg">
              <Link href="/contact">{t("nav.bookCall")}</Link>
            </Button>
            <MobileNavTrigger />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div className="mb-8">
          <span className="rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm px-6 py-2 text-sm font-medium text-primary">
            {t("partners.badge")}
          </span>
        </div>

        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl mb-6">
          {t("partners.title")}
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-balance">{t("partners.subtitle")}</p>

        {/* Partner Logos */}
        <div className="mt-16">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="glass-subtle rounded-2xl border border-border/30 bg-card/40 p-6 hover:bg-card/60 hover:shadow-lg transition-all">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q3w4uELwVlsDl7GoAK95DbQE0uYUEX.png"
                alt="The Body Shop"
                width={200}
                height={80}
                className="h-12 w-auto object-contain"
                sizes="(max-width: 768px) 140px, 200px"
                priority
              />
            </div>
            <div className="glass-subtle rounded-2xl border border-border/30 bg-card/40 p-6 hover:bg-card/60 hover:shadow-lg transition-all">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-32dsUuyfIuJpH5IA2iBnxjPuV0I0BE.png"
                alt="Partner logo"
                width={200}
                height={80}
                className="h-12 w-auto object-contain"
                sizes="(max-width: 768px) 140px, 200px"
              />
            </div>
            <div className="glass-subtle rounded-2xl border border-border/30 bg-card/40 p-6 hover:bg-card/60 hover:shadow-lg transition-all">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ntiCmRnDxWDZnS2DEOaHoPWPtM13TJ.png"
                alt="Partner logo"
                width={200}
                height={80}
                className="h-12 w-auto object-contain"
                sizes="(max-width: 768px) 140px, 200px"
              />
            </div>
            <div className="glass-subtle rounded-2xl border border-border/30 bg-card/40 p-6 hover:bg-card/60 hover:shadow-lg transition-all">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DtaxSm2GQUlc7SxjF6FArnCEgxjhRv.png"
                alt="Nova Tandklinik"
                width={220}
                height={90}
                className="h-14 w-auto object-contain"
                sizes="(max-width: 768px) 150px, 220px"
              />
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-subtle rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">20+</h3>
            <p className="text-sm text-muted-foreground">
              {language === "sv" ? "Företag som litar på oss" : "Companies trust us"}
            </p>
          </div>

          <div className="glass-subtle rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">95%</h3>
            <p className="text-sm text-muted-foreground">
              {language === "sv" ? "Nöjda partners" : "Satisfied partners"}
            </p>
          </div>

          <div className="glass-subtle rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">24/7</h3>
            <p className="text-sm text-muted-foreground">
              {language === "sv" ? "Support och service" : "Support and service"}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <Button asChild size="lg" className="shadow-lg px-8">
            <Link href="/contact">{t("partners.cta")}</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
