import { Loader, PasswordInput, TextInput } from '@mantine/core'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/api/authApi'
import { useDispatch } from 'react-redux'
import { addUser } from '../redux/services/authSlice'
import { useForm } from '@mantine/form';

const Login = () => {

  // if login is success, navigate to 'Dashboard' component
  const navigate = useNavigate()

  // use login api from rtk store
  const [login, { isLoading }] = useLoginMutation()

  // for adding successful login user to global state using authSlice's reducer
  const dispatch = useDispatch()

  const form = useForm({
    initialValues: {
      email: 'testing123@gmail.com',
      password: '123456789',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => value.length < 8 ? "Password must have at least 8 letters" : null,
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={form.onSubmit(async (values) => {
        try {
          const { data } = await login(values) // returns promise, we need to use object destructuring
          console.log(data)
          console.log(values)

          // adding successful login user to global state using authSlice's reducer
          dispatch(addUser({ user: data?.user, token: data?.token }))

          // If login success, navigate to dashboard
          if (data?.success === true) {
            navigate("/")
          }
        } catch (error) {
          console.log(error)
        }
      })} className='flex flex-col w-[500px] gap-10 p-5 shadow-lg'>

        <h2 className="text-gray-900 text-2xl font-semibold">Login</h2>

        <TextInput
          name='email'
          {...form.getInputProps('email')}
          placeholder='Enter your email' />

        <PasswordInput
          name='password'
          {...form.getInputProps('password')}
          placeholder='Enter your password' />

        <div className="flex gap-7">
          <p className='select-none text-zinc-800'>Are you a new user?</p>
          <Link to={'/register'}>
            <p className="cursor-pointer hover:underline select-none text-cyan-900">Register</p>
          </Link>
        </div>

        <button type="submit"
          disabled={isLoading && true}
          className='px-5 py-2 bg-cyan-900 text-white rounded'>
          {isLoading ? (<Loader className='mx-auto block' />) : "Login"}
        </button>

      </form>
    </div>
  )
}

export default Login