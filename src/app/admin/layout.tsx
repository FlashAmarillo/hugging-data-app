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
        <main className="flex min-h-dvh flex-col w-screen">
          <Header>
            <SidebarTrigger />
          </Header>
          <div>
            {children}
          </div>
        </main>
      </SidebarProvider>
    </ProtectedRute>
  )
}