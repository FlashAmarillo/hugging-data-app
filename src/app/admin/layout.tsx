import ProtectedRute from "./ProtectedRute"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import Header from "@/components/Header"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProtectedRute>
      <SidebarProvider>
        <AppSidebar/>
        <main className="grid min-h-dvh grid-rows-[auto_1fr_auto] w-full overflow-x-hidden">
          <Header>
            <SidebarTrigger />
          </Header>
          <div className="w-full overflow-x-hidden">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRute>
  )
}