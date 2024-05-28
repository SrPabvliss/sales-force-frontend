import { SideNavBar } from '@/core/layout/dashboard/side-navbar'

interface LayoutProps {
  children: React.ReactNode
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <SideNavBar />
      <main className="flex-1 p-8">{children}</main>
    </>
  )
}

export default layout
