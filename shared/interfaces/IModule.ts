import { LucideIcon } from 'lucide-react'

export interface ISubmodule {
  title: string
  icon: LucideIcon
  variant: 'default' | 'ghost'
  label?: string
  alias: string
}

export interface IModule {
  title: string
  alias: string
  submodules: ISubmodule[]
}
