// SideNavBar.tsx
'use client'

import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { IModule } from '@/shared/interfaces/IModule'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { Nav } from './nav'

export const SideNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { user, getSubmodules, accessModules } = UseAccountStore()

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const modules = user ? getSubmodules(accessModules) : []

  console.log(accessModules)
  return (
    <div className="relative min-w-[80px] border-r border-secondary pb-10 pt-14">
      <div className="absolute right-[-20px] top-7">
        <Button variant={'secondary'} className="rounded-full p-2" onClick={toggleCollapse}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <div className="h-full overflow-y-scroll scrollbar-hide">
        {user && <Nav isCollapsed={isCollapsed} modules={modules as IModule[]} />}
      </div>
    </div>
  )
}
