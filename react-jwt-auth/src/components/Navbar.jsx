import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../redux/api/authApi'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { removeUserCookie } from '../redux/services/authSlice'
import { GiPlagueDoctorProfile } from 'react-icons/gi'
import { MdEmail } from 'react-icons/md'

const Navbar = () => {
    /* Before using js-cookie, get state from rtk slice
  const { user } = useSelector(state => state.authSlice)
  const { token } = useSelector(state => state.authSlice) 
  */

    // After using js-cookie, we get user and token from browser cookie for reloading page
    const user = JSON.parse(Cookies.get("user"))
    const token = Cookies.get("token")

    const dispatch = useDispatch()  // dispatch for removeUserCookie from authSlice
    const [logout] = useLogoutMutation()
    const navigate = useNavigate()  // if logout successful, route to "login"

    // logout handler
    const logoutHandler = async () => {
        const { data } = await logout(token)
        dispatch(removeUserCookie()) // remove cookie from browser

        if (data?.success) {
            navigate('/login')
        }
    }

    return (
        <div className='flex justify-between p-5 shadow items-center'>
            <Link to={'/'}>
                <h2 className='text-2xl text-gray-950 font-semibold'>JWT Authentication</h2>
            </Link>

            <div className="flex gap-10 justify-center items-center">
                <div className='flex flex-col gap-2'>
                    <div className="flex gap-3 items-center">
                        <GiPlagueDoctorProfile /><p>{user?.name}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <MdEmail /><p>{user?.email}</p>
                    </div>

                </div>
                <button onClick={logoutHandler} className='bg-red-900 text-white px-4 py-1 rounded'>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar
