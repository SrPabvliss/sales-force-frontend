import Image from 'next/image'

import React from 'react'

import { Card, CardContent } from '@/components/ui/card'

import { AuthForm } from '../components/auth-form'

export const LoginView = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="mx-auto flex max-w-4xl items-center justify-center p-6">
        <Card className="w-full   p-8 shadow-md">
          <CardContent className="flex gap-6">
            <div>
              <h1 className="text-3xl font-bold ">Hola, Bienvenido de vuelta!</h1>
              <p className="mt-2">Inicia sesión en tu cuenta para continuar</p>
              <AuthForm />
            </div>
            <div className="hidden w-1/2 items-center justify-center lg:flex">
              <Image
                src="https://info-dns.com/assets/images/element/register-user1.svg"
                alt="Login Illustration"
                className="h-auto w-full"
                width={'500'}
                height={'500'}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
