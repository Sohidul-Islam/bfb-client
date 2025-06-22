import React from 'react'
import logo from '../../assets/logo white.png'
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
                            <a className="my-3 block" href="/#">Software technology park, Agrabad, Chattogram <span className="text-teal-600 text-xs p-1"></span></a>
                            <a className="my-3 block" href="mailto:chowdhury.bfb@gmail.com">chowdhury.bfb@gmail.com <span className="text-teal-600 text-xs p-1"></span></a>
                            <a className="my-3 block" href="tel:01558919983">+8801558919983<span className="text-teal-600 text-xs p-1"></span></a>
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