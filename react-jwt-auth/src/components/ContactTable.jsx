import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useDeleteContactMutation, useGetContactsQuery } from '../redux/api/contactApi'
import { Table, TextInput } from '@mantine/core'
import { Await, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addContacts } from '../redux/services/contactSlice'
import Swal from 'sweetalert2'

const ContactTable = () => {
    // Get login user token from Cookie
    const token = Cookies.get("token")

    // query all contacts from server using 'getContact' api from contactApi
    const { data, isLoading } = useGetContactsQuery(token) // data is a promise object
    console.log(data?.contacts?.data)

    // deleteContact for delete specified contact with id
    const [deleteContact] = useDeleteContactMutation()

    // use contactSlice for store contact data in global state
    const dispatch = useDispatch()

    // after 'componentDidMounted' lifecycle method called fetched data to store in global state using contactSlice
    useEffect(() => {
        dispatch(addContacts(data?.contacts?.data))
    }, [data])

    const contacts = useSelector(state => state.contactSlice.contacts) // get contacts from global storage
    console.log(contacts);

    // delete contact with sweetalert2 confirm box and deleteContact mutation from authApi
    const deleteHandler = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                const data = await deleteContact({ id, token })// Get login user token from Cookie
            }
        })

    }


    // create rows for contacts
    const rows = contacts?.map((contact) => {
        return (
            <tr key={contact?.id}>
                <td>{contact?.name}</td>
                <td>{contact?.email === null ? 'example@gmail.com' : contact?.email}</td>
                <td>{contact?.phone}</td>
                <td>{contact?.address === null ? 'Mandalay, Myanmar.' : contact?.address}</td>
                <td>
                    <button onClick={async () => await deleteHandler(contact?.id)}
                        className="my-3 mx-14 bg-red-900 text-white px-7 py-1 rounded">
                        Delete
                    </button>
                </td>
            </tr>
        )
    })

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-3xl font-semibold">Loading...</h2>
            </div>
        )
    }

    return (
        <>
            <div className="flex items-center">
                <Link to={'/create'}>
                    <button className="my-5 mx-16 bg-cyan-900 text-white px-7 py-1 rounded">
                        Create Contact
                    </button>
                </Link>

                <TextInput
                    placeholder='Search Contact'
                />
            </div>

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
                        {rows}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ContactTable
