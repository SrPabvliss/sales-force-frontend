'use client'
import { useTheme } from 'next-themes'

import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { Moon, Sun } from 'lucide-react'
import React, { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export const UserSettings = () => {
  const { setTheme, theme } = useTheme()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const { user } = UseAccountStore()
  return (
    <div className="fixed right-4 top-4 flex items-center space-x-4">
      <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="cursor-pointer" onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            <AvatarImage
              src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Aneka&backgroundType=gradientLinear,solid&backgroundColor=AD34F3&mouth=smile02"
              alt="User Avatar"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="rounded-lg border p-4 shadow-lg">
          <div className="flex flex-col ">
            <div className="flex justify-between gap-2">
              <span className="text-lg">{`${user?.person.name} ${user?.person.lastName} `}</span>
              <Badge>{user?.role}</Badge>
            </div>

            <span className="text-sm text-gray-500">{user?.person.email}</span>
          </div>
          <Button className="mt-4 w-full " onClick={() => console.log('Cerrar sesión')} variant={'outline'}>
            Cerrar sesión
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
