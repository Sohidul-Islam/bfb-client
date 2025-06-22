import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../Header/Header'
import './Login.css';
import googleImage from './../../assets/google.png';
import useAuth from './../../hooks/useAuth';

const Login = () => {
    const { user, signInWithGoogle, signInWithEmailandPassword, error, setError, resetPassword, logout, admin } = useAuth();
    const [data, setData] = useState({});
    const [isVerified, setIsVerified] = useState(false);
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
        {
            label: 'Password',
            type: 'password',
            name: function () {
                return this.label.replace(' ', '_').toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
            required: true
        }
    ]

    const onBlurHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let oldValue = data;
        oldValue[name] = value;
        setData(oldValue);
    }

    const signInWithGoogleHandler = async () => {
        await setError("Please Wait...");
        await signInWithGoogle();
        if (error.length >= 0) {
            setOpen(true);
        }
        else {
            setOpen(true);
        }

    }
    const onSubmitLoginHandler = (e) => {
        e.preventDefault();
        if (data?.email && data?.password) {
            signInWithEmailandPassword(data.email, data.password);
            setIsVerified(true);
            setOpen(true);
        }
    }
    return (
        <div>
            <Header />
            <div className=" flex flex-col justify-center items-center my-4">
                <div className={`w-[70vw] p-4 shadow-md`}>
                    <h3 className="text-center font-bold text-[32px]">Login</h3>
                    <Collapse in={open}>
                        <Alert
                            severity={`${error.length <= 0 ? "success" : "error"}`}
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
                            {user?.email ? `Login successfully` : `${error}`}
                        </Alert>
                    </Collapse>
                    <form onSubmit={onSubmitLoginHandler}>
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
                        <Link to={'/register'} className="text-blue-500">Not Registered yet?</Link>
                        <Link to={'/reset-password'} className="ml-4 text-blue-500">Forgot Password?</Link>
                        <div className="w-full flex items-center flex-wrap">
                            <button className=' hover:text-[#334154] hover:border hover:border-[#334154]  hover:bg-white border-spacing-1 duration-500 shadow-md w-[50%] min-w-[184px] max-w-[184px] bg-[#334154] px-4 py-2 focus: text-white rounded-md my-2' type={"submit"}>Login </button>
                            <div className="w-[50%] md:ml-[16px]">
                                <div onClick={signInWithGoogleHandler} className="google-btn">
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon" src={googleImage} />
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
        </div>
    )
}

export default Login