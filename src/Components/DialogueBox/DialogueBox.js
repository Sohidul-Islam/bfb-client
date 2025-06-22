import { Alert, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import db from '../../utilities/db.control'
const DialogueBox = ({ isOpen, setIsOpen, certificate, refetch, inputField, UpdateInfoByID }) => {
    // const { UpdateCertificatesById, getCertificatesById } = db

    const [data, setData] = useState(certificate);
    const [isValid, setValid] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const handleClose = () => {
        setIsOpen(false);
    };

    const onBlurHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let oldValue = data;
        oldValue[name] = value;
        setData(oldValue);
    }

    const UpdateHandler = (e) => {
        e.preventDefault();
        UpdateInfoByID(certificate._id, data);
        handleClose();
    }

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Update Info.</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To Update the contents, please enter your required information here.
                    </DialogContentText>
                    <div className="flex flex-col justify-center items-center my-4">
                        <div className={`w-[96%] p-4 shadow-md`}>
                            <Collapse in={open}>
                                <Alert
                                    severity={`${isValid ? "success" : "error"}`}
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
                                    {isValid ? `Congratulations! ${data.certificate_id} added successfully` : `${data.certificate_id} already added`}
                                </Alert>
                            </Collapse>
                            {/* <form onSubmit={addCertificate}> */}
                            <form className="w-[100%]" onSubmit={UpdateHandler}>
                                {
                                    inputField(certificate).map((input, index) =>
                                        <div key={index}>
                                            <div>
                                                <div className="text-stone-800">
                                                    <label htmlFor={`#${input.name()}`} className="font-bold" >{input.label}</label>
                                                </div>
                                                {input.type === 'text' && input.label === "Certificate Id" &&

                                                    <h3 className={`${isValid === true ? "text-green-500" : "text-red-500"} duration-1000`}>{message}</h3>
                                                }

                                                <div className="border-2 placeholder-shown:border-gray-500 focus:border-gray-500 rounded-md">
                                                    {/* email */}
                                                    {input.type === 'email' && input.disabled === false && <input id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />}
                                                    {input.type === 'email' && input.disabled === true && <input id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required disabled />}
                                                    {/* text */}
                                                    {input.type === 'text' && input.disabled === false && <input id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />}
                                                    {input.type === 'text' && input.disabled === true && <input id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required disabled />}
                                                    {/* number */}
                                                    {input.type === 'number' && input.disabled === false && <input id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />}
                                                    {input.type === 'number' && input.disabled === true && <input id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required disabled />}
                                                    {/* textArea */}
                                                    {input.type === 'textArea' && input.disabled === false && <textarea id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} />}
                                                    {input.type === 'textArea' && input.disabled === true && <textarea id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} disabled />}
                                                    {/* date */}
                                                    {input.type === 'date' && input.disabled === false && <input id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />}
                                                    {input.type === 'date' && input.disabled === true && <input id={input.name()} onBlur={onBlurHandler} defaultValue={input.defaultValue} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required disabled />}
                                                </div>
                                            </div>
                                            <br></br>
                                        </div>
                                    )
                                }

                                <button className='md:w-80 w-full hover:text-[#334154] hover:border hover:border-[#334154]  hover:bg-white border-spacing-1 duration-500 shadow-md bg-[#334154] px-4 py-2 focus: text-white rounded-md my-2' type={"submit"}>Update </button>
                            </form>
                        </div>
                        <div className='w-full md:w-[800px] relative overflow-x-auto sm:rounded-lg'>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={UpdateHandler}>Update</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DialogueBox;