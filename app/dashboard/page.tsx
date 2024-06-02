'use client'

import { LoginView } from '@/features/auth/presentation/views/login-view'

const page = () => {
  return (
    <div className="overflow-y-scroll rounded-lg p-8">
      <LoginView />
    </div>
  )
}

export default page
