import { SideNavBar } from '@/core/layout/dashboard/side-navbar'
import { UserSettings } from '@/core/layout/dashboard/user-settings'

interface LayoutProps {
  children: React.ReactNode
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <SideNavBar />
        <main className="w-screen flex-1 flex-grow overflow-auto overflow-y-scroll scrollbar-hide">{children}</main>
      </div>
      <UserSettings />
    </>
  )
}

export default layout
