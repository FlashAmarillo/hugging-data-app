'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PublicRoute from './PublicRoute'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email({message: "You must provide a valid email address"}),
  password: z.string().min(8, { message: "Password must be at least 8 characters."}).max(50),
})

export default function Home() {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Obtener el arreglo de usuarios del localStorage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    // Buscar el usuario en el arreglo
    const user = users.find((user: User) => user.email === values.email && user.password === values.password)
    
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

      <main className="container h-screen mx-auto pt-5 md:flex md:justify-center">
        <div className='md:w-3/4 lg:w-2/5'>
          <h1 
            className="text-teal-600 font-black text-3xl md:text-6xl capitalize"
          >Log in and manage your {' '}<span className="text-emerald-950">projects and data</span></h1>

          <Form {...form}>
            <form 
              className="my-10 mx-auto bg-white border-gray-200 border shadow-2xl rounded-xl p-10"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='my-5'>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className='my-5'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="bg-slate-900 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-900 transition-colors"
              >Login</Button>
            </form>
          </Form>

          <nav className="md:flex md:justify-between ">
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
