"use client"

import { Button } from "@/components/ui/button"
import { Clock, Users, Shield } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function HelpdeskPage() {
  const { t } = useLanguage()

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
                  d="M53.08,0C23.76,0,0,23.76,0,53.08s23.76,53.08,53.08,53.08,53.08-23.76,53.08-53.08S82.39,0,53.08,0ZM87.91,55.53l.49.08c-2.4,0-4.56.97-6.13,2.54-1.57,1.57-2.54,3.74-2.54,6.13s-.97,4.56-2.54,6.13c-1.57,1.57-3.74,2.54-6.13,2.54-4.79,0-8.67-3.88-8.67-8.67,0-2.4-.97-4.56-2.54-6.13-1.45-1.45-3.4-2.38-5.57-2.52-2.17.14-4.13,1.07-5.57,2.52-1.57,1.57-2.54,3.74-2.54,6.13s-.97,4.56-2.54,6.13c-1.57,1.57-3.73,2.54-6.13,2.54-4.79,0-8.67-3.88-8.67-8.67,0-2.4-.97-4.56-2.54-6.13-1.57-1.57-3.74-2.54-6.13-2.54l-1.86-.08c-4.4,0-8.17-3.26-8.68-7.64-.32-2.8.69-5.37,2.48-7.16,1.57-1.57,3.74-2.54,6.13-2.54s4.56.97,6.13,2.54c1.57,1.57,2.54,3.74,2.54,6.13,0,4.75,3.81,8.6,8.54,8.67,2.35-.03,4.46-1,6-2.54,1.57-1.57,2.54-3.74,2.54-6.13s.97-4.56,2.54-6.13c1.57-1.57,3.74-2.54,6.13-2.54s4.56.97,6.13,2.54c1.57,1.57,2.54,3.74,2.54,6.13,0,4.79,3.88,8.67,8.67,8.67h.57c2.4,0,4.56-.97,6.13-2.54s2.54-3.74,2.54-6.13.97-4.56,2.54-6.13c1.57-1.57,3.73-2.54,6.13-2.54s4.56.97,6.13,2.54c1.57,1.57,2.54,3.74,2.54,6.13s-.97,4.56-2.54,6.13-3.74,2.54-6.13,2.54Z"
                />
              </g>
            </svg>
            <span className="text-xl font-semibold text-foreground">Wavenet</span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button asChild>
              <Link href="/contact">{t("nav.bookCall")}</Link>
            </Button>
            <MobileNavTrigger />
        </div>
      </div>
    </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span className="rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm px-6 py-2 text-sm font-medium text-primary">
            {t("support.helpdesk.badge")}
          </span>
          <h1 className="mt-8 text-5xl md:text-6xl font-bold text-foreground text-balance">
            {t("support.helpdesk.title")}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground text-balance">{t("support.helpdesk.subtitle")}</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contact">{t("support.helpdesk.cta")}</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-8 shadow-xl">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("support.helpdesk.feature1.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("support.helpdesk.feature1.desc")}</p>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-8 shadow-xl">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("support.helpdesk.feature2.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("support.helpdesk.feature2.desc")}</p>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-8 shadow-xl">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("support.helpdesk.feature3.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">{t("support.helpdesk.feature3.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">{t("cta.title")}</h2>
          <p className="text-xl text-blue-100/90 mb-8 text-balance">{t("cta.subtitle1")}</p>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
            <Link href="/contact">{t("support.helpdesk.cta")}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
