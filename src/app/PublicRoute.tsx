'useClient'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PublicRoute({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const loggedInUser = localStorage.getItem('loggedInUser')

    if (isLoggedIn && loggedInUser) {
      router.push('/admin')
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return null 
  }

  return <>{children}</>
}