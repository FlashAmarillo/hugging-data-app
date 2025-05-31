'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { ChevronUp, LayoutDashboard, Cookie, MessageSquare } from "lucide-react"
import type { LoggedInUser } from '@/types'

export default function AppSidebar() {

  const router = useRouter()
  const loggedInUser: LoggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')

  const handleLogout = ():void => {

    // Eliminar datos de la sesión de localStorage
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('loggedInUser')

    // Redirigir a la página de inicio
    router.push('/')
  }

  const menuItems = [
    {
        group: "General",
        options: [
            {
                link: "/admin",
                icon: <LayoutDashboard color="#1e293b" />,
                title: "Dashboard"
            }
        ]
    },
    {
        group: "User Settings",
        options: [
            {
                link: "/admin",
                icon: <Cookie color="#1e293b" />,
                title: "Privacy"
            },
            {
                link: "/admin",
                icon: <MessageSquare color="#1e293b" />,
                title: "Notifications"
            }
        ]
    }
  ]

  return(
    <Sidebar>
      <SidebarHeader />

      <SidebarContent>
        {
          menuItems.map((menuItem, index) => (
            <SidebarGroup key={index}>
              <SidebarGroupLabel>{menuItem.group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {
                    menuItem.options.map((optionItem, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild>
                          <Link href={optionItem.link}>
                            {optionItem.icon}
                            <span>{optionItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  }
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>  
          ))
        }
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className='border border-gray-200'>
                  <Avatar className='h-5 w-5'>
                    <AvatarImage src="https://i.pinimg.com/736x/fe/2b/33/fe2b3325ebaee961fa821480671c7919.jpg" alt="@shadcn" />
                    <AvatarFallback>{loggedInUser.name}</AvatarFallback>
                  </Avatar> 
                  {loggedInUser.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
