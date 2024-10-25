'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import PublicRoute from './PublicRoute'


type Credentials = {
  email: string;
  password: string;
}

export default function Home() {

  const router = useRouter()
  

  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
  }

  const handleLogin = () => {
    // Obtener el arreglo de usuarios del localStorage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    // Buscar el usuario en el arreglo
    const user = users.find((user: User) => user.email === credentials.email && user.password === credentials.password)
    
    if (user) {
      // Guardar el estado de inicio de sesión en localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email: user.email }))
      alert('Logged in successfully!')
      // Redirigir a la página de la aplicación
      router.push('/admin')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <PublicRoute>

      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className='md:w-2/3 lg:w-2/5'>
          <h1 
            className="text-teal-600 font-black text-3xl md:text-6xl capitalize"
          >Log in and manage your {' '}<span className="text-emerald-950">projects and data</span></h1>

          <form 
            className="my-10 bg-white border-gray-200 border shadow-2xl rounded-xl p-10"
          >
            <div className="my-5 ">
              <Label 
                className="uppercase text-gray-600 block text-lg font-bold"
                htmlFor="email"
              >Email Address</Label>
              <Input 
                id="email"
                type="email"
                name='email'
                placeholder="Email"
                className="border border-gray-300 placeholder:text-gray-500 rounded-xl bg-gray-50 h-12"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>

            <div className="my-5 ">
              <Label 
                className="uppercase text-gray-600 block text-lg font-bold"
                htmlFor="password"
              >Password</Label>
              <Input 
                id="password"
                type="password"
                name='password'
                placeholder="Password"
                className="border border-gray-300 placeholder:text-gray-500 rounded-xl bg-gray-50 h-12"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="bg-slate-900 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-900 transition-colors"
              onClick={handleLogin}
            >Login</Button>
          </form>

          <nav className="lg:flex lg:justify-between ">
            <Link
              className="block text-center my-3 text-slate-500 uppercase text-sm"
              href="/register"
            >New to this app? Sign up here</Link>

            <Link
              className="block text-center my-3 text-slate-500 uppercase text-sm"
              href="/forgot-password"
            >Forgot password?</Link>
          </nav>
        </div>
      </main>
    </PublicRoute>
  )
}
