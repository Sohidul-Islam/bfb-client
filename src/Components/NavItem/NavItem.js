import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const NavItem = ({ navItem }) => {
    const navigate = useNavigate();
    const { user, admin, logout } = useAuth();
    const signOutHandler = async () => {
        if (user?.email)
            await logout();

        navigate('/');
    }
    // {
    //     id: 5,
    //     name: "Login",
    //     path: "/login",
    // },
    return (
        <div className="flex flex-wrap flex-col md:flex-row justify-center items-center">
            {
                navItem.map((item, index) =>
                    <div key={index}>
                        < div className="px-2 mx-2 py-3 hover:rounded duration-1000 hover:bg-[#EEE6E2] hover:text-[#334154]' text-white hover:text-[#334154] inline-block">
                            < Link className='font-bold duration-200  hover:text-[#334154]' to={item.path}>{item.name}</Link>
                        </div>
                    </div>

                )
            }

            {!user?.email && < div className="px-2 mx-2 py-3 hover:rounded duration-1000 hover:bg-[#EEE6E2] hover:text-[#334154]' text-white hover:text-[#334154] inline-block" >< Link className='font-bold duration-200  hover:text-[#334154]' to="/login">Login</Link></div>}
            {user?.email && admin === true && < div className="px-2 mx-2 py-3 hover:rounded duration-1000 hover:bg-[#EEE6E2] hover:text-[#334154]' text-white hover:text-[#334154] inline-block" >< Link className='font-bold duration-200  hover:text-[#334154]' to="/admin">Admin</Link></div>}

            {user?.email && <><span className='text-white'>{user?.displayName + " "}</span> <div className="px-2 mx-2 py-3 hover:rounded duration-1000 hover:bg-[#EEE6E2] hover:text-[#334154]' text-white hover:text-[#334154] inline-block" >< button className='font-bold duration-200  hover:text-[#334154]' onClick={signOutHandler}>Logout</button></div></>}
        </div >
    )
}

export default NavItem