"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Phone, Headphones } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { GlobeCard } from "@/components/globe-card"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function ConnectPage() {
  const { language, t } = useLanguage()

  const callVolumeData = [
    { week: t("chart.week") + " 1", current: 18, withWavenet: 60 },
    { week: t("chart.week") + " 2", current: 24, withWavenet: 78 },
    { week: t("chart.week") + " 3", current: 29, withWavenet: 94 },
    { week: t("chart.week") + " 4", current: 33, withWavenet: 106 },
    { week: t("chart.week") + " 5", current: 35, withWavenet: 112 },
    { week: t("chart.week") + " 6", current: 37, withWavenet: 116 },
    { week: t("chart.week") + " 7", current: 39, withWavenet: 118 },
    { week: t("chart.week") + " 8", current: 40, withWavenet: 120 },
  ]

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
            {t("section.products")}
          </span>
        </div>

        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl mb-6">
          {t("connect.title")}
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 text-balance">
          {t("connect.desc1")}
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
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: 3x More Calls */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-8 shadow-xl">
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={callVolumeData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#ef4444"
                      strokeWidth={2}
                      name={t("connect.chart.current")}
                    />
                    <Line
                      type="monotone"
                      dataKey="withWavenet"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name={t("connect.chart.withWavenet")}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("connect.item1")}</h3>
              <p className="text-muted-foreground">{t("connect.desc1")}</p>
            </div>

            {/* Feature 2: AI Voice Agents */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-8 shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Headphones className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("connect.item2")}</h3>
              <p className="text-muted-foreground">{t("connect.desc2")}</p>
            </div>

            {/* Feature 3: Operators */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-8 shadow-xl">
              <div className="h-[200px] mb-6">
                <GlobeCard />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("connect.item3")}</h3>
              <p className="text-muted-foreground">{t("connect.desc3")}</p>
            </div>

            {/* Feature 4: Automation */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-8 shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("connect.item4")}</h3>
              <p className="text-muted-foreground">{t("connect.desc4")}</p>
            </div>

            {/* Feature 5: 95% Satisfied */}
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-8 shadow-xl md:col-span-2 lg:col-span-1">
              <div className="text-6xl font-bold text-primary mb-6">95%</div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("connect.item5")}</h3>
              <p className="text-muted-foreground">{t("connect.desc5")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">{t("cta.title")}</h2>
          <p className="text-xl text-blue-100/90 mb-8 text-balance">{t("cta.subtitle1")}</p>
          <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-xl">
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
