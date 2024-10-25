'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, ChangeEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import PublicRoute from '../PublicRoute'
// import { useToast } from "@/hooks/use-toast"

export default function Register() {

  const router = useRouter()
  // const { toast } = useToast()

  type newAccount = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [createUser, setCreateUser] = useState<newAccount>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateUser({
        ...createUser,
        [e.target.name]: e.target.value
    });
  }

  const handleRegister = () => {
    // Validaciones de los campos, como verificar si las contraseñas coinciden
    if (createUser.password !== createUser.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Obtener el arreglo de usuarios del localStorage
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]')

    // Añadir el nuevo usuario al arreglo
    users.push({
      name: createUser.name,
      email: createUser.email,
      password: createUser.password
    });

    // Guardar el nuevo arreglo de usuarios en el localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registered successfully! Please log in.');

    // Redirigir a la página principal para iniciar sesión
    router.push('/')

    // TODO: disparamos un toast para notificar que se ha creado la cuenta
    // toast({
    //   title: "Congratulations! you have created your account",
    //   description: "Enjoy the app",
    // })
  }

  return (
    <PublicRoute>

      <main className="container mx-auto mt-5 md:mt-12 p-5 md:flex md:justify-center">
        
        <div className='md:w-3/4 lg:w-3/5'>
        
          <h1 
            className="text-teal-600 font-black text-2xl md:text-4xl capitalize"
          >Create your account and manage your {' '}<span className="text-emerald-950">projects and data</span></h1>
          
          <form 
            className="my-10 bg-white border-gray-200 border shadow-2xl rounded-xl p-10"
            // onSubmit={handleSubmit}
          >
            <div className="my-5 ">
              <Label 
                className="uppercase text-gray-600 block text-lg font-bold"
                htmlFor="nombre"
              >Name</Label>
              <Input 
                id="name"
                type="text"
                name='name'
                placeholder="Your name"
                className="border border-gray-300 placeholder:text-gray-500 rounded-xl bg-gray-50 h-12"
                value={createUser.name}
                onChange={handleChange}
              />
            </div>

            <div className="my-5 ">
              <Label 
                className="uppercase text-gray-600 block text-lg font-bold"
                htmlFor="email"
              >Email</Label>
              <Input 
                id="email"
                type="email"
                name='email'
                placeholder="Email address"
                className="border border-gray-300 placeholder:text-gray-500 rounded-xl bg-gray-50 h-12"
                value={createUser.email}
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
                value={createUser.password}
                onChange={handleChange}
              />
            </div>

            <div className="my-5 ">
              <Label 
                className="uppercase text-gray-600 block text-lg font-bold"
                htmlFor="password2"
              >Repeat Password</Label>
              <Input 
                id="password2"
                type="password"
                name='confirmPassword'
                placeholder="Repeat your Password"
                className="border border-gray-300 placeholder:text-gray-500 rounded-xl bg-gray-50 h-12"
                value={createUser.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              className="bg-slate-900 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-900 transition-colors"
              onClick={handleRegister}
            >Create account</Button>

          </form>

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