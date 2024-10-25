'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function ProtectedRute ({ children }: { children: React.ReactNode }) {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const loggedInUser = localStorage.getItem('loggedInUser')
    
    if (!isLoggedIn || !loggedInUser) {
      router.push('/')
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return null
  }

  return <>{children}</>
  
}