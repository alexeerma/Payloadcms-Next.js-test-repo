'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { StaggeredMenu } from '@/components/StaggeredMenu/StaggeredMenu'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Mark as mounted after hydration to avoid SSR/client mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // reset header theme on route change
  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Always read document theme for menu button color (not headerTheme override)
  // headerTheme is for header styling, but menu button should match document theme
  useEffect(() => {
    if (!mounted) return

    const readDocumentTheme = () => {
      if (typeof document !== 'undefined') {
        const docTheme = document.documentElement.getAttribute('data-theme') as string | null
        setTheme(docTheme)
      }
    }

    // Read immediately
    readDocumentTheme()

    // Watch for theme changes on document
    const observer = new MutationObserver(readDocumentTheme)
    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      })
    }

    return () => observer.disconnect()
  }, [mounted])

  // Use headerTheme for data-theme attribute (header styling), but document theme for menu button
  const effectiveTheme = mounted ? (headerTheme || theme) : null
  // Menu button color should always use document theme, not headerTheme override
  const documentThemeForButton = mounted ? theme : null

  const isDark = documentThemeForButton === 'dark'
  const isLight = documentThemeForButton === 'light'
  const isHomePage = pathname === '/'
  // On homepage, always use white menu button; otherwise use theme-based color
  const menuButtonColor = isHomePage ? '#fff' : isDark ? '#fff' : '#000'
  const openMenuButtonColor = isDark ? '#000' : '#000'

  return (
    <div {...(effectiveTheme ? { 'data-theme': effectiveTheme } : {})}>
      <StaggeredMenu
        navItems={data.navItems}
        isFixed={true}
        accentColor={'#15beb3'}
        menuButtonColor={menuButtonColor}
        openMenuButtonColor={openMenuButtonColor}
        isLightTheme={isLight}
        socialItems={[
          { label: 'GitHub', link: 'https://github.com' },
          { label: 'LinkedIn', link: 'https://linkedin.com' },
        ]}
      />
    </div>
  )
}
