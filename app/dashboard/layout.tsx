import { SideNavBar } from '@/core/layout/dashboard/side-navbar'
import { RouterProvider } from '@/core/layout/route-protector'

interface LayoutProps {
  children: React.ReactNode
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <RouterProvider>
        <div className="flex h-screen overflow-hidden">
          <SideNavBar />
          <main className="w-screen flex-1 flex-grow overflow-auto overflow-y-scroll scrollbar-hide">{children}</main>
        </div>
      </RouterProvider>
    </>
  )
}

export default layout
