import React, { useState } from 'react'
import { Loader, PasswordInput, TextInput } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../redux/api/authApi'
import { useForm } from '@mantine/form'

const Register = () => {
  // region register from authApi
  const [register, { isLoading }] = useRegisterMutation()

  // When registration is success, navigate to login
  const navigate = useNavigate()

  // Using Mantine use-form
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },

    validate: {
      name: (value) => value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => value.length < 8 ? "Password must have at least 8 letters" : null,
      password_confirmation: (value) => value.length < 8 ? "Confirm password must equal the password" : null
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={form.onSubmit(async (values) => {
        try {
          const {data} = await register(values)
          console.log(data)
          console.log(values)

          if (data?.success === true) {
            navigate('/login')
          }
        } catch (error) {
          console.log(error)
        }
      })}
        className="flex flex-col w-[500px] gap-10 p-5 shadow-lg">
        <h2 className="text-cyan-950 text-3xl font-semibold">Register</h2>

        <TextInput name='name'
          placeholder='Enter your name'
          {...form.getInputProps('name')} />

        <TextInput name='email'
          placeholder='Enter your email'
          {...form.getInputProps('email')} />

        <PasswordInput name='password'
          placeholder='Enter your password'
          {...form.getInputProps('password')} />

        <PasswordInput name='password_confirmation'
          placeholder='Confirm your password'
          {...form.getInputProps('password_confirmation')} />
        
        <div className="flex gap-7">
          <p className="select-none text-cyan-900">Already have an account?</p>
          <Link to={'/login'}>
            <p className="cursor-pointer hover:underline select-none text-cyan-900">Login</p>
          </Link>
        </div>

        <button type="submit"
          disabled={isLoading && true}
          className='px-5 py-2 bg-cyan-900 text-white rounded'>
          {isLoading ? (<Loader className='mx-auto block'/>) : "Sign In"}
        </button>
      </form>
    </div>
  )
}

export default Register