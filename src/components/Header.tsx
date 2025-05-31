'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { BellIcon } from "lucide-react"
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
import type { LoggedInUser, NotificationEntry } from '@/types'

  
export default function Header({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter()
  const loggedInUser: LoggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
  
  const notifications: NotificationEntry[] = [
    {
      text: "This is a notification",
      date: "02/01/2024",
      read: true
    },
    {
      text: "This is another notification",
      date: "02/03/2024",
      read: false
    }
  ]

  const handleLogout = ():void => {

    // Eliminar datos de la sesión de localStorage
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('loggedInUser')

    // Redirigir a la página de inicio
    router.push('/')
  }

  //TODO: ARREGLAR LA LUZ VERDE ARRIBA DE LAS NOTIFICACIONES
  //TODO: añadir modo oscuro

  return (
    <header className="border-b border-gray-100">
      <div className="pr-6 flex h-16 justify-between">
        <div className="flex items-center h-auto px-4">
          {children}
        </div>
        <div className="flex gap-6 items-center">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="">
                      <div className={`absolute top-1 right-40 h-2 w-2 rounded-full my-1 ${notifications.find((x: NotificationEntry) => x.read === true) ? 'bg-green-500' : 'bg-neutral-200'}`}></div>
                      <BellIcon className="h-4 w-4" /> 
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {notifications.map((item: NotificationEntry, key: number) => (
                  <DropdownMenuItem key={key} className="py-2 px-3 cursor-pointer hover:bg-neutral-50 transition flex items-start gap-2">
                      <div className={`h-3 w-3 rounded-full my-1 ${!item.read ? 'bg-green-500' : 'bg-neutral-200'}`}></div>
                      <div>
                          <p>{item.text}</p>
                          <p className="text-xs text-neutral-500">{item.date}</p>
                      </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'}>
                {loggedInUser.name}
                <Avatar className='h-7 w-7'>
                  <AvatarImage src="https://i.pinimg.com/736x/fe/2b/33/fe2b3325ebaee961fa821480671c7919.jpg" alt="@shadcn" />
                  <AvatarFallback>{loggedInUser.name}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
