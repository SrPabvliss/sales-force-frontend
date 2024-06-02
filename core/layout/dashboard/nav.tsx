'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IModule } from '@/shared/interfaces/IModule'
import path from 'path'

import { buttonVariants } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

interface NavProps {
  isCollapsed: boolean
  modules: IModule[]
}

export function Nav({ modules, isCollapsed }: NavProps) {
  const pathname = usePathname()

  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 px-2 py-2 data-[collapsed=true]:py-2">
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex}>
            <h3 className={cn('py-2  text-lg font-semibold text-muted-foreground', isCollapsed && 'text-sm')}>
              {!isCollapsed ? module.title : module.alias.toUpperCase()}
            </h3>
            <ul className="flex flex-col gap-1 ">
              {module.submodules.map((submodule, submoduleIndex) =>
                isCollapsed ? (
                  <Tooltip key={submoduleIndex} delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={`
                        /dashboard/${module.alias}/${submodule.alias}`}
                        className={cn(
                          buttonVariants({
                            variant: pathname.includes(path.join('/dashboard', module.alias, submodule.alias))
                              ? 'default'
                              : submodule.variant,
                            size: 'icon',
                          }),
                          ' h-12 w-12  items-center justify-center ',
                          submodule.variant === 'default' &&
                            'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                        )}
                      >
                        <submodule.icon className="h-auto w-6" />
                        <span className="sr-only">{submodule.title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-4">
                      {submodule.title}
                      {submodule.label && <span className="ml-auto text-muted-foreground">{submodule.label}</span>}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <li key={submoduleIndex}>
                    <Link
                      href={`
                        /dashboard/${module.alias}/${submodule.alias}`}
                      className={cn(
                        buttonVariants({
                          variant: pathname.includes(path.join('/dashboard', module.alias, submodule.alias))
                            ? 'default'
                            : submodule.variant,
                          size: 'sm',
                        }),
                        pathname.includes(path.join('/dashboard', module.alias, submodule.alias)) &&
                          'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                        'h-12 w-full justify-start',
                      )}
                    >
                      <submodule.icon className="mr-2 h-auto w-6" />
                      {submodule.title}
                      {submodule.label && (
                        <span
                          className={cn(
                            'ml-auto',
                            submodule.variant === 'default' && 'text-background dark:text-white',
                          )}
                        >
                          {submodule.label}
                        </span>
                      )}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}
