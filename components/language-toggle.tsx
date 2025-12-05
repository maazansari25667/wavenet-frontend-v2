'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/hooks/use-language'
import type { ComponentProps } from 'react'

type ButtonProps = ComponentProps<typeof Button>

type LanguageToggleProps = {
  className?: string
  showLabel?: boolean
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export function LanguageToggle({
  className,
  showLabel = true,
  variant = 'ghost',
  size = 'sm',
}: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()
  const targetLanguage = language === 'sv' ? 'en' : 'sv'
  const label = targetLanguage.toUpperCase()

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={() => setLanguage(targetLanguage)}
      aria-label={targetLanguage === 'en' ? 'Switch to English' : 'Byt till svenska'}
      className={cn('gap-2 text-muted-foreground hover:text-foreground', className)}
    >
      <Flag code={targetLanguage === 'en' ? 'gb' : 'se'} />
      {showLabel && <span className="text-sm font-medium hidden sm:inline">{label}</span>}
    </Button>
  )
}

function Flag({ code }: { code: 'gb' | 'se' }) {
  if (code === 'se') {
    return (
      <span className="inline-block w-6 h-4 relative rounded-[2px] overflow-hidden" aria-hidden="true">
        <span className="absolute inset-0 rounded-[2px]" style={{ backgroundColor: '#006AA7' }} />
        <span
          className="absolute top-0 bottom-0"
          style={{ left: '35%', width: '15%', backgroundColor: '#FECC00' }}
        />
        <span
          className="absolute left-0 right-0"
          style={{ top: '40%', height: '20%', backgroundColor: '#FECC00' }}
        />
      </span>
    )
  }

  return (
    <span className="inline-block w-6 h-4 relative rounded-[2px] overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 70 30"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full rounded-[2px]"
        focusable="false"
      >
        <rect width="70" height="30" fill="#012169" />
        <path d="M0 0 L70 30" stroke="#fff" strokeWidth="6" />
        <path d="M70 0 L0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0 L70 30" stroke="#C8102E" strokeWidth="3.5" />
        <path d="M70 0 L0 30" stroke="#C8102E" strokeWidth="3.5" />
        <rect x="29" width="12" height="30" fill="#fff" />
        <rect y="11" width="70" height="8" fill="#fff" />
        <rect x="32" width="6" height="30" fill="#C8102E" />
        <rect y="13" width="70" height="4" fill="#C8102E" />
      </svg>
    </span>
  )
}
