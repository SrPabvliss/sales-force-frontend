import { SideNavBar } from '@/core/layout/dashboard/side-navbar'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavBar />
      <main className="w-screen flex-1 flex-grow overflow-auto overflow-y-scroll scrollbar-hide">{children}</main>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default layout
