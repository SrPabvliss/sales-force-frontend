import { SideNavBar } from '@/core/layout/dashboard/side-navbar'

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
    </>
  )
}

export default layout
