"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Cloud, Phone, Smartphone, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function CarePage() {
  const { language, t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-white">
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
                  d="M53.08,0C23.76,0,0,23.76,0,53.08s23.76,53.08,53.08,53.08,53.08-23.76,53.08-53.08S82.39,0,53.08,0ZM87.91,55.53l.49.08c-2.4,0-4.56.97-6.13,2.54-1.57,1.57-2.54,3.74-2.54,6.13s-.97,4.56-2.54,6.13c-1.57,1.57-3.74,2.54-6.13,2.54-4.79,0-8.67-3.88-8.67-8.67,0-2.4-.97-4.56-2.54-6.13-1.45-1.45-3.4-2.38-5.57-2.52-2.17.14-4.13,1.07-5.57,2.52-1.57,1.57-2.54,3.74-2.54,6.13s-.97,4.56-2.54,6.13c-1.57,1.57-3.73,2.54-6.13,2.54-4.79,0-8.67-3.88-8.67-8.67,0-2.4-.97-4.56-2.54-6.13-1.57-1.57-3.74-2.54-6.13-2.54l-1.86-.08c-4.4,0-8.17-3.26-8.68-7.64-.32-2.8.69-5.37,2.48-7.16,1.57-1.57,3.74-2.54,6.13-2.54s4.56.97,6.13,2.54c1.57,1.57,2.54,3.74,2.54,6.13,0,4.75,3.81,8.6,8.54,8.67,2.35-.03,4.46-1,6-2.54,1.57-1.57,2.54-3.74,2.54-6.13s.97-4.56,2.54-6.13c1.57-1.57,3.74-2.54,6.13-2.54s4.56.97,6.13,2.54c1.57,1.57,2.54,3.74,2.54,6.13,0,4.79,3.88,8.67,8.67,8.67h.57c2.4,0,4.56-.97,6.13-2.54s2.54-3.74,2.54-6.13.97-4.56,2.54-6.13c1.57-1.57,3.73-2.54,6.13-2.54s4.56.97,6.13,2.54c1.57,1.57,2.54,3.74,2.54,6.13s-.97,4.56-2.54,6.13-3.74,2.54-6.13,2.54Z"
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
            {t("section.products")}
          </span>
        </div>

        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl mb-6">
          {t("care.title")}
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 text-balance">
          {t("care.desc4")}
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="shadow-lg">
            <Link href="/contact">{t("nav.bookCall")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/">
              <ChevronDown className="mr-2 h-5 w-5 rotate-90" />
              {language === "sv" ? "Tillbaka" : "Back"}
            </Link>
          </Button>
        </div>
      </main>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-purple-50/50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1: Cloud-based */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-12 shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Cloud className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("care.item1")}</h3>
              <p className="text-muted-foreground">{t("care.desc1")}</p>
            </div>

            {/* Feature 2: Scalable */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-12 shadow-xl">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/40 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("care.item2")}</h3>
              <p className="text-muted-foreground">{t("care.desc2")}</p>
            </div>

            {/* Feature 3: One Platform */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-12 shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("care.item3")}</h3>
              <p className="text-muted-foreground">{t("care.desc3")}</p>
            </div>

            {/* Feature 4: Complete Solution */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-12 shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("care.item4")}</h3>
              <p className="text-muted-foreground">{t("care.desc4")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">{t("cta.title")}</h2>
          <p className="text-xl text-purple-100/90 mb-8 text-balance">{t("cta.subtitle1")}</p>
          <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-purple-50 shadow-xl">
            <Link href="/contact">
              {t("cta.button")}
              <ChevronDown className="ml-2 h-5 w-5 rotate-[-90deg]" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
