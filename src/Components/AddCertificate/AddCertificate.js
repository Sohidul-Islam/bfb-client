import React, { useRef, useState } from 'react'
import axios from 'axios'
import { Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

const AddCertificate = () => {
    const [data, setData] = useState({});
    const [isValid, setValid] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const inputField = [
        {
            label: 'Certificate Id',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
        },
        {
            label: 'Ref No',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
        },
        {
            label: 'First Name',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
        },
        {
            label: 'Last Name',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter Your ' + this.label },
        },
        {
            label: 'Date of Issue',
            type: 'date',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter ' + this.label },
        },
        {
            label: 'Duration of Experience',
            type: 'text',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter ' + this.label },
        },
        {
            label: 'List of Combine Certificate Name',
            type: 'textArea',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter ' + this.label },
        },
        {
            label: 'description',
            type: 'textArea',
            name: function () {
                return this.label.replaceAll(" ", "_").toLowerCase()
            },
            placeholder: function () { return 'Enter ' + this.label },
        },

    ]

    const getCertificate = async (id) => {
        let flag = false;
        let url = "https://certificate-verification-server.vercel.app";
        url += "/certificates?id=" + id;
        await axios.get(`${url}`)
            .then(response => {
                if (response.data != null) {
                    setMessage(`${id} is already added to the certificate list`)
                    flag = true;
                    setValid(false)
                }
                else {
                    if (id.length > 0 && isValid) {
                        setValid(true);
                        setMessage(`${id} is valid`);
                        setTimeout(() => { setMessage("") }, 3000);
                    }
                    else if (id.length === 0) {
                        setMessage(`Please fill the required form`);
                        setValid(false);
                    }
                    flag = false;
                }
            })
            .catch(error => {
                console.error(error); // Handle error
            });

        return flag;
    }

    const onBlurHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let oldValue = data;
        oldValue[name] = value;
        setData(oldValue);
        if (name === "certificate_id") {
            const certificateIdRegex = /^BFB\d{2}(0[1-9]|1[0-2])\d+$/;
            if (certificateIdRegex.test(value)) {
                setMessage(`${value} is valid`);
                setValid(true)
                getCertificate(value);
            } else {
                setMessage(`Invalid ID! Please follow it - BFB230301 (BFB<yy><mm><anydigit>)`)
                setOpen(false)
                setValid(false)
            }

        }
    }
    const AddCertificateTodb = async (data) => {

        const certificate = {
            certificate_id: data.certificate_id,
            ref_no: data.ref_no,
            firstname: data.first_name,
            lastname: data.last_name,
            date_of_issue: data.date_of_issue,
            duration_of_experience: data.duration_of_experience,
            list_of_combine_certificate_name: data.list_of_combine_certificate_name === undefined ? "" : data.list_of_combine_certificate_name,
            description: data.description === undefined ? "" : data.description,
        }

        const isExist = await getCertificate(certificate.certificate_id);

        let url = "https://certificate-verification-server.vercel.app";
        url += "/certificates"
        if (isExist === false && isValid) {
            await axios.post(`${url}`, certificate)
                .then(response => {

                    setOpen(true);
                })
                .catch(error => {
                    console.error(error); // Handle error
                });
        }
        else if (isExist === true) {
            setOpen(true);
        }
    }

    const addCertificate = (e) => {
        e.preventDefault();
        AddCertificateTodb(data);
    }
    return (
        <div>

            <div className="flex flex-col justify-center items-center my-4">
                <div className={`w-[70vw] p-4 shadow-md`}>
                    <h3 className="text-center font-bold text-[32px]">Add Certificate</h3>
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
                    <form onSubmit={addCertificate}>
                        {
                            inputField.map((input, index) =>
                                <div key={index}>
                                    <div>
                                        <div className="text-stone-800">
                                            <label htmlFor={`#${input.name()}`} className="font-bold" >{input.label}</label>
                                        </div>
                                        {input.type === 'text' && input.label === "Certificate Id" &&

                                            <h3 className={`${isValid === true ? "text-green-500" : "text-red-500"} duration-1000`}>{message}</h3>
                                        }

                                        <div className="border-2 placeholder-shown:border-gray-500 focus:border-gray-500 rounded-md">

                                            {input.type === 'text' && <input id={input.name()} onBlur={onBlurHandler} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />}

                                            {input.type === 'number' && <input id={input.name()} onBlur={onBlurHandler} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />}

                                            {input.type === 'textArea' && <textarea id={input.name()} onBlur={onBlurHandler} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} />}

                                            {input.type === 'date' && <input id={input.name()} onBlur={onBlurHandler} name={input.name()} type={input.type} className="p-4  w-full rounded-md focus:outline-none" placeholder={input?.placeholder()} required />}
                                        </div>
                                    </div>
                                    <br></br>
                                </div>
                            )
                        }

                        <button className='w-80 hover:text-[#334154] hover:border hover:border-[#334154]  hover:bg-white border-spacing-1 duration-500 shadow-md bg-[#334154] px-4 py-2 focus: text-white rounded-md my-2' type={"submit"}>ADD </button>
                    </form>
                </div>
                <div className='w-full md:w-[800px] relative overflow-x-auto sm:rounded-lg'>
                </div>
            </div>
        </div>
    )
}

export default AddCertificate