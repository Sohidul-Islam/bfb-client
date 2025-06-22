import React, { useRef, useState } from 'react'

import axios from 'axios';
import { Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
const MakeAdmin = () => {
    const [data, setData] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const inputField = [
        {
            label: 'Email',
            type: 'email',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter an ' + this.label },
        }
    ]

    const onBlurHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let oldValue = data;
        oldValue[name] = value;
        console.log(oldValue);
        setData(oldValue);
    }

    const getUser = async (email) => {
        let url = "https://certificate-verification-server.vercel.app";
        url += `/users?email=${email}`
        let flag = false;
        await axios.get(`${url}`)
            .then(response => {

                if (response.data !== null) {
                    setIsSuccess(true);
                    setOpen(true);
                    flag = true;
                }
                else if (response.data === null) {
                    setIsSuccess(false);
                    setOpen(true)
                    flag = false;
                };
            })
            .catch(error => {
                console.error(error); // Handle error
            });

        return flag;
    }
    const AddAdminUserTodb = async (email) => {
        const data = {
            email: email,
            role: "admin"
        }
        let url = "https://certificate-verification-server.vercel.app";
        url += "/users/make-admin"
        let isGetUser = await getUser(email);
        if (isGetUser === true) {
            await axios.put(`${url}`, data)
                .then(response => {
                    console.log("successfully added admin", response.data); // Handle successful response
                })
                .catch(error => {
                    console.error(error); // Handle error
                });
        }
        else if (isGetUser === false) {

            console.log("not registerd user");
        }

    }

    const makeAdminHandler = (e) => {
        e.preventDefault();
        if (data?.email) {
            AddAdminUserTodb(data?.email);
        }
        else {
            console.log(data.email);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center my-4">
                <Collapse in={open}>
                    <Alert
                        severity={`${isSuccess ? "success" : "error"}`}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {isSuccess ? `Congratulations! ${data.email} you have been a new admin` : `${data.email} not found please provide valid email`}
                    </Alert>
                </Collapse>
                <div className={`w-[70vw] p-4 shadow-md`}>
                    <h3 className="text-center font-bold text-[32px]">Make an Admin</h3>
                    <form onSubmit={makeAdminHandler}>
                        {
                            inputField.map((input, index) =>
                                <div key={index}>
                                    <div>
                                        <div className="text-stone-800">
                                            <label htmlFor={`#${input.name()}`} className="font-bold" >{input.label}</label>
                                        </div>
                                        <div className="border-2 placeholder-shown:border-gray-500 focus:border-gray-500 rounded-md">
                                            <input onBlur={onBlurHandler} id={input.name()} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />
                                        </div>
                                    </div>
                                    <br></br>
                                </div>
                            )
                        }

                        <button className='md:w-80 w-full hover:text-[#334154] hover:border hover:border-[#334154]  hover:bg-white border-spacing-1 duration-500 shadow-md bg-[#334154] px-4 py-2 focus: text-white rounded-md my-2' type={"submit"}>ADD </button>
                    </form>
                </div>
                <div className='w-full md:w-[800px] relative overflow-x-auto sm:rounded-lg'>
                </div>
            </div>
        </div>
    )
}

export default MakeAdmin