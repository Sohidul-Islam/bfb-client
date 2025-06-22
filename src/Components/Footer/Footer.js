import React from 'react'
import logo from '../../assets/logo white.png'
// Footer page
function Footer() {
    return (
        <footer className="bg-gray-900">
            <div className="bg-[#334154]">
                <div className="max-w-6xl m-auto text-white flex flex-wrap justify-center">
                    <div className="flex flex-wrap">
                        <div className="p-5 w-[40%] ">
                            <img src={logo} className="h-[80px]" />
                        </div>

                        <div className="p-5 w-[60%] ">
                            <div className="text-xs uppercase text-white font-medium">Contact us</div>
                            <div className="my-3 block">
                                <span className="font-semibold">Dhaka Office Address:</span><br />
                                Lake pearl, House:09, Road:19, Sector:12, Uttara Model Town, Dhaka
                            </div>
                            <div className="my-3 block">
                                <span className="font-semibold">Chattogram Office Address:</span><br />
                                Biponi Bitan, Block-B, 7th Floor, Kotowali, Chattogram.
                            </div>
                            <div className="my-3 block">
                                <span className="font-semibold">Email:</span>
                                <a href="mailto:info@bfb.org.bd" className="ml-1 underline">info@bfb.org.bd</a> |
                                <a href="mailto:official@bfb.org.bd" className="ml-1 underline">official@bfb.org.bd</a>
                            </div>
                            <div className="my-3 block">
                                <span className="font-semibold">Phone:</span>
                                <a href="tel:+8801316522094" className="ml-1 underline">+8801316 522094</a>,
                                <a href="tel:+8801558919983" className="ml-1 underline">+8801558919983</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#334154] pt-2 ">
                <div className="flex pb-5 px-3 m-auto pt-5 border-t text-white text-sm flex-col
      md:flex-row max-w-6xl">
                    <div className="mt-2">© Copyright 2023. All Rights Reserved.</div>
                    <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">

                        <h4 className="text-[16px] font-bold">Developed by Sohidul Islam & Owahidul Hoque Chowdhury</h4>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default Footer