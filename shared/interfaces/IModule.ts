import { LucideIcon } from 'lucide-react'

export interface ISubmodule {
  title: string
  icon: LucideIcon
  variant: 'default' | 'ghost'
  label?: string
  alias: string
}

export interface IModule {
  name: string
  alias: string
  submodules: ISubmodule[]
}

export interface IApiModule {
  id: number
  name: string
  description: string
  isActive: boolean
}
