import { SideNavBar } from '@/core/layout/dashboard/side-navbar'

interface LayoutProps {
  children: React.ReactNode
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNavBar />
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}

export default layout
