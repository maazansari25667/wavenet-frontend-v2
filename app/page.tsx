"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown, Phone, Shield, Smartphone, Cloud, Headphones, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import type { CarouselApi } from "@/components/ui/carousel"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { TooltipProps } from "recharts"
import { GlobeCard } from "@/components/globe-card"
import { useLanguage } from "@/hooks/use-language"
import Link from "next/link"
import { MobileNavTrigger } from "@/components/mobile-nav"
import { LanguageToggle } from "@/components/language-toggle"

const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastRan = 0
  return (...args: any[]) => {
    const now = Date.now()
    if (now - lastRan >= delay) {
      func(...args)
      lastRan = now
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () => {
          func(...args)
          lastRan = Date.now()
        },
        delay - (now - lastRan),
      )
    }
  }
}

export default function Home() {
  const { language, t } = useLanguage()
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const productCards = [
    {
      href: "/care",
      title: t("products.care.title"),
      description: t("products.care.desc"),
      className: "",
    },
    {
      href: "/connect",
      title: t("products.connect.title"),
      description: t("products.connect.desc"),
      className: "",
    },
    {
      href: "/mobility",
      title: t("products.mobility.title"),
      description: t("products.mobility.desc"),
      className: "col-span-2",
    },
  ]
  const solutionsLinks = [
    { href: "/solutions/ai-voice", label: t("solutions.aiVoice") },
    { href: "/solutions/chat-automation", label: t("solutions.chatAutomation") },
    { href: "/solutions/analytics", label: t("solutions.analytics") },
  ]
  const whyLinks = [
    { href: "/about", label: t("why.about") },
    { href: "/partners", label: t("why.partners") },
    { href: "/security", label: t("why.security") },
  ]
  const supportLinks = [
    { href: "/support/helpdesk", label: t("support.helpdesk") },
    { href: "/support/docs", label: t("support.docs") },
    { href: "/contact", label: t("support.contact") },
  ]
  const resellerLinks = [
    { href: "/reseller/program", label: t("reseller.program") },
    { href: "/reseller/benefits", label: t("reseller.benefits") },
    { href: "/contact", label: t("reseller.apply") },
  ]
  const simpleMenuLinkClass =
    "rounded-lg px-3 py-2 text-sm text-foreground/90 transition-colors hover:bg-accent/80 hover:text-accent-foreground"
  const navTriggerClass =
    "!bg-transparent text-muted-foreground hover:text-foreground hover:!bg-transparent focus:!bg-transparent focus-visible:!ring-0 focus-visible:!outline-none data-[state=open]:!bg-transparent data-[state=open]:text-foreground"

  const [connectState, setConnectState] = useState({
    activeItem: 0,
    isLocked: false,
    hasCompleted: false,
    isTransitioning: false,
  })

  const [careState, setCareState] = useState({
    activeItem: 0,
    isLocked: false,
    hasCompleted: false,
    isTransitioning: false,
  })

  const [techState, setTechState] = useState({
    activeItem: 0,
    isLocked: false,
    hasCompleted: false,
    isTransitioning: false,
  })

  const connectSectionRef = useRef<HTMLDivElement>(null)
  const careSectionRef = useRef<HTMLDivElement>(null)
  const techSectionRef = useRef<HTMLDivElement>(null)

  const lastConnectScrollTime = useRef(0)
  const lastCareScrollTime = useRef(0)
  const lastTechScrollTime = useRef(0)
  const lastCarouselUnlockTime = useRef(0)
  const scrollLockSnapshot = useRef<{
    scrollY: number
    styles: {
      top: string
      position: string
      width: string
      overflowY: string
      paddingRight: string
    }
  } | null>(null)

  // Removed: const connectSoftUnlockScroll = useRef(0)
  // Removed: const careSoftUnlockScroll = useRef(0)
  // Removed: const techSoftUnlockScroll = useRef(0)

  const [isMobile, setIsMobile] = useState(false)

  const CAROUSEL_COOLDOWN = 1000 // Delay before a carousel can recapture after release
  const THROTTLE_DELAY = 100 // Reduced from 200ms for more responsive feel
  // Removed: const SOFT_UNLOCK_THRESHOLD = 150 // Amount of scroll needed to fully unlock

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!carouselApi) return

    const intervalId = setInterval(() => {
      carouselApi.scrollNext()
    }, 4000)

    return () => clearInterval(intervalId)
  }, [carouselApi])

  const isSectionCentered = useCallback((rect: DOMRect) => {
    const sectionCenter = rect.top + rect.height / 2
    const viewportCenter = window.innerHeight / 2
    return Math.abs(sectionCenter - viewportCenter) < 50
  }, [])

  const isSectionInView = useCallback((rect: DOMRect) => {
    return rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2
  }, [])

  const handleConnectItemClick = useCallback(
    (index: number) => {
      if (!connectSectionRef.current) return

      if (!connectState.isLocked) {
        const section = connectSectionRef.current
        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const viewportCenter = window.innerHeight / 2
        const scrollOffset = sectionCenter - viewportCenter

        window.scrollBy({
          top: scrollOffset,
          behavior: "smooth",
        })

        setTimeout(() => {
          setConnectState((prev) => ({ ...prev, isLocked: true, activeItem: index }))
        }, 300)
      } else {
        setConnectState((prev) => ({ ...prev, activeItem: index }))
      }
    },
    [connectState.isLocked],
  )

  const handleCareItemClick = useCallback(
    (index: number) => {
      if (!careSectionRef.current) return

      if (!careState.isLocked) {
        const section = careSectionRef.current
        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const viewportCenter = window.innerHeight / 2
        const scrollOffset = sectionCenter - viewportCenter

        window.scrollBy({
          top: scrollOffset,
          behavior: "smooth",
        })

        setTimeout(() => {
          setCareState((prev) => ({ ...prev, isLocked: true, activeItem: index }))
        }, 300)
      } else {
        setCareState((prev) => ({ ...prev, activeItem: index }))
      }
    },
    [careState.isLocked],
  )

  const handleTechItemClick = useCallback(
    (index: number) => {
      if (!techSectionRef.current) return

      if (!techState.isLocked) {
        const section = techSectionRef.current
        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const viewportCenter = window.innerHeight / 2
        const scrollOffset = sectionCenter - viewportCenter

        window.scrollBy({
          top: scrollOffset,
          behavior: "smooth",
        })

        setTimeout(() => {
          setTechState((prev) => ({ ...prev, isLocked: true, activeItem: index }))
        }, 300)
      } else {
        setTechState((prev) => ({ ...prev, activeItem: index }))
      }
    },
    [techState.isLocked],
  )

  useEffect(() => {
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      const timeSinceLastUnlock = now - lastCarouselUnlockTime.current
      const isInCooldown = timeSinceLastUnlock < CAROUSEL_COOLDOWN

      requestAnimationFrame(() => {
        // Handle Connect carousel
        if (connectSectionRef.current) {
          const connectSection = connectSectionRef.current
          const connectRect = connectSection.getBoundingClientRect()
          const isConnectCentered = isSectionCentered(connectRect)
          const isConnectInView = isSectionInView(connectRect)

          if (
            isConnectCentered &&
            isConnectInView &&
            !connectState.isLocked &&
            !careState.isLocked &&
            !techState.isLocked &&
            !connectState.hasCompleted &&
            !isInCooldown
          ) {
            e.preventDefault()
            setConnectState((prev) => ({ ...prev, isLocked: true, activeItem: 0 }))
            setCareState((prev) => ({ ...prev, isLocked: false }))
            setTechState((prev) => ({ ...prev, isLocked: false }))
            return
          }

          if (connectState.isLocked) {
            const scrollingDown = e.deltaY > 0
            const scrollingUp = e.deltaY < 0

            // Unlock at boundaries - allow scroll to continue naturally
            if (scrollingUp && connectState.activeItem === 0) {
              setConnectState((prev) => ({ ...prev, isLocked: false, hasCompleted: false }))
              lastCarouselUnlockTime.current = now
              // Don't prevent default - let scroll continue
              return
            }

            if (scrollingDown && connectState.activeItem === 4) {
              setConnectState((prev) => ({ ...prev, isLocked: false, hasCompleted: true }))
              lastCarouselUnlockTime.current = now
              // Don't prevent default - let scroll continue
              return
            }

            // Only prevent default if we're staying locked and transitioning
            e.preventDefault()

            if (connectState.isTransitioning || now - lastConnectScrollTime.current < THROTTLE_DELAY) {
              return
            }

            lastConnectScrollTime.current = now

            if (scrollingDown && connectState.activeItem < 4) {
              setConnectState((prev) => ({ ...prev, isTransitioning: true, activeItem: prev.activeItem + 1 }))
              setTimeout(() => {
                setConnectState((prev) => ({ ...prev, isTransitioning: false }))
              }, 250)
            } else if (scrollingUp && connectState.activeItem > 0) {
              setConnectState((prev) => ({ ...prev, isTransitioning: true, activeItem: prev.activeItem - 1 }))
              setTimeout(() => {
                setConnectState((prev) => ({ ...prev, isTransitioning: false }))
              }, 250)
            }
            return
          }
        }

        if (careSectionRef.current) {
          const careSection = careSectionRef.current
          const careRect = careSection.getBoundingClientRect()
          const isCareCentered = isSectionCentered(careRect)
          const isCareInView = isSectionInView(careRect)

          if (
            isCareCentered &&
            isCareInView &&
            !careState.isLocked &&
            !connectState.isLocked &&
            !techState.isLocked &&
            !isInCooldown
          ) {
            e.preventDefault()
            setCareState((prev) => ({
              ...prev,
              isLocked: true,
              activeItem: e.deltaY > 0 || !prev.hasCompleted ? 0 : prev.activeItem,
            }))
            setConnectState((prev) => ({ ...prev, isLocked: false }))
            setTechState((prev) => ({ ...prev, isLocked: false }))
            return
          }

          if (careState.isLocked) {
            const scrollingDown = e.deltaY > 0
            const scrollingUp = e.deltaY < 0

            if (scrollingUp && careState.activeItem === 0) {
              setCareState((prev) => ({ ...prev, isLocked: false, hasCompleted: false }))
              lastCarouselUnlockTime.current = now
              return
            }

            if (scrollingDown && careState.activeItem === 3) {
              setCareState((prev) => ({ ...prev, isLocked: false, hasCompleted: true }))
              lastCarouselUnlockTime.current = now
              return
            }

            e.preventDefault()

            if (careState.isTransitioning || now - lastCareScrollTime.current < THROTTLE_DELAY) {
              return
            }

            lastCareScrollTime.current = now

            if (scrollingDown && careState.activeItem < 3) {
              setCareState((prev) => ({ ...prev, isTransitioning: true, activeItem: prev.activeItem + 1 }))
              setTimeout(() => {
                setCareState((prev) => ({ ...prev, isTransitioning: false }))
              }, 250)
            } else if (scrollingUp && careState.activeItem > 0) {
              setCareState((prev) => ({ ...prev, isTransitioning: true, activeItem: prev.activeItem - 1 }))
              setTimeout(() => {
                setCareState((prev) => ({ ...prev, isTransitioning: false }))
              }, 250)
            }
            return
          }
        }

        if (techSectionRef.current) {
          const techSection = techSectionRef.current
          const techRect = techSection.getBoundingClientRect()
          const isTechCentered = isSectionCentered(techRect)
          const isTechInView = isSectionInView(techRect)

          if (
            isTechCentered &&
            isTechInView &&
            !techState.isLocked &&
            !connectState.isLocked &&
            !careState.isLocked &&
            !techState.hasCompleted &&
            !isInCooldown
          ) {
            e.preventDefault()
            setTechState((prev) => ({ ...prev, isLocked: true, activeItem: 0 }))
            setConnectState((prev) => ({ ...prev, isLocked: false }))
            setCareState((prev) => ({ ...prev, isLocked: false }))
            return
          }

          if (techState.isLocked) {
            const scrollingDown = e.deltaY > 0
            const scrollingUp = e.deltaY < 0

            if (scrollingUp && techState.activeItem === 0) {
              setTechState((prev) => ({ ...prev, isLocked: false, hasCompleted: false }))
              lastCarouselUnlockTime.current = now
              return
            }

            if (scrollingDown && techState.activeItem === 2) {
              setTechState((prev) => ({ ...prev, isLocked: false, hasCompleted: true }))
              lastCarouselUnlockTime.current = now
              return
            }

            e.preventDefault()

            if (techState.isTransitioning || now - lastTechScrollTime.current < THROTTLE_DELAY) {
              return
            }

            lastTechScrollTime.current = now

            if (scrollingDown && techState.activeItem < 2) {
              setTechState((prev) => ({ ...prev, isTransitioning: true, activeItem: prev.activeItem + 1 }))
              setTimeout(() => {
                setTechState((prev) => ({ ...prev, isTransitioning: false }))
              }, 250)
            } else if (scrollingUp && techState.activeItem > 0) {
              setTechState((prev) => ({ ...prev, isTransitioning: true, activeItem: prev.activeItem - 1 }))
              setTimeout(() => {
                setTechState((prev) => ({ ...prev, isTransitioning: false }))
              }, 250)
            }
          }
        }
      })
    }

    const throttledHandleWheel = throttle(handleWheel, 16) // ~60fps
    window.addEventListener("wheel", throttledHandleWheel as any, { passive: false })

    return () => {
      window.removeEventListener("wheel", throttledHandleWheel as any)
    }
  }, [
    connectState.isLocked,
    connectState.activeItem,
    connectState.hasCompleted,
    connectState.isTransitioning,
    careState.isLocked,
    careState.activeItem,
    careState.hasCompleted,
    careState.isTransitioning,
    techState.isLocked,
    techState.activeItem,
    techState.hasCompleted,
    techState.isTransitioning,
    isMobile,
    isSectionCentered,
    isSectionInView,
  ])

  useEffect(() => {
    const handleScroll = throttle(() => {
      requestAnimationFrame(() => {
        if (connectSectionRef.current && !connectState.isLocked) {
          const section = connectSectionRef.current
          const rect = section.getBoundingClientRect()

          if (rect.top > window.innerHeight || rect.bottom < 0) {
            setConnectState((prev) => ({ ...prev, activeItem: 0, hasCompleted: false }))
          }
        }

        if (careSectionRef.current && !careState.isLocked) {
          const careSection = careSectionRef.current
          const careRect = careSection.getBoundingClientRect()

          if (careRect.top > window.innerHeight || careRect.bottom < 0) {
            setCareState((prev) => ({ ...prev, activeItem: 0, hasCompleted: false }))
          }
        }

        if (techSectionRef.current && !techState.isLocked) {
          const techSection = techSectionRef.current
          const techRect = techSection.getBoundingClientRect()

          if (techRect.top > window.innerHeight || techRect.bottom < 0) {
            setTechState((prev) => ({ ...prev, activeItem: 0, hasCompleted: false }))
          }
        }
      })
    }, 100)

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [connectState.isLocked, careState.isLocked, techState.isLocked])

  useEffect(() => {
    if (typeof window === "undefined") return

    const shouldLockScroll = connectState.isLocked || careState.isLocked || techState.isLocked
    const body = document.body
    if (!body) return

    const releaseScrollLock = () => {
      if (!scrollLockSnapshot.current) return
      const { scrollY, styles } = scrollLockSnapshot.current
      scrollLockSnapshot.current = null
      body.style.position = styles.position || ""
      body.style.top = styles.top || ""
      body.style.width = styles.width || ""
      body.style.overflowY = styles.overflowY || ""
      body.style.paddingRight = styles.paddingRight || ""
      window.scrollTo(0, scrollY)
    }

    if (shouldLockScroll && !scrollLockSnapshot.current) {
      const currentScrollY = window.scrollY

      scrollLockSnapshot.current = {
        scrollY: currentScrollY,
        styles: {
          position: body.style.position,
          top: body.style.top,
          width: body.style.width,
          overflowY: body.style.overflowY,
          paddingRight: body.style.paddingRight,
        },
      }

      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

      body.style.position = "fixed"
      body.style.top = `-${currentScrollY}px`
      body.style.width = "100%"
      body.style.overflowY = "hidden"
      body.style.paddingRight = scrollBarWidth > 0 ? `${scrollBarWidth}px` : body.style.paddingRight
    } else if (!shouldLockScroll && scrollLockSnapshot.current) {
      releaseScrollLock()
    }

    return () => {
      releaseScrollLock()
    }
  }, [connectState.isLocked, careState.isLocked, techState.isLocked])

  const callVolumeData = useMemo(
    () => [
      { weekNumber: "1", current: 18, withWavenet: 60 },
      { weekNumber: "2", current: 24, withWavenet: 78 },
      { weekNumber: "3", current: 29, withWavenet: 94 },
      { weekNumber: "4", current: 33, withWavenet: 106 },
      { weekNumber: "5", current: 35, withWavenet: 112 },
      { weekNumber: "6", current: 37, withWavenet: 116 },
      { weekNumber: "7", current: 39, withWavenet: 118 },
      { weekNumber: "8", current: 40, withWavenet: 120 },
    ],
    [],
  )

  const chartLegendValues = useMemo(() => {
    const lastPoint = callVolumeData[callVolumeData.length - 1]
    if (!lastPoint) return { current: 0, withWavenet: 0 }
    return { current: lastPoint.current, withWavenet: lastPoint.withWavenet }
  }, [callVolumeData])

  const chartTickValues = useMemo(() => {
    if (!callVolumeData.length) return []
    const firstPoint = callVolumeData[0]
    const lastPoint = callVolumeData[callVolumeData.length - 1]
    const values = new Set<number>()
    values.add(firstPoint.current)
    values.add(firstPoint.withWavenet)
    values.add(lastPoint.current)
    values.add(lastPoint.withWavenet)
    return Array.from(values).sort((a, b) => a - b)
  }, [callVolumeData])

  const renderTooltip = useCallback(
    ({ active, payload }: any) => {
      if (!active || !payload?.length) return null

      const currentEntry = payload.find((entry: any) => entry.dataKey === "current")
      const wavenetEntry = payload.find((entry: any) => entry.dataKey === "withWavenet")

      if (!currentEntry || !wavenetEntry) return null

      return (
        <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur text-[10px] leading-relaxed">
          <p className="text-slate-900">
            {t("chart.tooltip.current")} <span className="font-bold text-red-500">{currentEntry.value}</span>{" "}
            {t("chart.tooltip.could")} <span className="font-bold text-green-600">{wavenetEntry.value}</span>{" "}
            {t("chart.tooltip.with")}
          </p>
        </div>
      )
    },
    [t],
  )

  const features = [
    {
      icon: Phone,
      title: t("service.aiAgents.title"),
      description: t("service.aiAgents.desc"),
      items: [
        t("service.aiAgents.item1"),
        t("service.aiAgents.item2"),
        t("service.aiAgents.item3"),
        t("service.aiAgents.item4"),
      ],
    },
    {
      icon: Shield,
      title: t("service.enterprise.title"),
      description: t("service.enterprise.desc"),
      items: [
        t("service.enterprise.item1"),
        t("service.enterprise.item2"),
        t("service.enterprise.item3"),
        t("service.enterprise.item4"),
      ],
    },
    {
      icon: Smartphone,
      title: t("service.mobility.title"),
      description: t("service.mobility.desc"),
      items: [
        t("service.mobility.item1"),
        t("service.mobility.item2"),
        t("service.mobility.item3"),
        t("service.mobility.item4"),
      ],
    },
    {
      icon: Headphones,
      title: t("service.itSupport.title"),
      description: t("service.itSupport.desc"),
      items: [
        t("service.itSupport.item1"),
        t("service.itSupport.item2"),
        t("service.itSupport.item3"),
        t("service.itSupport.item4"),
      ],
    },
    {
      icon: Cloud,
      title: t("service.cloudStorage.title"),
      description: t("service.cloudStorage.desc"),
      items: [
        t("service.cloudStorage.item1"),
        t("service.cloudStorage.item2"),
        t("service.cloudStorage.item3"),
        t("service.cloudStorage.item4"),
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-white">
      {/* Header */}
      <header className="border-b border-border/20 bg-card/50 backdrop-blur-xl shadow-lg sticky top-0 z-60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <svg
              id="Lager_2"
              data-name="Lager 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 106.15 106.15"
              className="h-12 w-12"
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
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block ml-8">
            <NavigationMenu viewport={false} className="flex items-center gap-1 !justify-start !flex-none">
              <NavigationMenuList className="gap-1 !flex-none !justify-start">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={navTriggerClass}>{t("nav.products")}</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-full md:!w-[620px] rounded-xl border border-border/40 bg-popover/90 p-4 shadow-2xl backdrop-blur-xl">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {productCards.map((card) => (
                        <NavigationMenuLink asChild key={card.href}>
                          <Link
                            href={card.href}
                            className={`block rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-6 hover:shadow-lg transition-all cursor-pointer ${card.className}`}
                          >
                            <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                            <p className="text-sm text-muted-foreground">{card.description}</p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={navTriggerClass}>{t("nav.solutions")}</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-56 rounded-xl border border-border/40 bg-popover/90 p-2 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col">
                      {solutionsLinks.map((link) => (
                        <NavigationMenuLink asChild key={link.href}>
                          <Link href={link.href} className={simpleMenuLinkClass}>
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={navTriggerClass}>{t("nav.why")}</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-56 rounded-xl border border-border/40 bg-popover/90 p-2 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col">
                      {whyLinks.map((link) => (
                        <NavigationMenuLink asChild key={link.href}>
                          <Link href={link.href} className={simpleMenuLinkClass}>
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={navTriggerClass}>{t("nav.support")}</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-56 rounded-xl border border-border/40 bg-popover/90 p-2 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col">
                      {supportLinks.map((link) => (
                        <NavigationMenuLink asChild key={link.href}>
                          <Link href={link.href} className={simpleMenuLinkClass}>
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className={navTriggerClass}>{t("nav.reseller")}</NavigationMenuTrigger>
                  <NavigationMenuContent className="w-56 rounded-xl border border-border/40 bg-popover/90 p-2 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col">
                      {resellerLinks.map((link) => (
                        <NavigationMenuLink asChild key={link.href}>
                          <Link href={link.href} className={simpleMenuLinkClass}>
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            {/* Desktop CTA Button */}
            <Button asChild className="shadow-lg hidden md:inline-flex">
              <Link href="/contact">{t("nav.bookCall")}</Link>
            </Button>

            <MobileNavTrigger />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 py-12 text-center md:py-14">
        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {t("hero.title")}
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl">{t("hero.subtitle")}</span>
        </h1>

        <div className="mt-6 flex justify-center">
          <Button asChild size="lg" className="backdrop-blur-sm px-8 shadow-lg">
            <Link href="/contact">{t("hero.cta")}</Link>
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-3">{t("hero.partners")}</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <div className="glass-subtle rounded-2xl border border-border/30 bg-card/40 p-3 hover:bg-card/60 hover:shadow-lg transition-all">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-q3w4uELwVlsDl7GoAK95DbQE0uYUEX.png"
                alt="The Body Shop"
                width={180}
                height={60}
                className="h-8 w-auto object-contain"
                sizes="(max-width: 768px) 120px, 180px"
                priority
              />
            </div>
            <div className="glass-subtle rounded-2xl border border-border/30 bg-card/40 p-3 hover:bg-card/60 hover:shadow-lg transition-all">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-32dsUuyfIuJpH5IA2iBnxjPuV0I0BE.png"
                alt="Customer logo"
                width={180}
                height={60}
                className="h-8 w-auto object-contain"
                sizes="(max-width: 768px) 120px, 180px"
              />
            </div>
            <div className="glass-subtle rounded-2xl border border-border/30 bg-card/40 p-3 hover:bg-card/60 hover:shadow-lg transition-all">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ntiCmRnDxWDZnS2DEOaHoPWPtM13TJ.png"
                alt="Customer logo"
                width={180}
                height={60}
                className="h-8 w-auto object-contain"
                sizes="(max-width: 768px) 120px, 180px"
              />
            </div>
            <div className="glass-subtle rounded-2xl border border-border/30 bg-card/40 p-3 hover:bg-card/60 hover:shadow-lg transition-all">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DtaxSm2GQUlc7SxjF6FArnCEgxjhRv.png"
                alt="Nova Tandklinik"
                width={200}
                height={70}
                className="h-10 w-auto object-contain"
                sizes="(max-width: 768px) 140px, 200px"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Connect Section */}
      <section
        ref={connectSectionRef}
        className={`relative flex items-center justify-center min-h-screen overflow-x-hidden ${
          connectState.isLocked && !isMobile ? "sticky top-0 z-50" : "z-50"
        }`}
        style={{
          backgroundColor: "white",
          isolation: "isolate",
          contain: "layout style paint",
          transition: "none",
          willChange: connectState.isLocked ? "transform" : "auto",
        }}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 py-6 sm:py-12 lg:py-16 w-full">
          <div className="mb-4 lg:mb-12 text-center">
            <span className="rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm px-2 sm:px-6 py-1 sm:py-2 text-[9px] sm:text-sm font-medium text-primary">
              {t("section.products")}
            </span>
          </div>

          <div className="grid grid-cols-[45px_1fr_75px] sm:grid-cols-[120px_1fr_180px] md:grid-cols-[200px_1fr_280px] lg:grid-cols-[280px_1fr_380px] xl:grid-cols-[300px_1fr_400px] gap-1 sm:gap-6 md:gap-8 lg:gap-12 items-start lg:items-center w-full">
            {/* Left: Numbered list - more compact on mobile */}
            <div className="w-full space-y-1 sm:space-y-3 md:space-y-4 lg:space-y-6 lg:pl-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  onClick={() => handleConnectItemClick(index)}
                  className={`flex items-center gap-1 sm:gap-3 md:gap-4 group cursor-pointer transition-all duration-300 ease-out ${connectState.activeItem === index ? "scale-105" : ""}`}
                  style={{ willChange: "transform" }}
                >
                  <div
                    className={`w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${connectState.activeItem === index ? "bg-primary shadow-lg shadow-primary/30" : "bg-primary/10 group-hover:bg-primary/20"}`}
                  >
                    <span
                      className={`text-[8px] sm:text-sm md:text-base lg:text-lg font-bold transition-colors ${connectState.activeItem === index ? "text-white" : "text-primary/50 group-hover:text-primary/70"}`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <span
                    className={`text-[8px] sm:text-sm md:text-base lg:text-lg transition-colors hidden sm:inline ${connectState.activeItem === index ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"}`}
                  >
                    {t(`connect.item${index + 1}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* Center: Visual content - more compact on mobile */}
            <div className="w-full flex flex-col gap-6 items-center justify-center relative min-h-[120px] sm:min-h-[250px] md:min-h-[350px] lg:min-h-[500px]">
              <div
                className="w-full max-w-full lg:max-w-md mx-auto lg:absolute lg:inset-0 flex items-center justify-center"
                style={{ pointerEvents: connectState.activeItem === 0 ? "auto" : "none" }}
                aria-hidden={connectState.activeItem !== 0}
              >
                {connectState.activeItem === 0 && (
                  <div
                    className="w-full glass-subtle rounded-lg lg:rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-2 sm:p-4 md:p-6"
                    style={{
                      transition: "opacity 250ms ease-in-out, transform 250ms ease-in-out",
                      opacity: connectState.activeItem === 0 ? 1 : 0,
                      transform:
                        connectState.activeItem === 0 ? "scale(1) translateY(0)" : "scale(0.98) translateY(10px)",
                      willChange: "transform, opacity",
                    }}
                  >
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={callVolumeData} margin={{ top: 5, right: 16, left: 16, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" opacity={0.4} />
                        <XAxis dataKey="weekNumber" tick={false} tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
                        <YAxis
                          tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }}
                          width={44}
                          axisLine={false}
                          tickLine={false}
                          domain={[
                            chartTickValues[0] ?? 0,
                            chartTickValues[chartTickValues.length - 1] ?? chartLegendValues.withWavenet,
                          ]}
                          ticks={chartTickValues}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip content={renderTooltip} cursor={{ stroke: "#cbd5f5", strokeDasharray: "3 3" }} />
                        <Line
                          type="monotone"
                          dataKey="current"
                          stroke="#ef4444"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          dot={{ r: 4, fill: "#fff", stroke: "#ef4444", strokeWidth: 2 }}
                          activeDot={{ r: 5, fill: "#fff", stroke: "#ef4444", strokeWidth: 3 }}
                          name={t("connect.chart.current")}
                          animationDuration={1500}
                        />
                        <Line
                          type="monotone"
                          dataKey="withWavenet"
                          stroke="#22c55e"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          dot={{ r: 4, fill: "#fff", stroke: "#22c55e", strokeWidth: 2 }}
                          activeDot={{ r: 5, fill: "#fff", stroke: "#22c55e", strokeWidth: 3 }}
                          name={t("connect.chart.withWavenet")}
                          animationDuration={1500}
                          animationBegin={300}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="flex items-center justify-center gap-1 sm:gap-4 mt-1">
                      <div className="flex items-center gap-0.5">
                        <div className="w-1.5 h-0.5 bg-red-500 rounded" />
                        <span className="text-[7px] sm:text-[10px] text-muted-foreground">
                          {t("connect.chart.current")} ({chartLegendValues.current})
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <div className="w-1.5 h-0.5 bg-green-500 rounded" />
                        <span className="text-[7px] sm:text-[10px] text-muted-foreground">
                          {t("connect.chart.withWavenet")} ({chartLegendValues.withWavenet})
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="w-full max-w-full lg:max-w-md mx-auto lg:absolute lg:inset-0 flex items-center justify-center"
                  style={{ pointerEvents: connectState.activeItem === index ? "auto" : "none" }}
                  aria-hidden={connectState.activeItem !== index}
                >
                  {connectState.activeItem === index && (
                    <div
                      className="w-full glass-subtle rounded-lg lg:rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-2 sm:p-6 md:p-8 lg:p-12 shadow-xl flex items-center justify-center"
                      style={{
                        transition: "opacity 250ms ease-in-out, transform 250ms ease-in-out",
                        opacity: connectState.activeItem === index ? 1 : 0,
                        transform:
                          connectState.activeItem === index ? "scale(1) translateY(0)" : "scale(0.98) translateY(10px)",
                        willChange: "transform, opacity",
                      }}
                    >
                      {connectState.activeItem === 1 && (
                        <div className="text-center space-y-1 sm:space-y-3 md:space-y-4">
                          <div className="w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <Headphones className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" />
                          </div>
                          <h3 className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-bold text-foreground">
                            {t("connect.visual2.title")}
                          </h3>
                          <p className="text-[8px] sm:text-sm text-muted-foreground">{t("connect.visual2.desc")}</p>
                        </div>
                      )}
                      {connectState.activeItem === 2 && (
                        <div className="w-full h-[140px] sm:h-[220px] md:h-[280px] lg:h-[300px] relative">
                          <GlobeCard />
                        </div>
                      )}
                      {connectState.activeItem === 3 && (
                        <div className="text-center space-y-1 sm:space-y-3 md:space-y-4">
                          <div className="w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <Phone className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" />
                          </div>
                          <h3 className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-bold text-foreground">
                            {t("connect.visual4.title")}
                          </h3>
                          <p className="text-[8px] sm:text-sm text-muted-foreground">{t("connect.visual4.desc")}</p>
                        </div>
                      )}
                      {connectState.activeItem === 4 && (
                        <div className="text-center space-y-1 sm:space-y-3 md:space-y-4">
                          <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary">95%</div>
                          <h3 className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-bold text-foreground">
                            {t("connect.visual5.title")}
                          </h3>
                          <p className="text-[8px] sm:text-sm text-muted-foreground">{t("connect.visual5.desc")}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Text content - more compact on mobile */}
            <div className="w-full space-y-1 sm:space-y-3 md:space-y-4 lg:space-y-6 relative min-h-[100px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[300px]">
              <h2 className="text-[10px] sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground text-balance leading-tight">
                {t("connect.title")}
              </h2>

              <div className="relative">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="transition-all duration-500 ease-out"
                    style={{
                      transition: "opacity 250ms ease-in-out, transform 250ms ease-in-out",
                      position: connectState.activeItem === index ? "relative" : "absolute",
                      opacity: connectState.activeItem === index ? 1 : 0,
                      transform: connectState.activeItem === index ? "translateX(0)" : "translateX(15px)",
                      pointerEvents: connectState.activeItem === index ? "auto" : "none",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className="space-y-1 sm:space-y-3 md:space-y-4 lg:space-y-6">
                      <p className="text-[8px] sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                        {t(`connect.desc${index + 1}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="sm"
                className="shadow-lg w-full text-[8px] sm:text-sm md:text-base lg:text-base mt-1 sm:mt-3 md:mt-4 h-6 sm:h-9 px-2 sm:px-4"
              >
                <Link href="/connect">{t("connect.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Care Section */}
      <section
        ref={careSectionRef}
        className={`relative flex items-center justify-center min-h-screen overflow-x-hidden ${
          careState.isLocked && !isMobile ? "sticky top-0 z-40" : "z-40"
        }`}
        style={{
          backgroundColor: "white",
          isolation: "isolate",
          contain: "layout style paint",
          transition: "none",
          willChange: careState.isLocked ? "transform" : "auto",
        }}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 py-6 sm:py-12 lg:py-16 w-full">
          <div className="grid grid-cols-[45px_1fr_75px] sm:grid-cols-[120px_1fr_180px] md:grid-cols-[200px_1fr_280px] lg:grid-cols-[280px_1fr_380px] xl:grid-cols-[300px_1fr_400px] gap-1 sm:gap-6 md:gap-8 lg:gap-12 items-start lg:items-center w-full">
            {/* Left: Numbered list - clickable */}
            <div className="w-full space-y-1 sm:space-y-3 md:space-y-4 lg:space-y-6 lg:pl-2">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  onClick={() => handleCareItemClick(index)}
                  className={`flex items-center gap-1 sm:gap-3 md:gap-4 group cursor-pointer transition-all duration-300 ease-out ${careState.activeItem === index ? "scale-105" : ""}`}
                  style={{ willChange: "transform" }}
                >
                  <div
                    className={`w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${careState.activeItem === index ? "bg-primary shadow-lg shadow-primary/30" : "bg-primary/10 group-hover:bg-primary/20"}`}
                  >
                    <span
                      className={`text-[8px] sm:text-sm md:text-base lg:text-lg font-bold transition-colors ${careState.activeItem === index ? "text-white" : "text-primary/50 group-hover:text-primary/70"}`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <span
                    className={`text-[8px] sm:text-sm md:text-base lg:text-lg transition-colors hidden sm:inline ${careState.activeItem === index ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"}`}
                  >
                    {t(`care.item${index + 1}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* Center: Visual content - stays in middle column on all screen sizes */}
            <div className="w-full flex flex-col gap-6 items-center justify-center relative min-h-[120px] sm:min-h-[250px] md:min-h-[350px] lg:min-h-[500px]">
              <div className="w-full max-w-full lg:max-w-md mx-auto lg:absolute lg:inset-0 flex items-center justify-center">
                {careState.activeItem === 0 && (
                  <div
                    className="w-full glass-subtle rounded-lg lg:rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-2 sm:p-4 md:p-6 lg:p-12 shadow-xl flex items-center justify-center"
                    style={{
                      transition: "opacity 250ms ease-in-out, transform 250ms ease-in-out",
                      opacity: careState.activeItem === 0 ? 1 : 0,
                      transform: careState.activeItem === 0 ? "scale(1) translateY(0)" : "scale(0.98) translateY(10px)",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className="text-center space-y-1 sm:space-y-3 md:space-y-4">
                      <div className="w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <Cloud className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" />
                      </div>
                      <h3 className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-bold text-foreground">
                        {t("care.visual1.title")}
                      </h3>
                      <p className="text-[8px] sm:text-sm text-muted-foreground">{t("care.visual1.desc")}</p>
                    </div>
                  </div>
                )}
              </div>

              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-full max-w-full lg:max-w-md mx-auto lg:absolute lg:inset-0 flex items-center justify-center"
                >
                  {careState.activeItem === index && (
                    <div
                      className="w-full glass-subtle rounded-lg lg:rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-2 sm:p-4 md:p-6 lg:p-12 shadow-xl flex items-center justify-center"
                      style={{
                        transition: "opacity 250ms ease-in-out, transform 250ms ease-in-out",
                        opacity: careState.activeItem === index ? 1 : 0,
                        transform:
                          careState.activeItem === index ? "scale(1) translateY(0)" : "scale(0.98) translateY(10px)",
                        willChange: "transform, opacity",
                      }}
                    >
                      {careState.activeItem === 1 && (
                        <div className="text-center space-y-1 sm:space-y-3 md:space-y-4">
                          <div className="flex items-center justify-center gap-0.5 sm:gap-2">
                            <div className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <Phone className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
                            </div>
                            <div className="w-7 h-7 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-primary/30 flex items-center justify-center">
                              <Phone className="w-3.5 h-3.5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary" />
                            </div>
                            <div className="w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-primary/40 flex items-center justify-center">
                              <Phone className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-bold text-foreground">
                            {t("care.visual2.title")}
                          </h3>
                          <p className="text-[8px] sm:text-sm text-muted-foreground">{t("care.visual2.desc")}</p>
                        </div>
                      )}
                      {careState.activeItem === 2 && (
                        <div className="text-center space-y-1 sm:space-y-3 md:space-y-4">
                          <div className="w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <Smartphone className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" />
                          </div>
                          <h3 className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-bold text-foreground">
                            {t("care.visual3.title")}
                          </h3>
                          <p className="text-[8px] sm:text-sm text-muted-foreground">{t("care.visual3.desc")}</p>
                        </div>
                      )}
                      {careState.activeItem === 3 && (
                        <div className="text-center space-y-1 sm:space-y-3 md:space-y-4">
                          <div className="w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-primary" />
                          </div>
                          <h3 className="text-[10px] sm:text-base md:text-xl lg:text-2xl font-bold text-foreground">
                            {t("care.visual4.title")}
                          </h3>
                          <p className="text-[8px] sm:text-sm text-muted-foreground">{t("care.visual4.desc")}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Text content - stays in right column on all screen sizes */}
            <div className="w-full space-y-1 sm:space-y-3 md:space-y-4 lg:space-y-6 relative min-h-[100px] sm:min-h-[180px] md:min-h-[220px] lg:min-h-[300px]">
              <h2 className="text-[10px] sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground text-balance">
                {t("care.title")}
              </h2>

              <div className="relative">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    style={{
                      transition: "opacity 250ms ease-in-out, transform 250ms ease-in-out",
                      position: careState.activeItem === index ? "relative" : "absolute",
                      opacity: careState.activeItem === index ? 1 : 0,
                      transform: careState.activeItem === index ? "translateX(0)" : "translateX(15px)",
                      pointerEvents: careState.activeItem === index ? "auto" : "none",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className="space-y-1 sm:space-y-3 md:space-y-4 lg:space-y-6">
                      <p className="text-[8px] sm:text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                        {t(`care.desc${index + 1}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="sm"
                className="shadow-lg w-full text-[8px] sm:text-sm md:text-base lg:text-base mt-1 sm:mt-3 md:mt-4 h-6 sm:h-9 px-2 sm:px-4"
              >
                <Link href="/care">{t("care.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section
        ref={techSectionRef}
        className={`relative flex items-center justify-center min-h-screen overflow-x-hidden ${
          techState.isLocked && !isMobile ? "sticky top-0 z-30" : "z-30"
        }`}
        style={{
          backgroundColor: "white",
          isolation: "isolate",
          contain: "layout style paint",
          transition: "none",
          willChange: techState.isLocked ? "transform" : "auto",
        }}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 py-6 lg:py-10 w-full">
          <div className="mb-3 lg:mb-6 text-center">
            <span className="rounded-full border border-green-600/40 bg-green-600/10 backdrop-blur-sm px-2 sm:px-6 py-1 sm:py-2 text-[9px] sm:text-sm font-medium text-green-700">
              {t("tech.badge")}
            </span>
          </div>

          <div className="grid grid-cols-[45px_1fr_75px] sm:grid-cols-[120px_1fr_180px] md:grid-cols-[200px_1fr_280px] lg:grid-cols-[280px_1fr_380px] xl:grid-cols-[300px_1fr_400px] gap-1 sm:gap-4 md:gap-6 lg:gap-8 items-start lg:items-center w-full">
            {/* Left: Numbered list - clickable */}
            <div className="w-full space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 lg:pl-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  onClick={() => handleTechItemClick(index)}
                  className={`flex items-center gap-1 sm:gap-3 md:gap-4 group cursor-pointer transition-all duration-300 ease-out ${techState.activeItem === index ? "scale-105" : ""}`}
                  style={{ willChange: "transform" }}
                >
                  <div
                    className={`w-4 h-4 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${techState.activeItem === index ? "bg-green-600 shadow-lg shadow-green-600/30" : "bg-green-600/10 group-hover:bg-green-600/20"}`}
                  >
                    <span
                      className={`text-[8px] sm:text-sm md:text-base lg:text-lg font-bold transition-colors ${techState.activeItem === index ? "text-white" : "text-green-600/50 group-hover:text-green-600/70"}`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <span
                    className={`text-[8px] sm:text-sm md:text-base lg:text-lg transition-colors hidden sm:inline ${techState.activeItem === index ? "text-foreground font-semibold" : "text-muted-foreground group-hover:text-foreground"}`}
                  >
                    {t(`tech.item${index + 1}`)}
                  </span>
                </div>
              ))}

              <div className="mt-1 sm:mt-3 md:mt-4 rounded-lg sm:rounded-xl border border-green-600/20 bg-green-600/5 backdrop-blur-sm p-1 sm:p-2 md:p-3 hidden sm:block">
                <div className="flex items-start gap-1 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-green-600/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-1 h-1 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  </div>
                  <p className="text-[8px] sm:text-[10px] md:text-xs text-green-900/80 leading-relaxed">
                    {t("tech.deployment")}
                  </p>
                </div>
              </div>
            </div>

            {/* Center: Visual content - stays in middle column on all screen sizes */}
            <div className="w-full flex flex-col gap-6 items-center justify-center relative min-h-[100px] sm:min-h-[180px] md:min-h-[250px] lg:min-h-[350px]">
              <div className="w-full max-w-full lg:max-w-md mx-auto lg:absolute lg:inset-0 flex items-center justify-center">
                {techState.activeItem === 0 && (
                  <div
                    className="w-full glass-subtle rounded-lg lg:rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-2 sm:p-4 md:p-6 lg:p-8 shadow-xl flex items-center justify-center"
                    style={{
                      transition: "opacity 250ms ease-in-out, transform 250ms ease-in-out",
                      opacity: techState.activeItem === 0 ? 1 : 0,
                      transform: techState.activeItem === 0 ? "scale(1) translateY(0)" : "scale(0.98) translateY(10px)",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className="text-center space-y-1 sm:space-y-2 md:space-y-3">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto rounded-full bg-green-600/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-green-600" />
                      </div>
                      <h3 className="text-[10px] sm:text-sm md:text-lg lg:text-xl font-bold text-foreground">
                        {t("tech.visual1.title")}
                      </h3>
                      <p className="text-[8px] sm:text-xs md:text-sm text-muted-foreground">{t("tech.visual1.desc")}</p>
                    </div>
                  </div>
                )}
              </div>

              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="w-full max-w-full lg:max-w-md mx-auto lg:absolute lg:inset-0 flex items-center justify-center"
                >
                  {techState.activeItem === index && (
                    <div
                      className="w-full glass-subtle rounded-lg lg:rounded-2xl border border-border/40 bg-card/90 backdrop-blur-lg p-2 sm:p-4 md:p-6 lg:p-8 shadow-xl flex items-center justify-center"
                      style={{
                        transition: "opacity 250ms ease-in-out, transform 250ms ease-in-out",
                        opacity: techState.activeItem === index ? 1 : 0,
                        transform:
                          techState.activeItem === index ? "scale(1) translateY(0)" : "scale(0.98) translateY(10px)",
                        willChange: "transform, opacity",
                      }}
                    >
                      {techState.activeItem === 1 && (
                        <div className="text-center space-y-1 sm:space-y-2 md:space-y-3">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto rounded-full bg-green-600/10 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-green-600" />
                          </div>
                          <h3 className="text-[10px] sm:text-sm md:text-lg lg:text-xl font-bold text-foreground">
                            {t("tech.visual2.title")}
                          </h3>
                          <p className="text-[8px] sm:text-xs md:text-sm text-muted-foreground">
                            {t("tech.visual2.desc")}
                          </p>
                        </div>
                      )}
                      {techState.activeItem === 2 && (
                        <div className="text-center space-y-1 sm:space-y-2 md:space-y-3">
                          <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto rounded-full bg-green-600/10 flex items-center justify-center">
                            <Smartphone className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-green-600" />
                          </div>
                          <h3 className="text-[10px] sm:text-sm md:text-lg lg:text-xl font-bold text-foreground">
                            {t("tech.visual3.title")}
                          </h3>
                          <p className="text-[8px] sm:text-xs md:text-sm text-muted-foreground">
                            {t("tech.visual3.desc")}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Text content - stays in right column on all screen sizes */}
            <div className="w-full space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 relative min-h-[100px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[250px]">
              <h2 className="text-[10px] sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground text-balance">
                {t("tech.title")}
              </h2>

              <div className="relative">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    style={{
                      transition: "opacity 250ms ease-in-out, transform 250ms ease-in-out",
                      position: techState.activeItem === index ? "relative" : "absolute",
                      opacity: techState.activeItem === index ? 1 : 0,
                      transform: techState.activeItem === index ? "translateX(0)" : "translateX(15px)",
                      pointerEvents: techState.activeItem === index ? "auto" : "none",
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
                      <p className="text-[8px] sm:text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed">
                        {t(`tech.desc${index + 1}`)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="sm"
                className="shadow-lg w-full text-[8px] sm:text-sm md:text-base lg:text-base mt-1 sm:mt-2 md:mt-3 bg-green-600 hover:bg-green-700 h-6 sm:h-9 px-2 sm:px-4"
              >
                <Link href="/mobility">{t("tech.cta")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 pb-20 relative z-20" style={{ paddingTop: "8rem" }}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <span className="rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm px-6 py-2 text-sm font-medium text-primary">
                {t("section.services")}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("services.title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto text-balance">
              {t("services.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-2xl border border-border/40 bg-card/70 backdrop-blur-lg p-8 shadow-xl transition-all hover:shadow-2xl hover:border-border/60 hover:bg-card/80"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent/80 backdrop-blur-sm shadow-md">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground text-center">
                    {feature.description}
                  </p>
                  <ul className="mb-8 space-y-3 flex-grow w-full">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-3 text-sm text-foreground">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="gap-2 p-0 self-start" asChild>
                    <Link href="/contact" className="inline-flex items-center gap-2">
                      {t("services.readMore")}
                      <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                    </Link>
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section with smooth gradient transition */}
      <section className="relative z-10">
        {/* Gradient transition overlay */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-blue-900/20 to-blue-900/60 pointer-events-none" />

        <div className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="mb-6">
              <span className="rounded-full border border-blue-400/40 bg-blue-400/10 backdrop-blur-sm px-6 py-2 text-sm font-medium text-blue-100">
                {t("cta.badge")}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
              {t("cta.title")}
            </h2>

            <div className="space-y-2 mb-8">
              <p className="text-base md:text-lg text-blue-100/90 text-balance">{t("cta.subtitle1")}</p>
              <p className="text-base md:text-lg text-blue-100/90 text-balance">{t("cta.subtitle2")}</p>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-2xl transition-all px-8"
            >
              <Link href="/contact">
                {t("cta.button")}
                <ChevronDown className="ml-2 h-5 w-5 rotate-[-90deg]" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
