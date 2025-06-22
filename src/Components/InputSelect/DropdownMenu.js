import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack } from '@mui/system';
import { async } from '@firebase/util';

const DropdownMenu = ({ options, dbMethods, refetch, id }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isConfirm, setIsConfirm] = useState(true);
    const [isReject, setIsReject] = useState(true);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setIsConfirm(true);
        setIsReject(true)
    };

    const isConfirmHandler = async (isConfirm, isReject) => {
        if (isConfirm && selectedOption !== '' && isReject === false) {
            await dbMethods(id, { isVerified: selectedOption });
            await refetch();
        }
    }


    return (
        <div>


            <Stack direction="row" className="justify-center">
                <div className="relative inline-block w-full text-left">
                    <select
                        value={selectedOption}
                        onChange={handleSelectChange}
                        className={
                            'block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                        }>
                        <option value="" disabled hidden>
                            Select an option
                        </option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ChevronDownIcon className="w-5 h-5" />
                    </div>
                </div>
                {isConfirm === true ? <IconButton aria-label="fingerprint" color="success" onClick={async () => {
                    await setIsReject(false);
                    await isConfirmHandler(true, false);
                }}>
                    <CheckCircleIcon />
                </IconButton> : <IconButton aria-label="fingerprint" color="success" disabled onClick={() => {
                }}>
                    <CheckCircleIcon />
                </IconButton>}
                {isReject === true ? <IconButton aria-label="fingerprint" color="secondary" onClick={async () => {
                    await setIsConfirm(false);
                    isConfirmHandler(false, true)
                }}>
                    <CancelIcon />
                </IconButton> : <IconButton aria-label="fingerprint" color="secondary" disabled onClick={() => {
                }}>
                    <CancelIcon />
                </IconButton>}


            </Stack>
        </div>

    );
}


export default DropdownMenu