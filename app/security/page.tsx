"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { Lock, FileCheck, Eye, Database, Award, Shield } from "lucide-react"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function SecurityPage() {
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
            {t("security.badge")}
          </span>
        </div>

        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl mb-6">
          {t("security.title")}
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-16 text-balance">{t("security.subtitle")}</p>

        {/* Security Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass-subtle rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-10 text-left">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t("security.encryption.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("security.encryption.desc")}</p>
          </div>

          <div className="glass-subtle rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-10 text-left">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <FileCheck className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t("security.compliance.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("security.compliance.desc")}</p>
          </div>

          <div className="glass-subtle rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-10 text-left">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t("security.monitoring.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("security.monitoring.desc")}</p>
          </div>

          <div className="glass-subtle rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-10 text-left">
            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t("security.backup.title")}</h3>
            <p className="text-muted-foreground leading-relaxed">{t("security.backup.desc")}</p>
          </div>
        </div>

        {/* ISO Standards Section */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-4xl font-bold text-foreground">{t("security.iso.title")}</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t("security.iso.subtitle")}
            </p>
          </div>

          {/* ISO Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {/* ISO 27001 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative glass-subtle rounded-2xl border-2 border-primary/20 bg-card/80 backdrop-blur-xl p-8 text-center hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300">
                  <Award className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{t("security.iso.27001.title")}</h3>
                <p className="text-muted-foreground font-medium">{t("security.iso.27001.desc")}</p>
              </div>
            </div>

            {/* ISO 27701 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-primary/10 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative glass-subtle rounded-2xl border-2 border-purple-500/20 bg-card/80 backdrop-blur-xl p-8 text-center hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center ring-4 ring-purple-500/10 group-hover:ring-purple-500/30 transition-all duration-300">
                  <Shield className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{t("security.iso.27701.title")}</h3>
                <p className="text-muted-foreground font-medium">{t("security.iso.27701.desc")}</p>
              </div>
            </div>

            {/* ISO 20000 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative glass-subtle rounded-2xl border-2 border-blue-500/20 bg-card/80 backdrop-blur-xl p-8 text-center hover:border-blue-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center ring-4 ring-blue-500/10 group-hover:ring-blue-500/30 transition-all duration-300">
                  <Award className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{t("security.iso.20000.title")}</h3>
                <p className="text-muted-foreground font-medium">{t("security.iso.20000.desc")}</p>
              </div>
            </div>

            {/* ISO 9001 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              <div className="relative glass-subtle rounded-2xl border-2 border-indigo-500/20 bg-card/80 backdrop-blur-xl p-8 text-center hover:border-indigo-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center ring-4 ring-indigo-500/10 group-hover:ring-indigo-500/30 transition-all duration-300">
                  <Award className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{t("security.iso.9001.title")}</h3>
                <p className="text-muted-foreground font-medium">{t("security.iso.9001.desc")}</p>
              </div>
            </div>
          </div>

          {/* ISO Footer Note */}
          <div className="max-w-4xl mx-auto">
            <div className="glass-subtle rounded-2xl border border-border/40 bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 backdrop-blur-lg p-8">
              <p className="text-muted-foreground leading-relaxed text-center text-base">
                {t("security.iso.footer")}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20">
          <Button asChild size="lg" className="shadow-lg px-8">
            <Link href="/contact">{t("security.cta")}</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
