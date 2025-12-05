'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/use-language'

type MobileNavContextValue = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const MobileNavContext = createContext<MobileNavContextValue | null>(null)

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  const lastPathRef = useRef(pathname)

  useEffect(() => {
    if (!isOpen) {
      lastPathRef.current = pathname
      return
    }

    if (lastPathRef.current === pathname) return

    const frame = requestAnimationFrame(() => close())
    lastPathRef.current = pathname
    return () => cancelAnimationFrame(frame)
  }, [pathname, close, isOpen])

  return (
    <MobileNavContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
      <MobileNavDrawer />
    </MobileNavContext.Provider>
  )
}

export function useMobileNav() {
  const context = useContext(MobileNavContext)
  if (!context) {
    throw new Error('useMobileNav must be used within MobileNavProvider')
  }
  return context
}

export function MobileNavTrigger({ className }: { className?: string }) {
  const { toggle, isOpen } = useMobileNav()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      aria-label="Toggle menu"
      className={`md:hidden ${className ?? ''}`}
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </Button>
  )
}

function MobileNavDrawer() {
  const { isOpen, close } = useMobileNav()
  const { t } = useLanguage()

  const sections = [
    {
      title: t('nav.products'),
      links: [
        { href: '/care', label: t('products.care.title') },
        { href: '/connect', label: t('products.connect.title') },
        { href: '/mobility', label: t('products.mobility.title') },
      ],
    },
    {
      title: t('nav.solutions'),
      links: [
        { href: '/solutions/ai-voice', label: t('solutions.aiVoice') },
        { href: '/solutions/chat-automation', label: t('solutions.chatAutomation') },
        { href: '/solutions/analytics', label: t('solutions.analytics') },
      ],
    },
    {
      title: t('nav.why'),
      links: [
        { href: '/about', label: t('why.about') },
        { href: '/partners', label: t('why.partners') },
        { href: '/security', label: t('why.security') },
      ],
    },
    {
      title: t('nav.support'),
      links: [
        { href: '/support/helpdesk', label: t('support.helpdesk') },
        { href: '/support/docs', label: t('support.docs') },
        { href: '/contact', label: t('support.contact') },
      ],
    },
    {
      title: t('nav.reseller'),
      links: [
        { href: '/reseller/program', label: t('reseller.program') },
        { href: '/reseller/benefits', label: t('reseller.benefits') },
        { href: '/contact', label: t('reseller.apply') },
      ],
    },
  ]

  return (
    <div className="md:hidden">
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t('nav.menu') || 'Menu'}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <span className="text-lg font-semibold text-foreground">{t('nav.menu') || 'Menu'}</span>
            <Button variant="ghost" size="sm" onClick={close} aria-label="Close menu">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-6 space-y-6">
            {sections.map((section) => (
              <div className="space-y-2" key={section.title}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{section.title}</h3>
                <div className="space-y-1 pl-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-2 text-foreground hover:text-primary transition-colors"
                      onClick={close}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-6 border-t border-border/20">
            <Button asChild className="w-full shadow-lg" onClick={close}>
              <Link href="/contact">{t('nav.bookCall')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
