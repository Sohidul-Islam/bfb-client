import React, { useState } from 'react'
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../Header/Header'
import db from '../../utilities/db.control'

const MakeDonation = () => {
    const [data, setData] = useState({});
    const [isVerified, setIsVerified] = useState(false);
    const [open, setOpen] = useState(false);
    const { makePayment } = db;
    const inputField = [
        {
            label: 'Name',
            type: 'text',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            required: true
        },
        {
            label: 'Number',
            type: 'tel',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Your Phone ' + this.label },
            required: true
        },
        {
            label: 'Payment Method',
            type: 'text',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Payment Method. ex. Bkash, Rocket, Nagad, Bank etc' },
            required: true
        },
        {
            label: 'Transection Number',
            type: 'text',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            required: false
        },
        {
            label: 'Amount',
            type: 'text',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Payment ' + this.label },
            required: true
        },

    ]

    const onBlurHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let oldValue = data;
        oldValue[name] = value;
        console.log(oldValue);
        setData(oldValue);
    }

    const addDonation = (e) => {
        e.preventDefault();
        makePayment(data).then(() => {
            setIsVerified(true);
            setOpen(true);
        })
    }
    return (
        <div>
            <Header />
            <div>
                <div className="flex flex-col justify-center items-center my-4">
                    <div className={`w-[70vw] p-4 shadow-md`}>
                        <h3 className="text-center font-bold text-[32px]">Make a donation</h3>
                        <Collapse in={open}>
                            <Alert
                                severity={`${isVerified ? "success" : "error"}`}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                            setIsVerified(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                {isVerified ? `Congratulations! Payment added successfully` : `There was an error`}
                            </Alert>
                        </Collapse>
                        <form onSubmit={addDonation}>
                            {
                                inputField.map((input, index) =>
                                    <div key={index}>
                                        <div>
                                            <div className="text-stone-800">
                                                <label htmlFor={`#${input.name()}`} className="font-bold" >{input.label}</label>
                                            </div>
                                            <div className="border-2 placeholder-shown:border-gray-500 focus:border-gray-500 rounded-md">
                                                {input.required && <input onBlur={onBlurHandler} id={input.name()} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />}
                                                {input.required === false && <input onBlur={onBlurHandler} id={input.name()} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} />}
                                            </div>
                                        </div>
                                        <br></br>
                                    </div>
                                )
                            }

                            <button className='w-full md:w-80 hover:text-[#334154] hover:border hover:border-[#334154] bg-[#334154] hover:bg-white border-spacing-1 duration-500 shadow-mdbg-[#334154] px-4 py-2 focus: text-white rounded-md my-2' type={"submit"}>ADD </button>
                        </form>
                    </div>
                    <div className='w-full md:w-[800px] relative overflow-x-auto sm:rounded-lg'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MakeDonation