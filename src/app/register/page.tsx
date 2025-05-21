'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import PublicRoute from '../PublicRoute'
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { User } from '@/types'

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters."}).max(50),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters."}).max(50),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters.", }).max(50)
}).refine((data) => (data.password === data.confirmPassword),{
  message: "Both passwords must be the same",
  path: ["confirmPassword"]
})


export default function Register() {

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {

    // Obtener el arreglo de usuarios del localStorage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    // Verificar si el usuario ya existe
    const userExists = users.some(user =>
      user.name === values.name &&
      user.email === values.email &&
      user.password === values.password
    )

    if (userExists) {
      toast({
        title: "User already registered",
        description: (
          <span>
            This user has already been registered.{' '}
            <Link href="/" className="underline text-blue-500">Sign in here</Link>.
          </span>
        ),
        duration: 3500
      })
      form.reset()
      return // No continuar con el registro
    }

    // Añadir el nuevo usuario al arreglo
    users.push({
      name: values.name,
      email: values.email,
      password: values.password
    })

    // Guardar el nuevo arreglo de usuarios en el localStorage
    localStorage.setItem('users', JSON.stringify(users))

    router.push('/')

  }

  return (
    <PublicRoute>

      <main className="container mx-auto mt-5 md:mt-12 md:flex md:justify-center">
        
        <div className='md:w-3/4 lg:w-3/5'>
        
          <h1 
            className="text-teal-600 font-black text-2xl md:text-4xl capitalize"
          >Create your account and manage your {' '}<span className="text-emerald-950">projects and data</span></h1>
          
          
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-10 bg-white border-gray-200 border shadow-2xl rounded-xl p-10"
            >

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className='my-4'>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input id='name' type='text' placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='my-4'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder="Email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className='my-4'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className='my-4'>
                    <FormLabel>Repeat Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Repeat your Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                className="bg-slate-900 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-900 transition-colors"
                type="submit"
              >Create Account</Button>

            </form>
          </Form>

          <nav className="lg:flex lg:justify-between ">
            <Link
              className="block text-center my-3 text-slate-500 uppercase text-sm"
              href="/"
            >Already have an account? Login here</Link>

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