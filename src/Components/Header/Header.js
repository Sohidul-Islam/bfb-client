import React from 'react'
import logo from '../../assets/logo.png'
import Navbar from '../Navbar/Navbar'
const Header = () => {
    return (
        <div>
            <img className="mx-auto h-[150px]" src={logo}></img>
            <h1 className='text-center text-[28px] my-4 font-bold'>Donation & Verification Portal</h1>
            <nav>
                <Navbar />
            </nav>
        </div>
    )
}

export default Header