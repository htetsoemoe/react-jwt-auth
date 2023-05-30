import React, { useState } from 'react'
import { PasswordInput, TextInput, em } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../redux/api/authApi'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password_confirmation, setPasswordConfirmation] = useState("")

  const [register] = useRegisterMutation()

  // When registration is success, navigate to login
  const navigate = useNavigate()

  // Submit event handler
  const registerHandler = async (event) => {
    try {
      event.preventDefault()
      const user = { name, email, password, password_confirmation }
      const {data} = await register(user) // returns Promise Object, need to use object destructing
      console.log(data)

      if (data?.success === true) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={registerHandler}
          className="flex flex-col w-[500px] gap-10 p-5 shadow-lg">
        <h2 className="text-cyan-950 text-3xl font-semibold">Register</h2>
        <TextInput value={name} onChange={e => setName(e.target.value)}
          label='Name' withAsterisk placeholder='Enter your name' />

        <TextInput value={email} onChange={e => setEmail(e.target.value)}
          label='Email' withAsterisk placeholder='Enter your email' />

        <PasswordInput value={password} onChange={e => setPassword(e.target.value)}
          label='Password' withAsterisk placeholder='Enter password' />

        <PasswordInput value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)}
          label='Confirm Password' withAsterisk placeholder='Confirm password' />

        <div className="flex gap-7">
          <p className="select-none text-cyan-900">Already have an account?</p>
          <Link to={'/login'}>
            <p className="cursor-pointer hover:underline select-none text-cyan-900">Login</p>
          </Link>
        </div>

        <button type="submit"
          className='px-5 py-2 bg-cyan-900 text-white rounded'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Register
