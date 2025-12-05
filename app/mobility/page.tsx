"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Phone, CheckCircle2, Smartphone } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function MobilityPage() {
  const { language, t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 via-blue-50/20 to-white">
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
          <span className="rounded-full border border-green-600/40 bg-green-600/10 backdrop-blur-sm px-6 py-2 text-sm font-medium text-green-700">
            {t("tech.badge")}
          </span>
        </div>

        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl mb-6">
          {t("tech.title")}
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 text-balance">
          {t("tech.desc1")}
        </p>

        <div className="flex justify-center gap-4">
          <Button asChild size="lg" className="shadow-lg bg-green-600 hover:bg-green-700">
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
      <section className="py-20 bg-gradient-to-br from-green-50/50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Automatic Logging */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-12 shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-600/10 flex items-center justify-center">
                <Phone className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("tech.item1")}</h3>
              <p className="text-muted-foreground">{t("tech.desc1")}</p>
            </div>

            {/* Feature 2: Ready Reports */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-12 shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-600/10 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("tech.item2")}</h3>
              <p className="text-muted-foreground">{t("tech.desc2")}</p>
            </div>

            {/* Feature 3: App-based */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-12 shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-600/10 flex items-center justify-center">
                <Smartphone className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("tech.item3")}</h3>
              <p className="text-muted-foreground">{t("tech.desc3")}</p>
            </div>
          </div>

          {/* Benefit Callout */}
          <div className="mt-12 max-w-3xl mx-auto rounded-2xl border border-green-600/20 bg-green-600/5 backdrop-blur-sm p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-600/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">{language === "sv" ? "Fördel" : "Benefit"}</h3>
                <p className="text-muted-foreground leading-relaxed">{t("tech.deployment")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">{t("cta.title")}</h2>
          <p className="text-xl text-green-100/90 mb-8 text-balance">{t("cta.subtitle1")}</p>
          <Button asChild size="lg" className="bg-white text-green-900 hover:bg-green-50 shadow-xl">
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
