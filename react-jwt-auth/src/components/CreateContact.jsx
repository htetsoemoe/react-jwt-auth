import Cookies from 'js-cookie'
import React from 'react'
import { useCreateContactMutation } from '../redux/api/contactApi'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { Loader, TextInput } from '@mantine/core'

const CreateContact = () => {
    // get login user token from cookie
    const token = Cookies.get('token')
    const [CreateContact, { isLoading }] = useCreateContactMutation()
    const navigate = useNavigate()

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
        },

        validate: {
            name: (value) => value.length < 4 ? "Name must have at least 4 letters" : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            phone: (value) => value.length < 9 ? "Phone must have at least 9 letters" : null,
            address: (value) => value.length < 10 ? "Address must have at least 10 letters" : null,
        },
    });

    return (
        <div className='flex justify-center items-center h-screen'>
            <form onSubmit={form.onSubmit(async (values) => {
                try {
                    const { data } = await CreateContact({ token, contact: values })
                    console.log(data)
                    console.log(values)
                    if (data?.success === true) {
                        navigate('/')
                    }
                } catch (error) {
                    console.log(error)
                }
            })} className='flex flex-col w-96 gap-7 shadow-lg p-7'>

                <h2 className="text-gray-900 text-3xl font-semibold">Create Contact</h2>

                <TextInput name='name'
                    label='Name'
                    placeholder='Enter your name'
                    {...form.getInputProps('name')} />

                <TextInput name='email'
                    label='Email'
                    placeholder='Enter your email'
                    {...form.getInputProps('email')} />

                <TextInput name='phone'
                    label='Phone'
                    placeholder='Enter your phone'
                    {...form.getInputProps('phone')} />

                <TextInput name='address'
                    label='Address'
                    placeholder='Enter your address'
                    {...form.getInputProps('address')} />

                <Link to={'/'}>
                    <p className="cursor-pointer hover:underline select-none text-cyan-900">Dashboard</p>
                </Link>

                <button
                    disabled={isLoading && true}
                    type='submit'
                    className="px-5 py-2 bg-cyan-900 text-white rounded">
                    {isLoading ? (<Loader className='mx-auto block' />) : "Create Contact"}
                </button>
            </form>
        </div>
    )
}

export default CreateContact
