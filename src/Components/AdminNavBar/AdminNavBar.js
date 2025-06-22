import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from './../../hooks/useAuth';

const AdminNavBar = ({ navItem }) => {
    const navigate = useNavigate();
    const { user, signInWithGoogle, logout, admin, setAdmin } = useAuth();
    const signOutHandler = async () => {
        await setAdmin(false);
        if (user?.email)
            await logout();
        navigate('/login');
    }

    return (
        <div className="flex flex-wrap flex-col md:flex-row justify-center items-center">
            {
                navItem.map((item, index) =>
                    <div key={index} className="px-2 mx-2 py-3 hover:rounded duration-1000 hover:bg-[#EEE6E2] hover:text-[#334154]' text-white hover:text-[#334154] inline-block">
                        <Link className='font-bold duration-200  hover:text-[#334154]' key={item.id} to={item.path}>{item.name}</Link>
                    </div>)
            }
            {user?.email && <><span className='text-white'>{user?.displayName + " "}</span> <div className="px-2 mx-2 py-3 hover:rounded duration-1000 hover:bg-[#EEE6E2] hover:text-[#334154]' text-white hover:text-[#334154] inline-block" >< button className='font-bold duration-200  hover:text-[#334154]' onClick={signOutHandler}>Logout</button></div></>}
        </div>
    )
}
export default AdminNavBar