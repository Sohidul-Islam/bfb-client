import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavBar from '../AdminNavBar/AdminNavBar'
import logo from '../../assets/logo.png'
import Footer from '../Footer/Footer'
const Admin = () => {
    const NavItem = [
        {
            id: 1,
            name: "Dashboard",
            path: "/admin/"
        },
        {
            id: 2,
            name: "Add Certificate",
            path: "/admin/add-certificate"
        },
        {
            id: 3,
            name: "Make Admin",
            path: "/admin/make-admin"
        },
        {
            id: 4,
            name: "Add Payment",
            path: "/admin/add-payment"
        },
        {
            id: 5,
            name: "Client Section",
            path: "/"
        },
    ]
    return (
        <div>
            <img className="mx-auto h-[150px]" src={logo}>
            </img>
            <h1 className='text-center text-[28px] my-4 font-bold'>Admin portal</h1>
            <div className="navbar shadow-md bg-[#334154] p-4 my-2">
                <AdminNavBar navItem={NavItem} />
            </div>

            <Outlet />
            {/* <Footer /> */}
        </div>

    )
}

export default Admin