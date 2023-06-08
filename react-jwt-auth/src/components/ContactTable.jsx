import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useDeleteContactMutation, useGetContactsQuery } from '../redux/api/contactApi'
import { Table, TextInput, Menu, Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addContacts, setSearchText } from '../redux/services/contactSlice'
import Swal from 'sweetalert2'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'

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
    const searchText = useSelector(state => state.contactSlice.searchText) // get search text from global storage
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
    const rows = contacts?.filter(contact => {
        if (searchText === "") {
            return contact
        } else if (contact?.name.toLowerCase().includes(searchText?.toLowerCase())) {
            return contact
        }
    }).map((contact) => {
        return (
            <tr key={contact?.id}>
                <td>{contact?.name}</td>
                <td>{contact?.email === null ? 'example@gmail.com' : contact?.email}</td>
                <td>{contact?.phone}</td>
                <td>{contact?.address === null ? 'Middle of Somewhere' : contact?.address}</td>
                <td>
                    <Menu width={200} shadow="md">
                        <Menu.Target>
                            <Button variant='outline'>
                                <MdOutlineArrowDropDownCircle className=""/>
                            </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item>
                                <p onClick={() => deleteHandler(contact?.id)} className='cursor-pointer text-red-900'>
                                    Delete
                                </p>
                            </Menu.Item>

                            <Link to={`/details/${contact?.id}`}>
                                <Menu.Item>
                                    <p>
                                        User Details
                                    </p>
                                </Menu.Item>
                            </Link>
                        </Menu.Dropdown>
                    </Menu>
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
                    value={searchText}
                    onChange={event => dispatch(setSearchText(event.target.value))}
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
