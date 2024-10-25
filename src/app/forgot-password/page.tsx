'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import PublicRoute from '../PublicRoute'

export default function ForgotPassword() {

  const [email, setEmail] = useState('');

  return(
    <PublicRoute>

      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">

        <div className='md:w-3/4 lg:w-3/5'>
          <h1 
            className="text-teal-600 font-black text-2xl md:text-4xl capitalize"
          >Recover your access and do not lose your {' '}<span className="text-emerald-950">projects and data</span></h1>

          <form 
            className="my-10 bg-white border-gray-200 border shadow-2xl rounded-xl p-10"
            // onSubmit={handleSubmit}
          >

            <div className="my-5 ">
              <Label 
                className="uppercase text-gray-600 block text-lg font-bold"
                htmlFor="email"
              >Email Address</Label>
              <Input 
                id="email"
                type="email"
                placeholder="Registration Email"
                className="border border-gray-300 placeholder:text-gray-500 rounded-xl bg-gray-50 h-12"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="bg-slate-900 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-sky-900 transition-colors"
            >Send Instructions</Button>
          </form>

          <nav className="lg:flex lg:justify-between ">
            <Link
              className="block text-center my-3 text-slate-500 uppercase text-sm"
              href="/"
            >New to this app? Login here</Link>

            <Link
              className="block text-center my-3 text-slate-500 uppercase text-sm"
              href="/register"
            >Don&apos;t have an account? Sign up here</Link>
          </nav>

        </div>
      </main>
    </PublicRoute>
  )
}