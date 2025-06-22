import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../Header/Header'
import useAuth from './../../hooks/useAuth';
import db from '../../utilities/db.control';

const ResetPassword = () => {
    const { user, resetPassword, error, setError, logout } = useAuth();
    const [data, setData] = useState({});
    const { getAUser } = db;
    const [registerError, setRegisterError] = useState("");
    const [open, setOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.email && location.state?.from) {
            navigate(`${location.state?.from}`, {
                state: { from: location.pathname }
            })
        }
    }, [user])

    const inputField = [

        {
            label: 'Email',
            type: 'email',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            required: true
        },
    ]

    const onBlurHandler = (e) => {
        let name = e?.target?.name;
        let value = e?.target?.value;
        let oldValue = data;
        oldValue[name] = value;
        console.log(oldValue);
        setData(oldValue);
    }

    const onSubmitRegisterHandler = (e) => {
        e.preventDefault();
        console.log(data);
        getAUser(data?.email).then((user) => {
            if (user !== null) {
                setOpen(true);
                setRegisterError("")
                setError("")
                resetPassword(data?.email);
            }
            else {
                setOpen(true);
                setRegisterError(`Your entered email: ${data?.email}  not found. Please Register this email.`)
                setError(`Your entered email: ${data?.email}  not found. Please Register this email.`)
            }
        })
    }
    return (
        <div>
            <Header />
            <div className="flex flex-col justify-center items-center my-4">
                <div className={`w-[70vw] p-4 shadow-md`}>
                    <h3 className="text-center font-bold text-[32px]">Reset Password</h3>
                    <div className="static top-0 left-0 right-0">

                        <Collapse in={open}>
                            <Alert
                                severity={`${error?.length === 0 || error?.length === undefined ? "success" : "error"}`}
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                            setError("");
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                {error?.length === 0 || error?.length === undefined ? `Sent an email to ${data?.email} for reseting your password` : error}
                            </Alert>
                        </Collapse>
                    </div>
                    <form onSubmit={onSubmitRegisterHandler}>
                        {
                            inputField.map((input, index) =>
                                <div key={index}>
                                    <div>
                                        <div className="text-stone-800">
                                            <label htmlFor={`#${input.name()}`} className="font-bold" >{input.label}</label>
                                        </div>
                                        <div className="border-2 placeholder-shown:border-gray-500 focus:border-gray-500 rounded-md">
                                            {input.required && <input id={input.name()} onBlur={onBlurHandler} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />}
                                            {input.required === false && <input id={input.name()} onBlur={onBlurHandler} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} />}
                                        </div>
                                    </div>
                                    <br></br>
                                </div>
                            )
                        }
                        <Link to={'/login'} className="text-blue-500">Already have an account?</Link>
                        <div className="w-full flex items-center flex-wrap">
                            <button className='w-[50%] min-w-[184px] max-w-[184px] bg-[#334154] px-4 py-2 focus: text-white rounded-md my-2' type={"submit"}>Reset</button>
                        </div>

                    </form>

                </div>
                <div className='w-full md:w-[800px] relative overflow-x-auto sm:rounded-lg'>

                </div>
            </div>
        </div >
    )
}

export default ResetPassword