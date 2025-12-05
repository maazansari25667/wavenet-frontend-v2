"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { getTranslation } from "@/lib/translations"

type Language = "sv" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "sv"
    const savedLanguage = localStorage.getItem("wavenet-language") as Language
    return savedLanguage === "en" || savedLanguage === "sv" ? savedLanguage : "sv"
  })

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("wavenet-language", lang)
    }
  }

  // Translation function
  const t = (key: string) => {
    return getTranslation(language, key)
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
