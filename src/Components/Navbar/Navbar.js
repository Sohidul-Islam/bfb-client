import React from 'react'
import NavItem from '../NavItem/NavItem'

const Navbar = () => {

    const navItem = [
        {
            id: 1,
            name: "Home",
            path: "https://bfb.org.bd",
        },
        {
            id: 2,
            name: "Check online payment",
            path: "/check-online-payment",
        },
        {
            id: 3,
            name: "Make a donation",
            path: "/make-a-donation",
        },
        {
            id: 4,
            name: "Certificate verification",
            path: "/",
        }

    ]
    return (
        <div className="navbar shadow-md bg-[#334154] p-4 my-2">
            <NavItem navItem={navItem} />
        </div>
    )
}

export default Navbar