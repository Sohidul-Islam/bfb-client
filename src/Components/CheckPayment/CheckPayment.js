import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import Header from '../Header/Header'
import db from '../../utilities/db.control'
import { Chip, Collapse, IconButton } from '@mui/material';
import DropdownMenu from '../InputSelect/DropdownMenu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack } from '@mui/system';
import { io } from 'socket.io-client';
import useAuth from '../../hooks/useAuth';
import PreLoader from '../PreLoader/PreLoader';


const CheckPayment = () => {

    const { user, admin, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    // const [data, setData] = useState([]);

    const { getPayment, getPaymentById } = db;

    const { isLoading, refetch, error, data } = useQuery('payment', () =>
        getPayment().then(data => data)
    );

    if (isLoading) {
        return <PreLoader size={100} />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    // useEffect(() => {
    //     getPayment().then(data => setData(data))
    // }, [])

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const filteredData = data.filter((item) => {
        const str = searchTerm.toLowerCase();
        return item.number.toLowerCase().includes(str.toLowerCase()) ||
            item.name.toLowerCase().includes(str.toLowerCase()) ||
            item.amount.toLowerCase().includes(str.toLowerCase()) ||
            item.transection_number.toLowerCase().includes(str.toLowerCase()) ||
            item.isVerified.toLowerCase().includes(str.toLowerCase()) ||
            item.payment_method.toLowerCase().includes(str.toLowerCase()) ||
            item.name.toLowerCase().includes(str.toLowerCase())
    }

    );
    // const filteredData = data.filter((item) => {
    //     const str = searchTerm.toLowerCase();
    //     const substring = str.substring(0, str.indexOf(":"));
    //     // console.log(substring);
    //     const newsubstring = substring + ":";
    //     const newString = str.replace(newsubstring, "");
    //     // console.log(newString);
    //     if (substring === 'phone')
    //         return item.number.toLowerCase().includes(newString.toLowerCase())
    //     else if (substring === 'name')
    //         return item.name.toLowerCase().includes(newString.toLowerCase())
    //     else if (substring === 'amount')
    //         return item.amount.toLowerCase().includes(newString.toLowerCase())
    //     else if (substring === 'transaction')
    //         return item.transection_number.toLowerCase().includes(newString.toLowerCase())
    //     else if (substring === 'status')
    //         return item.isVerified.toLowerCase().includes(newString.toLowerCase())
    //     else
    //         return item.name.toLowerCase().includes(newString.toLowerCase())
    // }
    // );
    return (
        <div>
            <Header />

            <div className="max-w-[80vw] mx-auto p-6 overflow-x-auto overflow-y-auto">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />
                <div className="overflow-x-auto overflow-y-auto">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                {/* <th className="border border-gray-300 px-3 py-2">ID</th> */}
                                <th className="border border-gray-300 px-3 py-2">Name</th>
                                <th className="border border-gray-300 px-3 py-2">Phone</th>
                                <th className="border border-gray-300 px-3 py-2">Amount</th>
                                <th className="border border-gray-300 px-3 py-2">Tansaction Id</th>
                                <th className="border border-gray-300 px-3 py-2">Payment Method</th>
                                <th className="border border-gray-300 px-3 py-2">Status</th>
                                {admin === true && <th className="border border-gray-300 px-3 py-2">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item._id}>
                                    <td className="border capitalize w-auto text-center border-gray-300 px-3 py-2">{item.name}</td>
                                    <td className="border capitalize w-auto text-center border-gray-300 px-3 py-2">{item.number}</td>
                                    <td className="border capitalize w-auto text-center border-gray-300 px-3 py-2">{item.amount}</td>
                                    <td className="border capitalize w-auto text-center border-gray-300 px-3 py-2">{item.transection_number}</td>
                                    <td className="border capitalize w-auto text-center border-gray-300 px-3 py-2">{item.payment_method}</td>
                                    <td className="border capitalize w-auto text-center border-gray-300 px-3 py-2">
                                        {item?.isVerified === "verified" &&
                                            <Chip variant="outlined" label={item.isVerified} color="success" size="small" deleteIcon={<DoneIcon />} >
                                            </Chip>
                                        }
                                        {item?.isVerified === "on-process" &&
                                            <Chip variant="outlined" label={item?.isVerified} color="secondary" size="small" deleteIcon={<DoneIcon />} >
                                            </Chip>
                                        }
                                        {item?.isVerified === "pending" &&
                                            <Chip variant="outlined" label={item?.isVerified}
                                                style={{ borderColor: '#f44336', backgroundColor: 'transparent', color: '#f44336' }}
                                                size="small" deleteIcon={<DoneIcon />} >
                                            </Chip>
                                        }
                                    </td>
                                    {admin === true && <>

                                        <td className="border min-w-[300px] text-center border-gray-300 px-3 py-2"><DropdownMenu options={["on-process", "pending", "verified"]} id={item._id} dbMethods={getPaymentById} refetch={refetch} />
                                        </td>
                                    </>}

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    )
}

export default CheckPayment