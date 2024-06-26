'use client'
import { useParams, useRouter } from 'next/navigation'

import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { MODULES } from '@/shared/constants/submodules'
import React, { FC, useEffect } from 'react'

interface AccessControlProps {
  children: React.ReactNode
}

const AccessControl: FC<AccessControlProps> = ({ children }) => {
  const { module, submodule } = useParams() as { module: string; submodule: string }
  const router = useRouter()
  const { accessModules } = UseAccountStore()

  useEffect(() => {
    const moduleEntry = Object.entries(MODULES).find(([, mod]) => mod.alias === module)

    if (!moduleEntry) {
      router.push('/not-found')
      return
    }

    const [moduleId, mod] = moduleEntry

    if (!accessModules.includes(Number(moduleId))) {
      router.push('/unauthorized')
      return
    }

    // Comprueba si el submódulo existe dentro del módulo
    const submoduleEntry = mod.submodules.find((sub) => sub.alias === submodule)
    if (!submoduleEntry) {
      router.push('/not-found')
      return
    }
  }, [module, submodule, accessModules, router])

  return <>{children}</>
}

export default AccessControl
