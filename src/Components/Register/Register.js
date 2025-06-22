import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useAuth from '../../hooks/useAuth';
import Header from '../Header/Header';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const Register = () => {
    const { user, signInWithGoogle, signUpWithEmailandPassword, error, setError, logout } = useAuth();
    const [data, setData] = useState({});
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
            label: 'Name',
            type: 'text',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            required: true
        },
        {
            label: 'Email',
            type: 'email',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            required: true
        },
        {
            label: 'Password',
            type: 'password',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            required: true
        },
        {
            label: 'Confirm Password',
            type: 'password',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            required: true
        }
    ]

    const onBlurHandler = (e) => {
        let name = e?.target?.name;
        let value = e?.target?.value;
        let oldValue = data;
        oldValue[name] = value;
        setData(oldValue);
    }

    const signInWithGoogleHandler = async () => {
        await signInWithGoogle();
    }
    const onSubmitRegisterHandler = (e) => {
        e.preventDefault();
        console.log(data);
        if (data.password === data.confirm_password) {
            setOpen(true);
            setRegisterError("")
            setError("")
            signUpWithEmailandPassword(data.email, data.password, data.name, navigate)
        }
        else {
            setOpen(true);
            setRegisterError("Your entered password doesn't match")
            setError("Your entered password doesn't match")
        }
    }
    return (
        <div>
            <Header />
            <div className="flex flex-col justify-center items-center my-4">
                <div className={`w-[70vw] p-4 shadow-md`}>
                    <h3 className="text-center font-bold text-[32px]">Register</h3>
                    <div className="static top-0 left-0 right-0">
                        {/* <h3 className={`p-2 text-center rounded-lg fixed ${error.length === 0 ? '-left-[200px]' : 'left-[30%]'}  top-0 duration-10000`}>
                            <strong className="my-2 text-xl py-2 px-3 rounded-lg text-red-800 text-center bg-red-100  ">{error} <XMarkIcon onClick={() => {
                                setError("");
                            }} className='w-[24px] inline-block' /></strong></h3> */}

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
                                {error?.length === 0 || error?.length === undefined ? `Registered successfully` : error}
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
                            <button className='w-full md:min-w-[184px] md:max-w-[184px] bg-[#334154] px-4 py-2 focus: text-white rounded-md my-2' type={"submit"}>Register </button>

                            <div className="w-[50%] md:ml-[16px]">
                                <div onClick={signInWithGoogleHandler} className="google-btn">
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                                    </div>
                                    <p className="btn-text"><b>Sign in with google</b></p>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>
                <div className='w-full md:w-[800px] relative overflow-x-auto sm:rounded-lg'>

                </div>
            </div>
        </div >
    )
}

export default Register