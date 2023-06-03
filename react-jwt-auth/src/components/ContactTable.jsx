import Cookies from 'js-cookie'
import React from 'react'
import { useGetContactsQuery } from '../redux/api/contactApi'
import { Table } from '@mantine/core'
import { Link } from 'react-router-dom'

const ContactTable = () => {
    // Get login user token from Cookie
    const token = Cookies.get("token")

    // query all contacts from server using 'getContact' api from contactApi
    const { data, isLoading } = useGetContactsQuery(token) // data is a promise object
    console.log(data?.contacts?.data)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-3xl font-semibold">Loading...</h2>
            </div>
        )
    }

    return (
        <>
            <Link to={'/create'}>
                <button className="my-5 mx-16 bg-cyan-900 text-white px-7 py-1 rounded">
                    Create Contact
                </button>
            </Link>

            <div className="container mx-auto md:container mt-5">
                <Table striped highlightOnHover withBorder horizontalSpacing="md" verticalSpacing="md" fontSize="md"
                    className='w-[95%] mx-auto table-auto'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.contacts?.data.map((contact) => {
                            return (
                                <tr key={contact?.id}>
                                    <td>{contact?.name}</td>
                                    <td>{contact?.email === null ? 'example@gmail.com' : contact?.email}</td>
                                    <td>{contact?.phone}</td>
                                    <td>{contact?.address === null ? 'Mandalay, Myanmar.' : contact?.address}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ContactTable
