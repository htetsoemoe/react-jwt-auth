import { PasswordInput, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/api/authApi'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/services/authSlice'

const Login = () => {

  const [email, setEmail] = useState("kohtetgyi@gmail.com")
  const [password, setPassword] = useState(123456789)

  // if login is success, navigate to 'Dashboard' component
  const navigate = useNavigate()

  // use login api from rtk store
  const [login] = useLoginMutation()

  // for adding successful login user to global state using authSlice's reducer
  const dispatch = useDispatch()

  // login button handler
  const loginHandler = async (event) => {
    try {
      event.preventDefault()

      const user = { email, password }
      const { data } = await login(user); // returns promise, we need to use object destructuring
      console.log(data)

      // adding successful login user to global state using authSlice's reducer
      dispatch(addUser({ user: data?.user, token: data?.token }))

      if (data?.success === true) {
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={loginHandler}
        className="flex flex-col w-[500px] gap-10 p-5 shadow-lg">
        <h2 className="text-cyan-950 text-3xl font-semibold">Login</h2>

        <TextInput value={email} onChange={e => setEmail(e.target.value)}
          label='Email' withAsterisk placeholder='Enter your email' />

        <PasswordInput value={password} onChange={e => setPassword(e.target.value)}
          label='Password' withAsterisk placeholder='Enter password' />

        <div className="flex gap-7">
          <p className='select-none text-zinc-800'>Are you a new user?</p>
          <Link to={'/register'}>
            <p className="cursor-pointer hover:underline select-none text-cyan-900">Register</p>
          </Link>
        </div>

        <button type="submit"
          className='px-5 py-2 bg-cyan-900 text-white rounded'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
