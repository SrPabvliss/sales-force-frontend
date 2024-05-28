'use client'

import { Archive, ArchiveX, ChevronLeft, ChevronRight, File, Inbox, Send, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { Nav } from './nav'

export const SideNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div className="relative min-w-[80px] border-r border-secondary pb-10 pt-24">
      <div className="absolute right-[-20px] top-7">
        <Button variant={'secondary'} className="rounded-full p-2" onClick={toggleCollapse}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Usuarios',
            icon: Inbox,
            variant: 'default',
          },
          {
            title: 'Drafts',
            icon: File,
            variant: 'ghost',
          },
          {
            title: 'Sent',
            icon: Send,
            variant: 'ghost',
          },
          {
            title: 'Junk',
            icon: ArchiveX,
            variant: 'ghost',
          },
          {
            title: 'Trash',
            icon: Trash2,
            variant: 'ghost',
          },
          {
            title: 'Archive',
            icon: Archive,
            variant: 'ghost',
          },
        ]}
      />
    </div>
  )
}
