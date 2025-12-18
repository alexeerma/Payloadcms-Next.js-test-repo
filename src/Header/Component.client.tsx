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

  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // reset header theme on route change
  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const isDark = theme === 'dark'
  const isLight = theme === 'light'
  const menuButtonColor = isDark ? '#fff' : '#000'
  const openMenuButtonColor = isDark ? '#000' : '#000'

  return (
    <div {...(theme ? { 'data-theme': theme } : {})}>
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
