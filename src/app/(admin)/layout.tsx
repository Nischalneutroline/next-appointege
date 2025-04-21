import Header from "@/components/admin/header"
import SidebarDesktop from "@/components/admin/sidebar-desktop"
import SidebarMobile from "@/components/admin/sidebar-mobile"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-stone-100">
      {/* ------ Top Background Gradient */}
      <div className="absolute inset-0 h-[30vh] rounded-b-lg z-0 pointer-events-none bg-gradient" />

      {/* Layout */}
      <div className="relative z-10 flex gap-6 p-2 md:p-4 lg:p-6">
        {/* --------- Sidebar */}
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <SidebarDesktop />
        </div>

        {/* Mobile Navbar */}
        <div className="block lg:hidden fixed top-0 w-full z-50">
          <SidebarMobile />
        </div>

        {/* ------- Content Area */}
        <div className="w-full max-h-screen overflow-y-auto space-y-4">
          {/* ------- Header */}
          <Header />

          {/* Main Content */}
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
