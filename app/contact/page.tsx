"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input, Textarea } from "@/components/ui/input"
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

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
              className="h-10 w-10"
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
            <MobileNavTrigger />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-primary flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              {t("contact.badge")}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("contact.title")}
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-6 md:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-foreground mb-5">{t("contact.form.title")}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  {t("contact.step3.name")} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary h-10"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  {t("contact.step3.email")} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary h-10"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">
                  {t("contact.step3.phone")} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary h-10"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t("contact.step2.companyName")}</label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">{t("contact.form.message")}</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/50 border-border/60 text-foreground placeholder:text-muted-foreground focus:border-primary min-h-[100px] resize-none"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              <Button type="submit" className="w-full shadow-lg h-10 text-sm">
                {t("contact.submit")}
                <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-6 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">{t("contact.info.phone")}</h3>
                  <p className="text-sm text-muted-foreground mb-1.5">{t("contact.info.phoneDesc")}</p>
                  <a href="tel:+46010609280" className="text-sm text-primary hover:underline font-medium">
                    +46 010-609 28 30
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-subtle rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-6 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">{t("contact.info.email")}</h3>
                  <p className="text-sm text-muted-foreground mb-1.5">{t("contact.info.emailDesc")}</p>
                  <a href="mailto:info@wavenet.se" className="text-sm text-primary hover:underline font-medium">
                    info@wavenet.se
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
